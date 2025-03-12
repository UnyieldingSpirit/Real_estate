export default function CheckmarkIcon({ 
  color = '#4C4C4C', 
  size = 105,
  strokeWidth = 10,
  style = {},
  ...props 
}) {
  // Вычисляем высоту пропорционально ширине
  const height = size * (85/105);
  
  return (
    <svg 
      width={size} 
      height={height} 
      viewBox="0 0 105 85" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...props}
    >
      <path 
        d="M99.5 5L33.7 80L5.5 51.875" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}