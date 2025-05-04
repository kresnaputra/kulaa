import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div
      className="animate-pulse bg-gray-200 rounded-lg shadow-md overflow-hidden w-full h-[280px]"
    >
      <div className="h-36 bg-gray-300"></div>
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
}
