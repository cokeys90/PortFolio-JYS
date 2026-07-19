/**
 * 외부 웹사이트로 이동하는 링크임을 나타내는 지구본 아이콘.
 * 제목 옆에 붙여, hover 없이도 클릭 시 사이트로 이동함을 알린다.
 */
export function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-1.5 inline-block h-[0.85em] w-[0.85em] translate-y-[0.06em] transition-transform group-hover/card:translate-x-0.5 group-hover/fcard:translate-x-0.5 motion-reduce:transition-none"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
