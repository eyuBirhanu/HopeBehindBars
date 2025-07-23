import React, { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import type { GalleryItem } from "../types";
import ImageLightbox from "../components/gallery/ImageLightbox";
import SEO from "../components/common/SEO";

const EmptyStateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto h-12 w-12 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const categories = [
  "All",
  "Partnerships",
  "Education",
  "Support",
  "Skills Training",
];

const FilterBar = ({
  onFilterChange,
}: {
  onFilterChange: (filters: { category: string; search: string }) => void;
}) => {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange({ category, search });
    }, 500); // Debounce search input
    return () => clearTimeout(handler);
  }, [category, search, onFilterChange]);

  return (
    <div className="my-12 flex flex-col md:flex-row items-center justify-between gap-4 border-y border-gray-200 py-4">
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
              category === cat
                ? "bg-brand-dark-gray text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search by keyword..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-full focus:ring-brand-sky-blue focus:border-brand-sky-blue"
      />
    </div>
  );
};

const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ category: "All", search: "" });
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const fetchItems = useCallback(
    async (isNewFilterSearch: boolean) => {
      const pageToFetch = isNewFilterSearch ? 1 : page;
      isNewFilterSearch ? setInitialLoading(true) : setLoadingMore(true);

      try {
        const { data } = await api.get("/api/gallery", {
          params: {
            page: pageToFetch,
            limit: 9,
            category: filters.category === "All" ? "" : filters.category,
            search: filters.search,
          },
        });

        setItems((prevItems) =>
          isNewFilterSearch ? data.images : [...prevItems, ...data.images]
        );
        setHasMore(data.hasMore);
        setPage(pageToFetch + 1);
      } catch (error) {
        console.error("Failed to fetch gallery items", error);
      } finally {
        setInitialLoading(false);
        setLoadingMore(false);
      }
    },
    [page, filters]
  );

  useEffect(() => {
    setPage(1);
    fetchItems(true);
  }, [filters]);

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
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-5xl font-bold text-brand-dark-gray">
              Our Gallery
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore moments of impact, partnership, and empowerment.
            </p>
          </div>

          <FilterBar onFilterChange={setFilters} />

          {initialLoading ? (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-72 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          ) : items.length > 0 ? (
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
          ) : (
            <div className="mt-12">
              <NoResultsFound />
            </div>
          )}

          <div className="text-center mt-12">
            {hasMore && !initialLoading && (
              <button
                onClick={() => fetchItems(false)}
                disabled={loadingMore}
                className="bg-brand-dark-gray text-white font-bold py-3 px-8 rounded-lg hover:bg-black disabled:opacity-50"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            )}
            {!hasMore && items.length > 0 && (
              <p className="text-gray-500">You've reached the end.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default GalleryPage;
