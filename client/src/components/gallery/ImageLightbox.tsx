import React, { useState, useEffect, useRef } from "react";
import { CloseIcon, ZoomInIcon, ZoomOutIcon } from "../common/admin/AdminIcons"; 

interface ImageLightboxProps {
  item: { imageUrls: string[]; title: string; description: string } | null;
  onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ item, onClose }) => {
  const [scale, setScale] = useState(1);
  const [panning, setPanning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [start, setStart] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [item]);

  if (!item) return null;

  const handleZoomIn = () => setScale((s) => Math.min(s * 1.5, 4));
  const handleZoomOut = () => setScale((s) => Math.max(s / 1.5, 1));

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      e.preventDefault();
      setPanning(true);
      setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (panning) {
      e.preventDefault();
      setPosition({ x: e.clientX - start.x, y: e.clientY - start.y });
    }
  };

  const handleMouseUp = () => setPanning(false);

  const controlButtonStyles =
    "bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-colors hover:bg-white hover:text-black";

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4 flex gap-x-3 z-20">
        <button
          onClick={handleZoomIn}
          disabled={scale >= 4}
          className={`${controlButtonStyles} disabled:opacity-50`}
        >
          <ZoomInIcon />
        </button>
        <button
          onClick={handleZoomOut}
          disabled={scale <= 1}
          className={`${controlButtonStyles} disabled:opacity-50`}
        >
          <ZoomOutIcon />
        </button>
        <button onClick={onClose} className={controlButtonStyles}>
          <CloseIcon />
        </button>
      </div>

      <div
        className="relative w-full h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="overflow-hidden w-full h-full flex items-center justify-center"
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            ref={imgRef}
            src={item.imageUrls[0]}
            alt={item.title}
            className={`object-contain rounded-lg shadow-2xl transition-transform duration-300 ease-in-out ${
              panning ? "cursor-grabbing" : scale > 1 ? "cursor-grab" : ""
            }`}
            style={{
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white max-w-4xl mx-auto rounded-b-lg pointer-events-none">
          <h3 className="font-bold text-lg">{item.title}</h3>
          <p className="text-sm text-gray-200 mt-1">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;
