import React from 'react';
import Image from 'next/image';
import { Star, Clock } from 'lucide-react';
import Link from 'next/link';

interface RestaurantCardProps {
  id: string; // Add restaurant ID for navigation
  imageUrl?: string; // Optional image URL
  name: string;
  rating: number;
  location: string;
  tags: string[];
  // Add a prop for booking link if needed
  // bookingUrl?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  imageUrl,
  name,
  rating,
  location,
  tags,
}) => {
  return (
    <Link href={`/restaurant/${id}`} className="block flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* Image Placeholder or Actual Image */}
      <div className="relative w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <span>No Image Available</span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-md truncate" title={name}>{name}</h3>
          <div className="flex items-center space-x-1 text-yellow-500 flex-shrink-0">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
          <p className="truncate" title={location}>{location}</p>
          <Clock size={12} className="ml-2 flex-shrink-0" />
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>

        <button className="w-full bg-purple-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-purple-700 transition duration-200">
          Book Online
        </button>
      </div>
    </Link>
  );
};

export default RestaurantCard;
