export default function DropdownArrowIcon({ 
  color = '#1F1F1F', 
  size = 16,
  strokeWidth = 2,
  className = '',
  style = {},
  ...props 
}) {
  // Calculate height proportionally (for this icon 9/16 ratio)
  const height = Math.floor(size * (9/16));
  
  return (
    <svg 
      width={size} 
      height={height} 
      viewBox="0 0 16 9" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      {...props}
    >
      <path 
        d="M1.5 1L8 7.5L14.5 1" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}