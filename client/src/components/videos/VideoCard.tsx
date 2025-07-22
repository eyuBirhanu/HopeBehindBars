import React from "react";
import type { Video } from "../../types";

export const YouTubePlayer = ({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) => (
  <iframe
    className="absolute inset-0 w-full h-full"
    src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
    title={title}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
);

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="w-full">
      <div className="relative aspect-video w-full rounded-xl shadow-lg overflow-hidden group mb-4">
        <YouTubePlayer videoId={video.youtubeId} title={video.title} />
      </div>
      <h3 className="text-xl font-bold text-brand-dark-gray">{video.title}</h3>
      <p className="mt-1 text-gray-600 text-sm line-clamp-2">
        {video.description}
      </p>
    </div>
  );
};

export default VideoCard;
