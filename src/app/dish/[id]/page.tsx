"use client"; // Add this if Header or Footer components require client-side interactivity

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { ChevronLeft, Star } from "lucide-react"; // Assuming usage of Heroicons
import DishCard from "@/components/DishCard";
import ContainerSection from "@/components/ContainerSection";
import Link from "next/link";

// Placeholder data - replace with actual data fetching logic
const dishData = {
  name: "Quarter Pounder with Cheese",
  rating: 4.6,
  region: "Unknown region",
  area: "Unknown area",
  description: "Quarter Pounder with Cheese",
  imageUrl: null, // Placeholder for image URL
};
const topDishes = [
  {
    id: "kfc-tenders-1",
    imageUrl: undefined,
    dishName: "Chicken Tenders",
    restaurantName: "KFC Northallerton",
    address: "32 High Street, Northallerton, North Yorkshire...", // Truncated
    price: 20,
    isRecommended: true,
  },
  {
    id: "mcd-qpc-2",
    imageUrl: undefined,
    dishName: "Quarter Pounder with Ch...",
    restaurantName: "McDonalds",
    address: "472 Elizabeth St, Melbourne VIC 3000",
    price: 20,
    isRecommended: true,
  },
  {
    id: "kfc-slaw-3",
    imageUrl: undefined,
    dishName: "Cole Slaw",
    restaurantName: "KFC Northallerton",
    address: "32 High Street, Northallerton, North Yorkshire...",
    price: 5,
    isRecommended: true,
  },
  {
    id: "kfc-popcorn-4",
    imageUrl: undefined,
    dishName: "Popcorn Chicken",
    restaurantName: "KFC Northallerton",
    address: "32 High Street, Northallerton, North Yorkshire...",
    price: 20,
    isRecommended: true,
  },
  {
    id: "mcd-bigmac-5",
    imageUrl: undefined,
    dishName: "Big Mac",
    restaurantName: "KFC Northallerton",
    address: "32 High Street, Northallerton, North Yorkshire...",
    price: 20,
    isRecommended: true,
  },
];

export default function DishDetailPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {/* Back Link */}
        <Link
          href="/search"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft size={18} className="mr-1" />
          Back
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Image */}
          <div className="lg:col-span-2">
            <div className="bg-gray-200 aspect-video w-full flex items-center justify-center rounded-lg shadow-md">
              {dishData.imageUrl ? (
                <Image
                  src={dishData.imageUrl}
                  alt={dishData.name}
                  width={800}
                  height={450}
                  className="object-cover rounded-lg w-full h-full"
                  priority // Prioritize loading the main image
                />
              ) : (
                <span className="text-gray-500">No Image Available</span>
              )}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              {dishData.name}
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <Star size={14} className="text-yellow-400 fill-current mr-1" />
              <span className="font-medium">{dishData.rating}</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              {dishData.region}, {dishData.area}
            </p>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                About
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {dishData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Top Dishes Section */}
        <ContainerSection title="Top Dishes from this Restaurant">
          {topDishes.map((dish) => (
            <DishCard key={dish.id} {...dish} />
          ))}
        </ContainerSection>
      </main>
      <Footer />
    </div>
  );
}
