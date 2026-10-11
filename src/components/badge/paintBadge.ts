import { badgeInfo } from './badgeData'

/** 사원증 텍스처 해상도 (2:3) */
export const BADGE_W = 640
export const BADGE_H = 960

// 캔버스는 CSS 변수를 읽을 수 없어 토큰 값을 런타임에 읽어온다
function token(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

const SANS = '"Pretendard Variable", Pretendard, system-ui, sans-serif'
const MONO = '"JetBrains Mono", Menlo, monospace'
const SERIF = '"Instrument Serif", serif'

async function ready() {
  try {
    await Promise.all([
      document.fonts.load(`700 40px ${SANS}`),
      document.fonts.load(`400 20px ${MONO}`),
      document.fonts.load(`italic 400 40px ${SERIF}`),
    ])
  } catch {
    /* 폰트 로드 실패 시 시스템 폰트로 진행 */
  }
}

/** 사원증 앞면: 상단 잉크 밴드 + 사진 + 이름 + 바코드 */
export async function paintFront(): Promise<HTMLCanvasElement> {
  await ready()
  const c = document.createElement('canvas')
  c.width = BADGE_W
  c.height = BADGE_H
  const ctx = c.getContext('2d')!
  const ink = token('--ink', '#121a2e')
  const surface = token('--surface', '#fbf8f2')
  const muted = token('--muted', '#6b6a66')
  const line = token('--line', '#e1dacb')
  const onInk = token('--on-ink', '#f8f5ee')

  roundRect(ctx, 0, 0, BADGE_W, BADGE_H, 44)
  ctx.save()
  ctx.clip()
  ctx.fillStyle = surface
  ctx.fillRect(0, 0, BADGE_W, BADGE_H)

  // 상단 밴드
  ctx.fillStyle = ink
  ctx.fillRect(0, 0, BADGE_W, 190)
  // 클립 구멍
  ctx.fillStyle = surface
  roundRect(ctx, BADGE_W / 2 - 54, 34, 108, 20, 10)
  ctx.fill()

  ctx.fillStyle = onInk
  ctx.font = `600 22px ${MONO}`
  ctx.textBaseline = 'alphabetic'
  ctx.fillText('DEVELOPER ID', 56, 118)
  ctx.globalAlpha = 0.6
  ctx.font = `400 18px ${MONO}`
  ctx.fillText(`${badgeInfo.handle} · since ${badgeInfo.since}`, 56, 150)
  ctx.globalAlpha = 1
  // 모노그램
  ctx.strokeStyle = onInk
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(BADGE_W - 96, 122, 34, 0, Math.PI * 2)
  ctx.stroke()
  ctx.font = `500 20px ${MONO}`
  ctx.textAlign = 'center'
  ctx.fillText('YS', BADGE_W - 96, 129)
  ctx.textAlign = 'left'

  // 사진
  const px = 150
  const py = 240
  const pw = BADGE_W - px * 2
  const ph = 400
  try {
    const img = await loadImage(badgeInfo.photo)
    ctx.save()
    roundRect(ctx, px, py, pw, ph, 28)
    ctx.clip()
    const scale = Math.max(pw / img.width, ph / img.height)
    const dw = img.width * scale
    const dh = img.height * scale
    ctx.drawImage(img, px + (pw - dw) / 2, py + (ph - dh) * 0.25, dw, dh)
    ctx.restore()
  } catch {
    ctx.fillStyle = line
    roundRect(ctx, px, py, pw, ph, 28)
    ctx.fill()
  }
  ctx.strokeStyle = line
  ctx.lineWidth = 3
  roundRect(ctx, px, py, pw, ph, 28)
  ctx.stroke()

  // 이름
  ctx.textAlign = 'center'
  ctx.fillStyle = ink
  ctx.font = `700 54px ${SANS}`
  ctx.fillText(badgeInfo.nameKo, BADGE_W / 2, 716)
  ctx.fillStyle = muted
  ctx.font = `500 20px ${MONO}`
  ctx.fillText(badgeInfo.nameEn, BADGE_W / 2, 752)
  ctx.fillStyle = ink
  ctx.font = `italic 400 36px ${SERIF}`
  ctx.fillText(badgeInfo.role, BADGE_W / 2, 800)
  ctx.textAlign = 'left'

  // 하단 메타 + 바코드
  ctx.strokeStyle = line
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(56, 834)
  ctx.lineTo(BADGE_W - 56, 834)
  ctx.stroke()
  ctx.fillStyle = muted
  ctx.font = `400 17px ${MONO}`
  ctx.fillText(badgeInfo.idNo, 56, 872)
  ctx.fillText('ANDROID', 56, 902)
  ctx.fillStyle = ink
  let x = 300
  let seed = 7
  while (x < BADGE_W - 56) {
    seed = (seed * 9301 + 49297) % 233280
    const w = 2 + (seed % 5)
    ctx.fillRect(x, 852, w, 56)
    x += w + 3 + (seed % 4)
  }
  ctx.restore()
  return c
}

/** 사원증 뒷면: 잉크 배경 + 모노그램 + 연락처 */
export async function paintBack(): Promise<HTMLCanvasElement> {
  await ready()
  const c = document.createElement('canvas')
  c.width = BADGE_W
  c.height = BADGE_H
  const ctx = c.getContext('2d')!
  const ink = token('--ink', '#121a2e')
  const onInk = token('--on-ink', '#f8f5ee')

  roundRect(ctx, 0, 0, BADGE_W, BADGE_H, 44)
  ctx.save()
  ctx.clip()
  ctx.fillStyle = ink
  ctx.fillRect(0, 0, BADGE_W, BADGE_H)
  ctx.fillStyle = onInk
  ctx.globalAlpha = 0.08
  for (let gy = 0; gy < BADGE_H; gy += 32) {
    for (let gx = 0; gx < BADGE_W; gx += 32) {
      ctx.beginPath()
      ctx.arc(gx + 16, gy + 16, 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  ctx.globalAlpha = 1
  ctx.globalAlpha = 0.2
  roundRect(ctx, BADGE_W / 2 - 54, 34, 108, 20, 10)
  ctx.fill()
  ctx.globalAlpha = 1

  ctx.fillStyle = onInk
  ctx.textAlign = 'center'
  ctx.font = `italic 400 230px ${SERIF}`
  ctx.fillText('ys.', BADGE_W / 2, 470)
  ctx.font = `500 20px ${MONO}`
  ctx.globalAlpha = 0.7
  ctx.fillText('NATIVE FIRST · FULL-STACK WHEN NEEDED', BADGE_W / 2, 560)
  ctx.globalAlpha = 1
  ctx.font = `400 22px ${MONO}`
  ctx.fillText(badgeInfo.github, BADGE_W / 2, 780)
  ctx.fillText(badgeInfo.email, BADGE_W / 2, 820)
  ctx.globalAlpha = 0.5
  ctx.font = `400 16px ${MONO}`
  ctx.fillText('눌러서 뒤집기 · 끌어서 흔들기', BADGE_W / 2, 900)
  ctx.restore()
  return c
}

/** 랜야드 끈 텍스처 (반복) */
export function paintStrap(): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = 512
  c.height = 64
  const ctx = c.getContext('2d')!
  ctx.fillStyle = token('--ink', '#121a2e')
  ctx.fillRect(0, 0, c.width, c.height)
  ctx.fillStyle = token('--on-ink', '#f8f5ee')
  ctx.globalAlpha = 0.85
  ctx.font = `600 26px ${MONO}`
  ctx.textBaseline = 'middle'
  ctx.fillText('COKE.YS  ✦  JEONG YUNSU  ✦', 16, 34)
  return c
}
