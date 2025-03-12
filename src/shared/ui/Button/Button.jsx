export default function Button({ onClick, children, variant = 'primary', ...props }) {
  const getButtonStyles = () => {
    if (variant === 'circle') {
      return {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: '#FFF0F0',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      };
    }
    
    return {
      padding: '12px 24px',
      borderRadius: '8px',
      backgroundColor: '#FF6B6B',
      color: 'white',
      border: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
    };
  };

  return (
    <button 
      onClick={onClick}
      style={getButtonStyles()}
      {...props}
    >
      {children}
    </button>
  );
}