import React from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import SectionIndicator from "../common/SectionIndicator";

const previewImages = [
  {
    id: 1,
    title: "Skills Training Workshop",
    imageUrl:
      "https://images.unsplash.com/photo-1589925433383-28310d7a7593?q=80&w=1974&auto=format&fit=crop",
    height: "h-80",
  },
  {
    id: 2,
    title: "Partnership Agreement",
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    height: "h-96",
  },
  {
    id: 3,
    title: "Supporting Mothers",
    imageUrl:
      "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?q=80&w=2070&auto=format&fit=crop",
    height: "h-80",
  },
  {
    id: 4,
    title: "Educational Session",
    imageUrl:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    height: "h-96",
  },
];

const HomeGallery = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="bg-white w-11/12 py-20 md:py-28 overflow-hidden">
      <div className="container  mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <SectionIndicator text="Our Gallery" />
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-brand-dark-gray">
              A Glimpse Into Our Work
            </h2>
          </div>
          <Link to="/gallery" className="mt-4 md:mt-0">
            <button className="font-semibold text-brand-sky-blue py-2 px-4 rounded-lg hover:bg-brand-sky-blue/10 transition-colors">
              View Full Gallery →
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full relative">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pl-4 pr-4 md:pl-8 md:pr-8 lg:pl-container lg:pr-container">
          {previewImages.map((item, index) => (
            <Link
              to="/gallery"
              key={item.id}
              className={`snap-center flex-shrink-0 w-72 md:w-80 relative rounded-xl overflow-hidden group shadow-lg ${item.height}`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-1/2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-200">View in gallery</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeGallery;
