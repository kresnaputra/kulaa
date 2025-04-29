import React from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface OfferCardProps {
  id: string; // Add ID for navigation
  imageUrl?: string; // Optional image URL
  discount: string; // e.g., "75% OFF"
  restaurantName: string;
  location: string;
  rating: number;
  offerTitle: string;
  originalPrice: number;
  discountedPrice: number;
}

const OfferCard: React.FC<OfferCardProps> = ({
  id,
  imageUrl,
  discount,
  restaurantName,
  location,
  rating,
  offerTitle,
  originalPrice,
  discountedPrice,
}) => {
  return (
    <Link href={`/offers/${id}`} className="block bg-white rounded-lg shadow-md overflow-hidden w-72 flex-shrink-0 hover:shadow-lg transition-shadow duration-200">
      <div className="relative h-40 bg-gray-200 flex items-center justify-center text-gray-500">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={offerTitle} 
            layout="fill" 
            objectFit="cover" 
            className="object-cover" 
          />
        ) : (
          <span>No Image Available</span>
        )}
        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          {discount}
        </span>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs text-gray-600 truncate w-4/5">
            {restaurantName}, {location}
          </span>
          <div className="flex items-center text-xs text-gray-800">
            <Star size={14} className="text-yellow-400 fill-current mr-1" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="font-semibold text-sm mb-2 truncate">{offerTitle}</h3>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-gray-500 line-through mr-2">
              £{originalPrice.toFixed(2)}
            </span>
            <span className="font-bold text-green-600">
              £{discountedPrice.toFixed(2)}
            </span>
          </div>
          <button className="bg-purple-600 text-white text-xs font-semibold px-4 py-1.5 rounded-md hover:bg-purple-700 transition duration-200">
            Claim
          </button>
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;
