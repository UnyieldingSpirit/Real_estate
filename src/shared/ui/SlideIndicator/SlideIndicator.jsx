export default function SlideIndicator({ totalSlides, currentSlide }) {
  // Determine indicator size based on screen width
  const getIndicatorSize = () => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 330) return 'w-[40px] h-[5px]';
      if (window.innerWidth <= 360) return 'w-[45px] h-[5px]';
      return 'w-[52px] h-[6px]';
    }
    // Default for server-side rendering
    return 'w-[52px] h-[6px]';
  };

  return (
    <div className="flex gap-[7px]">
      {[...Array(totalSlides)].map((_, index) => (
        <div
          key={index}
          className={`${getIndicatorSize()} rounded-sm transition-colors duration-300 ${
            index === currentSlide ? 'bg-[#FF6B6B]' : 'bg-[#EEEEEE]'
          }`}
        />
      ))}
    </div>
  );
}