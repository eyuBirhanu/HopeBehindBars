import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { GalleryItem } from "../types";
import ImageLightbox from "../components/gallery/ImageLightbox";
import FilterBar from "../components/gallery/FilterBar";
import { EmptyStateIcon } from "../components/common/admin/AdminIcons";
import SEO from "../components/common/SEO";

const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [_page, setPage] = useState(1);
  const [filters, setFilters] = useState({ category: "All", search: "" });
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const fetchItems = useCallback(
    async (
      currentPage: number,
      currentFilters: typeof filters,
      isNewFilter: boolean
    ) => {
      isNewFilter ? setLoading(true) : setLoadingMore(true);
      if (isNewFilter) setItems([]);

      try {
        const { data } = await axios.get("/api/gallery", {
          params: {
            page: currentPage,
            limit: 9,
            category:
              currentFilters.category === "All" ? "" : currentFilters.category,
            search: currentFilters.search,
          },
        });
        setItems((prev) =>
          isNewFilter ? data.images : [...prev, ...data.images]
        );
        setHasMore(data.hasMore);
      } catch (error) {
        console.error("Failed to fetch gallery items", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    []
  );

  useEffect(() => {
    setPage(1);
    fetchItems(1, filters, true);
  }, [filters, fetchItems]);

  const NoResultsFound = () => (
    <div className="col-span-full text-center py-16 px-4 bg-white rounded-lg shadow-sm">
      <EmptyStateIcon />
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        No Results Found
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Try adjusting your search or filter to find what you're looking for.
      </p>
    </div>
  );

  return (
    <>
      <SEO
        title="Gallery"
        description="Explore moments of impact, transformation, and hope from our work across the country through our official gallery."
      />
      <ImageLightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
      <main className="bg-neutral-light min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="font-display text-5xl font-bold text-brand-dark-gray">
              Our Gallery
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore moments of impact, partnership, and empowerment.
            </p>
          </div>
          <FilterBar onFilterChange={setFilters} />
          {loading && items.length === 0 && (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-72 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          )}
          {!loading && items.length > 0 && (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="group relative rounded-lg overflow-hidden cursor-pointer shadow-md"
                  onClick={() => setSelectedItem(item)}
                >
                  <img
                    src={item.imageUrls[0]}
                    alt={item.title}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <h3 className="text-white font-bold text-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && items.length === 0 && (
            <div className="mt-12">
              <NoResultsFound />
            </div>
          )}
          <div className="text-center mt-12">
            {loadingMore ? (
              <p className="text-gray-500">Loading more...</p>
            ) : hasMore && items.length > 0 ? (
              <button
                onClick={() => setPage((p) => p + 1)}
                className="bg-brand-dark-gray text-white font-bold py-3 px-8 rounded-lg hover:bg-black"
              >
                Load More
              </button>
            ) : items.length > 0 ? (
              <p className="text-gray-500">You've reached the end.</p>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
};

export default GalleryPage;
