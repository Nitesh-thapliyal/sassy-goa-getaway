import React from "react";
import "../styles/manga-animations.css";

interface MangaLayoutProps {
  children: React.ReactNode;
  isTransitioning?: boolean;
}

const MangaLayout = ({ children, isTransitioning }: MangaLayoutProps) => {
  return (
    <div className="manga-container perspective">
      <div className="manga-grain-overlay"></div>
      <div className={`manga-page ${isTransitioning ? "page-transition" : ""}`}>
        <div className="page-fold"></div>
        <div className="speed-lines"></div>
        <div className="manga-content">{children}</div>
        {/* REMOVED THE RANDOM PAGE NUMBER COMPLETELY */}
      </div>

      <style>{`
        .manga-container {
          @apply min-h-screen w-full bg-black relative overflow-hidden;
          perspective: 2000px;
        }
        .manga-grain-overlay {
          @apply fixed inset-0 pointer-events-none opacity-20;
          background-image: url('/grain-texture.png');
          mix-blend-mode: overlay;
        }
        .manga-page {
          @apply bg-white m-4 rounded-lg shadow-2xl relative overflow-hidden;
          min-height: calc(100vh - 2rem);
          transform-origin: left center;
        }
        .page-fold {
          @apply absolute top-0 right-0 w-16 h-full opacity-20;
          background: linear-gradient(
            to right,
            transparent,
            rgba(0,0,0,0.2) 50%,
            rgba(0,0,0,0.1) 100%
          );
          transform: skewX(-3deg);
        }
        .manga-content {
          @apply p-6 relative z-10;
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default MangaLayout;
