// components/Loader.tsx
import React from "react";

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay with configurable opacity */}
      <div 
        className="absolute inset-0 bg-white dark:bg-gray-900" 
        style={{ opacity: 0.7 }}
      />
      
      {/* Loader container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <img 
          src="/plane_loader.gif" 
          alt="Loading..."
          className="w-24 h-24" // Adjust size as needed
        />
      </div>
    </div>
  );
};