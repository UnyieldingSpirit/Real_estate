export default function MailIcon({ 
  color = 'white', 
  size = 21,
  strokeWidth = 1.5,
  style = {},
  ...props 
}) {
  // Рассчитываем высоту пропорционально
  const height = size * (19/21);
  
  return (
    <svg 
      width={size} 
      height={height} 
      viewBox="0 0 21 19" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...props}
    >
      <path 
        d="M15.5 1H5C2.79086 1 1 2.79086 1 5V14C1 16.2091 2.79086 18 5 18H15.5C17.7091 18 19.5 16.2091 19.5 14V5C19.5 2.79086 17.7091 1 15.5 1Z" 
        stroke={color} 
        strokeWidth={strokeWidth}
      />
      <path 
        d="M1.04688 5.08997L8.25187 9.21997C8.85565 9.57032 9.54131 9.75485 10.2394 9.75485C10.9374 9.75485 11.6231 9.57032 12.2269 9.21997L19.4519 5.08997" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}