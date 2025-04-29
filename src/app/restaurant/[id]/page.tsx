import React from "react";
import { ChevronLeft, Star } from "lucide-react";
import Header from "@/components/Header";
import Link from "next/link";

// Placeholder data - replace with actual data fetching logic based on params.id
const restaurantData = {
  id: "1",
  name: "Zimo's Dumplings",
  rating: 5.0,
  location: "West Dunbartonshire, Scotland",
  tags: ["Dumplings", "Chinese"],
  images: [
    "", // Main large image (placeholder)
    "", // Small image 1 (placeholder)
    "", // Small image 2 (placeholder)
  ],
  about: "Authentic handcrafted dumplings and traditional Chinese dishes.", // Placeholder about text
  priceRange: "£ 10 - £ 20", // As per screenshot
  openingTimes: [
    { day: "Monday", hours: "9:00 - 17:00" },
    { day: "Tuesday", hours: "9:00 - 17:00" },
    { day: "Wednesday", hours: "9:00 - 17:00" },
    { day: "Thursday", hours: "9:00 - 17:00" },
    { day: "Friday", hours: "9:00 - 17:00" },
    { day: "Saturday", hours: "9:00 - 17:00" },
    { day: "Sunday", hours: "9:00 - 17:00" },
  ],
};

// Reusable component for image placeholders
const ImagePlaceholder = ({ className = "" }: { className?: string }) => (
  <div
    className={`bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm ${className}`}
  >
    No Image Available
  </div>
);

const RestaurantDetailPage = ({ params }: { params: { id: string } }) => {
  // Fetch actual data based on params.id here
  console.log("Restaurant ID:", params.id);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link
          href="/search"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft size={18} className="mr-1" />
          Back
        </Link>
        {/* Image Gallery Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8 md:h-96">
          {/* Main Image (Larger) */}
          <div className="md:col-span-2 h-64 md:h-full relative rounded-lg overflow-hidden">
            <ImagePlaceholder className="w-full h-full" />
            {/* Example of using Next Image if URL available: */}
            {/* {restaurantData.images[0] && (
              <Image src={restaurantData.images[0]} alt={`${restaurantData.name} main image`} layout="fill" objectFit="cover" />
            )} */}
          </div>
          {/* Smaller Images (Stacked) */}
          <div className="md:col-span-1 grid grid-rows-2 gap-2 h-64 md:h-full">
            <div className="h-full relative rounded-lg overflow-hidden">
              <ImagePlaceholder className="w-full h-full" />
              {/* {restaurantData.images[1] && (
                <Image src={restaurantData.images[1]} alt={`${restaurantData.name} image 2`} layout="fill" objectFit="cover" />
              )} */}
            </div>
            <div className="h-full relative rounded-lg overflow-hidden">
              <ImagePlaceholder className="w-full h-full" />
              {/* {restaurantData.images[2] && (
                <Image src={restaurantData.images[2]} alt={`${restaurantData.name} image 3`} layout="fill" objectFit="cover" />
              )} */}
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-1">{restaurantData.name}</h1>
            <div className="flex items-center mb-2">
              <Star size={20} className="text-yellow-500 fill-current mr-1" />
              <span className="font-semibold mr-2">
                {restaurantData.rating.toFixed(1)}
              </span>
              <p className="text-gray-600">{restaurantData.location}</p>
            </div>
            <div className="flex space-x-2 mb-6">
              {restaurantData.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-gray-600 text-sm">{restaurantData.about}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Price Range</h2>
              <p className="text-gray-600 text-sm">
                {restaurantData.priceRange}
              </p>
            </div>

            {/* Placeholder for Menu/Dishes section can be added here */}
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition duration-200">
              Book Online
            </button>

            <div className="border-2 border-purple-400 rounded-lg p-4">
              <h3 className="font-bold text-center mb-3">OPENING TIMES</h3>
              <ul className="space-y-1 text-sm text-center">
                {/* Displaying only hours as per screenshot */}
                {restaurantData.openingTimes.map((time, index) => (
                  <li key={index}>{time.hours}</li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-600 text-white rounded-lg p-4 flex items-center space-x-4">
              {/* Placeholder for app demo image/icon */}
              <div className="w-16 h-16 bg-purple-400 rounded-md flex items-center justify-center text-xs text-center">
                kulaa-app-demo
              </div>
              <div>
                <h4 className="font-bold">Kulaa App Coming Soon</h4>
                <p className="text-xs">Be the first to try it!</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDetailPage;
