import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SectionIndicator from "../common/SectionIndicator";
import ErrorState from "../common/ErrorState";
import type { GalleryItem } from "../../types";

const HomeGalleryGrid: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get("/api/gallery", {
        params: { limit: 4 },
      });

      if (data && Array.isArray(data.images)) {
        setItems(data.images);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch gallery items:", error);
      setError(
        "Could not load gallery items. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">Loading Gallery...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto">
          <ErrorState message={error} onRetry={fetchItems} />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white w-11/12 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <SectionIndicator text="Our Gallery" />
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-brand-dark-gray">
              Moments of Impact
            </h2>
          </div>
          <Link to="/impact/gallery" className="hidden sm:block">
            <button className="font-semibold text-brand-dark-gray py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
              See More →
            </button>
          </Link>
        </div>

        {/* --- The New Static Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link
              key={item._id}
              to="/impact/gallery"
              className="block rounded-2xl shadow-lg overflow-hidden h-96 group relative"
            >
              <img
                src={item.imageUrls[0]}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                  {item.category}
                </span>
                <h3 className="mt-4 text-2xl font-bold font-display">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeGalleryGrid;
