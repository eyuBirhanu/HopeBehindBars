import React, { useState, useEffect } from "react";
import VideoCard from "../components/videos/VideoCard";
import type { Video } from "../types"; 
import { EmptyStateIcon } from "../components/common/admin/AdminIcons"; 
import SEO from "../components/common/SEO";
import api from "../services/api";

const categories = [
  "All",
  "Testimonials",
  "Program Highlights",
  "Community Stories",
];

const ImpactVideosPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/api/videos", {
          params: { category: activeCategory === "All" ? "" : activeCategory },
        });
        setVideos(data.videos || []);
      } catch (error) {
        console.error("Failed to fetch videos", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [activeCategory]);

  const NoVideosFound = () => (
    <div className="text-center py-16 px-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <EmptyStateIcon />
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        No Videos Found in this Category
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        We're always adding new stories. Subscribe to our YouTube channel to be
        the first to know.
      </p>
      <div className="mt-6">
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-brand-rose text-white font-bold py-2.5 px-6 rounded-lg">
            Subscribe on YouTube
          </button>
        </a>
      </div>
    </div>
  );

  return (
    <main className="bg-neutral-light py-20 md:py-28">
      <SEO
        title="Impact Videos"
        description="Watch the stories of change, resilience, and hope that your support makes possible through Hope Behind Bars."
        url="/impact/videos"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-brand-dark-gray">
            Impact Videos
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Watch the stories of change, resilience, and hope that your support
            makes possible.
          </p>
        </div>

        {/* Filters */}
        <div className="my-12 flex flex-wrap items-center justify-center gap-2 border-y border-gray-200 py-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-brand-dark-gray text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Grid or Fallback Message */}
        {loading ? (
          <div className="text-center text-gray-500 py-10">
            Loading videos...
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        ) : (
          <NoVideosFound />
        )}
      </div>
    </main>
  );
};

export default ImpactVideosPage;
