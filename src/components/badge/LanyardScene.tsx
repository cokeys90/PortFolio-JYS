/**
 * 3D 랜야드 사원증 (About 섹션 진입 시 lazy 로드).
 *
 * 물리 엔진 대신 경량 verlet 시뮬레이션을 직접 돌린다 (rapier wasm ≈ 840KB gzip 절감).
 * - 고정점 A → 끈 마디 P1·P2 → 카드 상단 힌지 H → 카드 하단 B (거리 제약)
 * - 카드 자세: H→B 축이 카드의 세로축, 그 축을 중심으로 한 yaw 는 스프링으로 0/π 를 향함
 * - 드래그: B 를 포인터에 고정(kinematic) → 놓으면 마지막 속도로 던져짐
 * - 탭: 앞/뒷면 뒤집기 (목표 yaw 토글 + 회전 임펄스)
 * - 마운트 직후 끈이 수평으로 시작해 아래로 떨어지며 흔들린다 (레퍼런스의 '낙하' 연출)
 */
import * as THREE from 'three'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  type ThreeElement,
  type ThreeEvent,
} from '@react-three/fiber'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { BADGE_H, BADGE_W, paintBack, paintFront, paintStrap } from './paintBadge'

extend({ MeshLineGeometry, MeshLineMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>
  }
}

const CARD_W = 1.6
const CARD_H = (CARD_W * BADGE_H) / BADGE_W // 2.4
const HINGE = 0.14 // 힌지(클립 고리) ~ 카드 상단 거리
const HB = CARD_H + HINGE // 힌지 ~ 카드 하단 거리
const SEG = 1.2 // 끈 한 마디 길이
const ANCHOR = new THREE.Vector3(0, 4.3, 0)

const GRAVITY = -32
const DAMPING = 0.978
const ITER = 10
const STEP = 1 / 120

const YAW_K = 26 // yaw 스프링 강성
const YAW_D = 4.2 // yaw 감쇠

const TAP_MS = 240
/** 끈 정점 간 최소 간격² (이보다 가까우면 버림) */
const MIN_GAP_SQ = 0.012 * 0.012
/** 끈 끝을 힌지 아래로 연장하는 길이 (클립 뒤에 가려짐) */
const TAIL = 0.16
const TAP_PX = 6

// 3D 재질 색 (테마 토큰과 무관한 금속 클립)
const METAL = '#9aa0a8'

interface Particle {
  p: THREE.Vector3
  prev: THREE.Vector3
  invMass: number
}

interface SimState {
  pts: Particle[]
  yaw: number
  yawVel: number
  target: number
  acc: number
  drag: { offset: THREE.Vector3; pointer: THREE.Vector3 } | null
}

function makeParticle(x: number, y: number, invMass: number): Particle {
  const p = new THREE.Vector3(x, y, 0)
  return { p, prev: p.clone(), invMass }
}

function createSim(): SimState {
  // 끈을 고정점 바로 아래에 뭉쳐 둔 상태에서 시작 → 수직 낙하 후 팽팽해지며 '툭' 멈추고 살짝 흔들림
  const hx = ANCHOR.x + 0.3
  const hy = ANCHOR.y - 0.2
  const tilt = 0.18
  return {
    pts: [
      makeParticle(ANCHOR.x, ANCHOR.y, 0),
      makeParticle(ANCHOR.x + 0.1, ANCHOR.y - 0.05, 1),
      makeParticle(ANCHOR.x + 0.2, ANCHOR.y - 0.1, 1),
      makeParticle(hx, hy, 1), // H (힌지)
      makeParticle(hx + Math.sin(tilt) * HB, hy - Math.cos(tilt) * HB, 0.6), // B (카드 하단, 무거움)
    ],
    yaw: 0.5,
    yawVel: 0,
    target: 0,
    acc: 0,
    drag: null,
  }
}

/** 거리 제약. rope=true 면 늘어날 때만 당긴다 (끈은 접힐 수 있음) */
function satisfy(a: Particle, b: Particle, rest: number, tmp: THREE.Vector3, rope = false) {
  const w = a.invMass + b.invMass
  if (w === 0) return
  tmp.subVectors(b.p, a.p)
  const d = tmp.length() || 1e-6
  if (rope && d <= rest) return
  const diff = (d - rest) / d
  if (a.invMass) a.p.addScaledVector(tmp, (a.invMass / w) * diff)
  if (b.invMass) b.p.addScaledVector(tmp, -(b.invMass / w) * diff)
}

function useCanvasTexture(paint: () => Promise<HTMLCanvasElement> | HTMLCanvasElement) {
  const [tex, setTex] = useState<THREE.Texture | null>(null)
  useEffect(() => {
    let alive = true
    let t: THREE.CanvasTexture | null = null
    Promise.resolve(paint()).then((canvas) => {
      if (!alive) return
      t = new THREE.CanvasTexture(canvas)
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = 8
      setTex(t)
    })
    return () => {
      alive = false
      t?.dispose()
    }
  }, [paint])
  return tex
}

function Lanyard({ onReady }: { onReady?: () => void }) {
  const { size, camera, gl } = useThree()
  const front = useCanvasTexture(paintFront)
  const back = useCanvasTexture(paintBack)
  const strap = useCanvasTexture(paintStrap)

  const cardRef = useRef<THREE.Group>(null)
  const band = useRef<THREE.Mesh<MeshLineGeometry, MeshLineMaterial>>(null)
  const simRef = useRef<SimState>(createSim())

  const tmp = useMemo(
    () => ({
      v: new THREE.Vector3(),
      up: new THREE.Vector3(),
      center: new THREE.Vector3(),
      q: new THREE.Quaternion(),
      qYaw: new THREE.Quaternion(),
      yAxis: new THREE.Vector3(0, 1, 0),
      ray: new THREE.Raycaster(),
      plane: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
      ndc: new THREE.Vector2(),
    }),
    [],
  )
  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ])
    // centripetal: 제어점이 가까워져도 고리·뾰족점이 생기지 않는다 (chordal 은 끈이 접힐 때 꺾임 → 깜빡임)
    c.curveType = 'centripetal'
    return c
  })
  const resolution = useMemo(
    () => new THREE.Vector2(size.width, size.height),
    [size.width, size.height],
  )
  const repeat = useMemo(() => new THREE.Vector2(-4, 1), [])

  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const press = useRef<{ t: number; x: number; y: number } | null>(null)

  useEffect(() => {
    document.body.style.cursor = dragging ? 'grabbing' : hovered ? 'grab' : ''
    return () => {
      document.body.style.cursor = ''
    }
  }, [hovered, dragging])

  useEffect(() => {
    if (front && back && strap) onReady?.()
  }, [front, back, strap, onReady])

  /** 화면 좌표 → z=0 평면 위 월드 좌표 */
  const toWorld = useMemo(
    () => (clientX: number, clientY: number, out: THREE.Vector3) => {
      const rect = gl.domElement.getBoundingClientRect()
      tmp.ndc.set(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1,
      )
      tmp.ray.setFromCamera(tmp.ndc, camera)
      return tmp.ray.ray.intersectPlane(tmp.plane, out)
    },
    [camera, gl, tmp],
  )

  // 드래그 중 포인터 추적은 window 에서 (카드 밖으로 나가도 유지).
  // 빠른 클릭의 pointerup 을 놓치지 않도록 리스너는 pointerdown 시점에 동기적으로 붙인다.
  const detach = useRef<(() => void) | null>(null)
  useEffect(() => () => detach.current?.(), [])

  const onDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    const sim = simRef.current
    const b = sim.pts[4]
    const pointer = new THREE.Vector3()
    if (!toWorld(e.clientX, e.clientY, pointer)) return
    sim.drag = { offset: b.p.clone().sub(pointer), pointer }
    b.invMass = 0
    press.current = { t: performance.now(), x: e.clientX, y: e.clientY }
    setDragging(true)

    // 카드가 캔버스 밖으로 나가지 않도록 가로 범위 제한
    const cam = camera as THREE.PerspectiveCamera
    const halfW =
      Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * cam.position.z * (size.width / size.height)
    const limit = Math.max(0.2, halfW - CARD_W * 0.6)
    const move = (ev: PointerEvent) => {
      if (!sim.drag) return
      toWorld(ev.clientX, ev.clientY, sim.drag.pointer)
      const x = sim.drag.pointer.x + sim.drag.offset.x
      if (x > limit) sim.drag.pointer.x = limit - sim.drag.offset.x
      if (x < -limit) sim.drag.pointer.x = -limit - sim.drag.offset.x
    }
    const up = (ev: PointerEvent) => {
      detach.current?.()
      sim.pts[4].invMass = 0.6
      sim.drag = null
      setDragging(false)
      const p = press.current
      press.current = null
      if (
        p &&
        performance.now() - p.t < TAP_MS &&
        Math.hypot(ev.clientX - p.x, ev.clientY - p.y) < TAP_PX
      ) {
        sim.target = sim.target === 0 ? Math.PI : 0
        sim.yawVel += sim.target ? 5 : -5
      }
    }
    detach.current?.()
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    detach.current = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      detach.current = null
    }
  }

  useFrame((_, delta) => {
    const sim = simRef.current
    const { pts } = sim
    sim.acc += Math.min(delta, 1 / 20)

    while (sim.acc >= STEP) {
      sim.acc -= STEP
      // 적분
      for (const pt of pts) {
        if (!pt.invMass) continue
        tmp.v.subVectors(pt.p, pt.prev).multiplyScalar(DAMPING)
        pt.prev.copy(pt.p)
        pt.p.add(tmp.v)
        pt.p.setY(pt.p.y + GRAVITY * STEP * STEP)
        pt.p.setZ(pt.p.z * 0.98) // 평면 쪽으로 서서히 복귀
      }
      // 드래그: 카드 하단을 포인터에 고정
      if (sim.drag) {
        const b = pts[4]
        b.prev.copy(b.p)
        b.p.copy(sim.drag.pointer).add(sim.drag.offset)
      }
      // 거리 제약
      for (let k = 0; k < ITER; k++) {
        satisfy(pts[0], pts[1], SEG, tmp.v, true)
        satisfy(pts[1], pts[2], SEG, tmp.v, true)
        satisfy(pts[2], pts[3], SEG, tmp.v, true)
        satisfy(pts[3], pts[4], HB, tmp.v)
      }
      // yaw 스프링 (+ 가로 이동이 회전을 살짝 유발)
      const vx = (pts[4].p.x - pts[4].prev.x) / STEP
      const diff = Math.atan2(Math.sin(sim.target - sim.yaw), Math.cos(sim.target - sim.yaw))
      sim.yawVel += (diff * YAW_K - sim.yawVel * YAW_D + vx * 0.35) * STEP
      sim.yaw += sim.yawVel * STEP
    }

    // 카드 자세: B→H 방향을 up 으로, 그 축 기준 yaw 회전
    const h = pts[3].p
    const b = pts[4].p
    tmp.up.subVectors(h, b).normalize()
    tmp.q.setFromUnitVectors(tmp.yAxis, tmp.up)
    tmp.qYaw.setFromAxisAngle(tmp.yAxis, sim.yaw)
    tmp.q.multiply(tmp.qYaw)
    // 카드 중심 = 힌지에서 (HINGE + CARD_H/2) 만큼 아래
    tmp.center.copy(h).addScaledVector(tmp.up, -(HINGE + CARD_H / 2))
    if (cardRef.current) {
      cardRef.current.position.copy(tmp.center)
      cardRef.current.quaternion.copy(tmp.q)
    }

    curve.points[0].copy(h)
    curve.points[1].copy(pts[2].p)
    curve.points[2].copy(pts[1].p)
    curve.points[3].copy(pts[0].p)
    // 끈 정점은 길이 기준 등간격으로 뽑는다 (getPoints 는 끝부분 간격이 들쭉날쭉 → 끝 모양이 매 프레임 바뀌어 깜빡임)
    // 그리고 힌지 아래로 같은 방향으로 TAIL 만큼 연장해 끝단(미터 꺾임)을 클립 뒤에 숨긴다
    const raw = curve.getSpacedPoints(32)
    if (raw.length >= 2) {
      tmp.v.subVectors(raw[0], raw[1]).normalize()
      raw.unshift(raw[0].clone().addScaledVector(tmp.v, TAIL))
    }
    const pts2: THREE.Vector3[] = []
    for (const v of raw) {
      if (!Number.isFinite(v.x) || !Number.isFinite(v.y) || !Number.isFinite(v.z)) continue
      const last = pts2[pts2.length - 1]
      if (last && last.distanceToSquared(v) < MIN_GAP_SQ) continue
      pts2.push(v)
    }
    if (pts2.length >= 2) band.current?.geometry.setPoints(pts2)
  })

  return (
    <>
      <group ref={cardRef}>
        <group
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerDown={onDown}
        >
          {front && (
            <mesh position={[0, 0, 0.012]}>
              <planeGeometry args={[CARD_W, CARD_H]} />
              <meshBasicMaterial map={front} transparent toneMapped={false} />
            </mesh>
          )}
          {back && (
            <mesh position={[0, 0, -0.012]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[CARD_W, CARD_H]} />
              <meshBasicMaterial map={back} transparent toneMapped={false} />
            </mesh>
          )}
        </group>
        {/* 금속 클립 + 고리 */}
        <mesh position={[0, CARD_H / 2 + 0.04, 0]}>
          <boxGeometry args={[0.36, 0.14, 0.06]} />
          <meshStandardMaterial color={METAL} metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0, CARD_H / 2 + HINGE - 0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.07, 0.022, 12, 24]} />
          <meshStandardMaterial color={METAL} metalness={0.85} roughness={0.3} />
        </mesh>
      </group>
      {/* frustumCulled=false: 점이 바뀌어도 bounding sphere 는 처음 값 그대로라 화면 밖으로 오판돼 사라지는 것 방지 */}
      <mesh ref={band} frustumCulled={false} renderOrder={-1}>
        <meshLineGeometry />
        <meshLineMaterial
          args={[{ resolution }]}
          color="white"
          depthTest={false}
          depthWrite={false}
          resolution={resolution}
          useMap={strap ? 1 : 0}
          map={strap ?? undefined}
          repeat={repeat}
          lineWidth={0.5}
          sizeAttenuation={1}
        />
      </mesh>
    </>
  )
}

interface LanyardSceneProps {
  active: boolean
  onReady?: () => void
}

export default function LanyardScene({ active, onReady }: LanyardSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 13], fov: 25 }}
      dpr={[1, 2]}
      frameloop={active ? 'always' : 'never'}
      gl={{ alpha: true, antialias: true }}
      style={{ touchAction: 'pan-y' }}
      aria-hidden
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 4, 6]} intensity={2} />
      <Lanyard onReady={onReady} />
    </Canvas>
  )
}
