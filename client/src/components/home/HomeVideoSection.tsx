import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SectionIndicator from "../common/SectionIndicator";
import { YouTubePlayer } from "../videos/VideoCard";
import type { Video } from "../../types";
import api from "../../services/api";

const HomeVideoSection: React.FC = () => {
  const [featuredVideo, setFeaturedVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const { data } = await api.get("/api/videos", {
          params: { limit: 1 },
        });
        if (data.videos && data.videos.length > 0) {
          setFeaturedVideo(data.videos[0]);
        }
      } catch (error) {
        console.error("Could not fetch featured video", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestVideo();
  }, []);

  return (
    <section className="bg-neutral-light flex justify-center py-20 md:py-28">
      <div className="container w-11/12 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <SectionIndicator text="Impact Stories" />
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-brand-dark-gray">
              Hear Directly From The Lives We've Touched
            </h2>
            {isLoading ? (
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Loading the latest story...
              </p>
            ) : featuredVideo ? (
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Our work is best told through the voices of those who have
                experienced it. Watch this story to understand the profound
                impact of your support.
              </p>
            ) : (
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                We are currently curating new impact stories. Subscribe to our
                YouTube channel to be notified when new videos are released!
              </p>
            )}
            <div className="mt-8">
              {featuredVideo ? (
                <Link to="/impact/videos">
                  <button className="bg-brand-sky-blue text-white font-bold py-3 px-8 rounded-lg">
                    Watch More Stories
                  </button>
                </Link>
              ) : (
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-brand-rose text-white font-bold py-3 px-8 rounded-lg">
                    Subscribe on YouTube
                  </button>
                </a>
              )}
            </div>
          </div>

          <div className="relative aspect-video w-full rounded-2xl shadow-2xl overflow-hidden">
            {isLoading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse"></div>
            ) : featuredVideo ? (
              <YouTubePlayer
                videoId={featuredVideo.youtubeId}
                title={featuredVideo.title}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center p-8 text-center">
                <h3 className="font-bold text-gray-600">
                  No Video Available Yet
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Check back soon for new stories of hope!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeVideoSection;
