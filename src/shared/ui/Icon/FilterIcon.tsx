export default function FilterIcon({ 
  color = '#343434', 
  size = 24,
  style = {},
  ...props 
}) {
  const height = size * (25/23);
  
  return (
    <svg 
      width={size} 
      height={height} 
      viewBox="0 0 23 25" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...props}
    >
      <path 
        d="M0.5 0H22.5L14.6429 10.1562V25L8.35714 18.75V10.1562L0.5 0Z" 
        fill={color}
      />
    </svg>
  );
}