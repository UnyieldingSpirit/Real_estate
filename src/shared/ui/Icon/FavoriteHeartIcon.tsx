export default function FavoriteHeartIcon({ 
  color = '#DC2735', 
  size = 21,
  style = {},
  ...props 
}) {
  // Вычисляем высоту пропорционально ширине
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
        d="M11.0316 18.009C10.6848 18.1303 10.1136 18.1303 9.76682 18.009C6.80882 17.0078 0.199219 12.8314 0.199219 5.75278C0.199219 2.62807 2.73902 0.0999756 5.87042 0.0999756C7.72682 0.0999756 9.36902 0.989863 10.3992 2.36514C10.9233 1.66322 11.6059 1.09273 12.3923 0.699379C13.1787 0.306027 14.0472 0.100744 14.928 0.0999756C18.0594 0.0999756 20.5992 2.62807 20.5992 5.75278C20.5992 12.8314 13.9896 17.0078 11.0316 18.009Z" 
        fill={color}
      />
    </svg>
  );
}