type CourseArrowProps = {
  direction?: 'up-right' | 'right' | 'down' | 'left';
};

/** Decorative navigation icon, independent of the active interface font. */
export default function CourseArrow({ direction = 'up-right' }: CourseArrowProps) {
  const rotation = { 'up-right': -45, right: 0, down: 90, left: 180 }[direction];
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <path d="M5 12h14m-6-6 6 6-6 6" transform={`rotate(${rotation} 12 12)`} />
    </svg>
  );
}
