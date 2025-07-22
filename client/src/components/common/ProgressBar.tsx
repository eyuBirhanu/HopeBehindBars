import React from "react";

interface ProgressBarProps {
  progress: number; 
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
      <div
        className="bg-brand-sky-blue h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
