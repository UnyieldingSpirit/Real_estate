export default function SlideIndicator({ totalSlides, currentSlide }) {
  return (
    <div className="flex gap-[7px]">
      {[...Array(totalSlides)].map((_, index) => (
        <div
          key={index}
          className={`w-[52px] h-[6px] rounded-sm transition-colors duration-300 ${
            index === currentSlide ? 'bg-[#FF6B6B]' : 'bg-[#EEEEEE]'
          }`}
        />
      ))}
    </div>
  );
}