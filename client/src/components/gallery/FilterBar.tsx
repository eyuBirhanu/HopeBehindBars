import React, { useState, useEffect } from "react";

interface FilterBarProps {
  onFilterChange: (filters: { category: string; search: string }) => void;
}

const categories = [
  "All",
  "Partnerships",
  "Education",
  "Support",
  "Skills Training",
];

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onFilterChange({ category: activeCategory, search: searchTerm });
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, activeCategory, onFilterChange]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="sticky top-20 z-20 bg-neutral-light/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg  focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="flex-shrink-0 flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-brand-dark-gray text-white"
                  : 
                    "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
