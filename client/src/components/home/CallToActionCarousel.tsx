import React, { useState, useEffect } from "react";

interface SlideData {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop",
    title: "Provide Essential Support",
    description:
      "Your donation provides hygiene kits, clothing, and basic necessities, restoring dignity to women in prison.",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    title: "Empower Through Education",
    description:
      "Fund educational sessions and skill-based workshops that create pathways to a better future upon release.",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=870&auto=format&fit=crop",
    title: "Reconnect Families",
    description:
      "Help us support mothers and their children with resources to maintain and strengthen their crucial family bonds.",
  },
];

interface CallToActionCarouselProps {
  onDonateClick: () => void;
}

const CallToActionCarousel: React.FC<CallToActionCarouselProps> = ({
  onDonateClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <section className="relative h-[90vh] md:h-[70vh] rounded-3xl overflow-hidden w-11/12 text-white  shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 h-full w-full rounded-3xl overflow-hidden transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
      ))}
      <div className="absolute rounded-3xl overflow-hidden inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="relative rounded-3xl overflow-hidden  z-10 flex h-full flex-col items-start justify-end text-left p-8 md:p-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold drop-shadow-lg">
          {slides[currentIndex].title}
        </h1>
        <p className="mt-4 text-white/80 max-w-xl text-base drop-shadow-md">
          {slides[currentIndex].description}
        </p>
        <div className="mt-8">
          <button
            onClick={onDonateClick}
            className="bg-white text-brand-dark-gray font-semibold py-3 px-8 rounded-lg text-base transition-colors duration-300 hover:bg-gray-200 shadow-lg"
          >
            Donate to Make a Difference
          </button>
        </div>
      </div>
      <div className="absolute bottom-6 right-10 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-[6px] w-[6px] rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default CallToActionCarousel;
