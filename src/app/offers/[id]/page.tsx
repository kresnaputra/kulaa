'use client'

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Header from "@/components/Header";
import OfferCard from "@/components/OfferCard";

// Placeholder data - replace with actual data fetching logic
const offerData = {
  id: "123",
  imageUrl: "", // Add a placeholder image URL or leave empty for 'No Image Available'
  rating: 4.5,
  restaurantName: "Yorkshire and the Humber",
  location: "North Yorkshire",
  offerTitle: "Spend £12.99 & Receive £12.99 In Food & Drink",
  about:
    "Get a free medium fries and soft drink with every Zinger Box Meal purchase! Available for a limited time at participating KFC restaurants. Treat yourself to the spicy taste of our signature Zinger burger with a little extra on the side.",
  originalPrice: 12.99,
  discountedPrice: 12.99,
  discount: 100, // Percentage
  terms:
    "Offer valid while stocks last. Only valid on the Zinger Box Meal. Cannot be combined with other promotions or discounts. Available for dine-in, takeaway, and delivery at participating locations. KFC reserves the right to change or cancel the promotion without notice.",
  available: "Fri - Sun (11:00 am - 10:00 pm)",
  bookingLink: "https://www.kfc.co.uk/zinger-box-meal-offer",
};

// Placeholder for related offers - use the same data as the search page for consistency
const offers = [
    {
      id: '1',
      imageUrl: undefined, // No image
      discount: '75% OFF',
      restaurantName: 'KFC Northallerton',
      location: 'Yorkshire and the Humber, N...', // Truncated example
      rating: 4.5,
      offerTitle: 'Craving a Twister Wrap? Buy one Twist...',
      originalPrice: 15.98,
      discountedPrice: 11.99,
    },
    {
      id: '2',
      imageUrl: undefined, // No image
      discount: '100% OFF', // Note: Image shows 100% OFF, likely a typo, but replicating design
      restaurantName: 'KFC Northallerton',
      location: 'Yorkshire and the Humber, N...', // Truncated example
      rating: 4.5,
      offerTitle: 'Get a free medium fries and soft drink ...',
      originalPrice: 12.99,
      discountedPrice: 12.99, // Assuming 100% off means free with purchase, or price is misleading
    },
    {
      id: '3',
      imageUrl: undefined, // No image placeholder needed, component handles it
      discount: '50% OFF',
      restaurantName: 'Sonnys Chicken',
      location: 'Northern Ireland, Fermanagh ...', // Truncated example
      rating: 4.8,
      offerTitle: 'Friday Special chicken wings 10 pc',
      originalPrice: 20.00,
      discountedPrice: 10.00,
    },
    // Add more offers if needed
  ];

const OfferDetailPage = ({ }: { params: { id: string } }) => {
  
  const [isOffersAtStart, setIsOffersAtStart] = useState(true);
  const [isOffersAtEnd, setIsOffersAtEnd] = useState(false);

  const offersScrollRef = useRef<HTMLDivElement>(null);

  

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      const currentScroll = ref.current.scrollLeft;
      const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
      ref.current.scrollTo({
        left: newScroll,
        behavior: 'smooth',
      });
    }
  };

   // Function to check scroll bounds and update button states
   const checkScrollBounds = (
    ref: React.RefObject<HTMLDivElement | null>,
    setAtStart: React.Dispatch<React.SetStateAction<boolean>>,
    setAtEnd: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      const tolerance = 1; // Tolerance for floating point inaccuracies
      // Use requestAnimationFrame to ensure state updates after DOM reflow
      requestAnimationFrame(() => {
        setAtStart(scrollLeft <= tolerance);
        setAtEnd(scrollLeft + clientWidth >= scrollWidth - tolerance);
      });
    }
  };

  // Effect to handle scroll event listeners and initial state check
  useEffect(() => {
    const offersContainer = offersScrollRef.current;

    const handleOffersScroll = () => checkScrollBounds(offersScrollRef, setIsOffersAtStart, setIsOffersAtEnd);

    const handleResize = () => {
      handleOffersScroll();
    };

    // Initial check
    handleResize();

    // Add listeners
    offersContainer?.addEventListener('scroll', handleOffersScroll);
    window.addEventListener('resize', handleResize);

    // Cleanup listeners on unmount
    return () => {
      offersContainer?.removeEventListener('scroll', handleOffersScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once on mount and cleans up on unmount


  return (
    <div className="min-h-screen bg-white">
      {/* Header component is expected to be rendered by the main layout */}
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Link */}
        <Link
          href="/search"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft size={18} className="mr-1" />
          Back
        </Link>

        {/* Offer Details Section */}
        <div className="rounded-lg mb-8 ">
          {" "}
          {/* Centered content */}
          {/* Image Placeholder */}
          <div className="w-full h-[50vh] bg-gray-200 rounded-md flex items-center justify-center text-gray-500 mb-4 relative overflow-hidden">
            {offerData.imageUrl ? (
              <Image
                src={offerData.imageUrl}
                alt={offerData.offerTitle}
                layout="fill" // Use layout="fill" for responsive image covering the container
                objectFit="cover" // Ensure image covers the area
                className="rounded-md"
              />
            ) : (
              "No Image Available"
            )}
            {/* Discount Badge - Absolutely Positioned */}
            <span className="absolute top-0 right-0 bg-green-400 text-white text-xs font-semibold px-5 py-3 rounded-tr">
              {offerData.discount}% OFF
            </span>
          </div>
          {/* Rating and Restaurant Info */}
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <div className="flex items-center">
              <Star
                size={16}
                className="text-yellow-500 mr-1 flex-shrink-0"
                fill="currentColor"
              />
              <span className="font-semibold text-sm mr-2">
                {offerData.rating.toFixed(1)}
              </span>
              <p className="text-sm text-gray-600">
                {offerData.restaurantName}, {offerData.location}
              </p>
            </div>
            {/* Claim Button */}
            <button className="bg-purple-600 text-white text-xs font-semibold px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200 flex-shrink-0">
               Claim
            </button>
          </div>
          {/* Offer Title */}
          <h1 className="text-2xl font-bold mb-4">{offerData.offerTitle}</h1>
          {/* About Section */}
          <div className="mb-4">
            <h2 className="font-semibold mb-1">About</h2>
            <p className="text-sm text-gray-600">{offerData.about}</p>
          </div>
          {/* Price */}
          <div className="mb-4 flex items-baseline space-x-2">
            <span className="text-gray-500 line-through text-sm">
              £{offerData.originalPrice.toFixed(2)}
            </span>
            <span className="text-xl font-bold text-green-600">
              £{offerData.discountedPrice.toFixed(2)}
            </span>
          </div>
          {/* Terms & Conditions */}
          <div className="mb-4">
            <h2 className="font-semibold mb-1">Terms & Conditions</h2>
            <p className="text-xs text-gray-500">{offerData.terms}</p>
          </div>
          {/* Available */}
          <div className="mb-4">
            <h2 className="font-semibold mb-1">Available</h2>
            <p className="text-sm text-gray-600">{offerData.available}</p>
          </div>
          {/* Booking */}
          <div>
            <h2 className="font-semibold mb-1">Booking</h2>
            <a
              href={offerData.bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-600 hover:underline break-all"
            >
              {offerData.bookingLink}
            </a>
          </div>
        </div>

        {/* Special Offers Section */}
        <section className="container mx-auto py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Special Offers</h2>
            <div className="flex space-x-2">
              {/* Conditionally render Left button */}
              {!isOffersAtStart && (
                <button
                  onClick={() => scrollContainer(offersScrollRef, "left")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              {/* Conditionally render Right button */}
              {!isOffersAtEnd && (
                <button
                  onClick={() => scrollContainer(offersScrollRef, "right")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>
          {/* Add ref and hide scrollbar */}
          <div
            ref={offersScrollRef}
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
          >
            {offers.map((offer, index) => (
              <OfferCard key={index} {...offer} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default OfferDetailPage;
