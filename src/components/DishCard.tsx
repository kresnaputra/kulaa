import React from 'react';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import Link from 'next/link';

interface DishCardProps {
  id: string | number;
  imageUrl?: string;
  dishName: string;
  restaurantName: string;
  address: string;
  price: number;
  isRecommended?: boolean;
}

const DishCard: React.FC<DishCardProps> = ({
  id,
  imageUrl,
  dishName,
  restaurantName,
  address,
  price,
  isRecommended = false, // Default to not recommended
}) => {
  return (
    <Link href={`/dish/${id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-72 h-full flex flex-col group-hover:shadow-lg transition-shadow duration-200">
        <div className="relative h-36 w-full bg-gray-200 flex items-center justify-center text-gray-500">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={dishName}
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          ) : (
            <span>No Image Available</span>
          )}
          {isRecommended && (
            <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md">
              KULAA RECOMMENDS
            </span>
          )}
        </div>
        <div className="p-3 flex flex-col flex-grow">
          <h3 className="font-semibold text-sm mb-0.5 truncate">{dishName}</h3>
          <p className="text-xs text-gray-700 font-medium mb-0.5 truncate">{restaurantName}</p>
          <p className="text-xs text-gray-500 mb-2 truncate">{address}</p>
          <div className="flex justify-between items-center mt-auto">
            <span className="font-bold text-sm text-purple-700">
              £{price.toFixed(price % 1 === 0 ? 0 : 2)} {/* Show .00 only if needed */}
            </span>
            <Clock size={14} className="text-gray-400" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DishCard;
