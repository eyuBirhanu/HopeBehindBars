import React from "react";
import ProgressBar from "../common/ProgressBar";

interface NeedCardProps {
  imageUrl: string;
  category: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  progress: number;
  ctaText: string;
  onDonateClick: () => void;
  ctaColor?: "white" | "rose";
}

const NeedCard: React.FC<NeedCardProps> = ({
  imageUrl,
  category,
  title,
  description,
  goal,
  raised,
  progress,
  ctaText,
  onDonateClick,
  ctaColor = "white",
}) => {
  const buttonColorStyles = {
    white: "bg-white text-brand-dark-gray hover:bg-gray-200",
    rose: "bg-brand-rose text-white hover:bg-brand-rose/80",
  };

  return (
    <div className="relative rounded-2xl shadow-lg overflow-hidden h-full flex flex-col group min-h-[450px]">
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      <div className="relative p-6 flex flex-col h-full text-white z-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider bg-white/30 backdrop-blur-sm border border-white/20 text-white px-3 py-1.5 rounded-full">
            {category}
          </span>

          <h3 className="mt-4 font-display text-2xl font-bold">{title}</h3>
          <p className="mt-2 text-sm text-gray-200">{description}</p>
        </div>

        <div className="flex-grow"></div>

        <div>
          <div className="mb-4">
            <ProgressBar progress={progress} />
            <div className="flex justify-between text-xs mt-2 font-semibold">
              <span>Raised: ${raised.toLocaleString()}</span>
              <span>Goal: ${goal.toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={onDonateClick}
            className={`w-full font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md ${buttonColorStyles[ctaColor]}`}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeedCard;
