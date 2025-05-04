"use client";

import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react'; // Keep needed icons
import OfferCard from '@/components/OfferCard';
import DishCard from '@/components/DishCard'; // Import the DishCard component
import RestaurantCard from '@/components/RestaurantCard'; // Import the RestaurantCard component
import Header from '@/components/Header'; // Import the Header component
import ContainerSection from '@/components/ContainerSection';
import { useGetProductsSpecialOffers, useGetProductsTopDishes, useGetTopRestaurant } from '@/hooks/use-product';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';

const SearchPage = () => {
  const { data: offers, isLoading, error } = useGetProductsSpecialOffers();
  const { data: topDishes, isLoading: topDishesLoading, error: topDishesError } = useGetProductsTopDishes();
  const { data: topRestaurants, isLoading: restaurantsLoading, error: restaurantsError } = useGetTopRestaurant();

  const cuisines = [
    'Afghan', 'American', 'Argentinian', 'Austrian', 'Bangladeshi', 'Bar & Grill',
    'Brazilian', 'Catalonian', 'Eastern European', 'Fast Food', 'Fish & Chip',
    'Haitian', 'Hoagie', 'Indian', 'Kerala', 'Lithuanian', 'Mandarin', 'Modern',
    'New Zealand', 'Pacific Rim', 'Pancake', 'Pho', 'Raw', 'Sicilian', 'Singaporean',
    'Soup', 'South Asian', 'Sri Lankan', 'Tex-Mex', 'Vegan'
  ];

  // State for location dropdown visibility
  const [isLocationOpen, setLocationOpen] = useState(false);
  // State for selected location
  const [selectedLocation, setSelectedLocation] = useState('Location');

  // Sample location data
  const locations = [
    'Central London (Region)',
    'East London (Region)',
    'East Midlands',
    'East of England',
    'London (Region)'
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-8">
          Discover the best food and <br /> restaurants near you
        </h1>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto bg-white p-2 rounded-lg shadow-md flex items-center space-x-2 border border-gray-200 mb-12">
          <div className="flex items-center flex-grow border-r border-gray-200 pr-2">
            <Search size={20} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search for Food, Restaurants and Offers"
              className="w-full focus:outline-none text-sm"
            />
          </div>
          {/* Location Button and Dropdown Container */}
          <div className="relative">
            <button
              onClick={() => setLocationOpen(!isLocationOpen)} // Toggle dropdown
              className="flex items-center px-2 cursor-pointer"
            >
              {/* Display selected location */}
              <span className="text-sm text-gray-600 mr-1">{selectedLocation}</span>
              <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`} />
            </button>
            {/* Location Dropdown with Animation */}
            <div
              className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-10 transition-all duration-150 ease-out ${isLocationOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
              <ul className="py-1 max-h-60 overflow-y-auto">
                {locations.map((location) => (
                  <li
                    key={location}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer text-left"
                    onClick={() => {
                      setSelectedLocation(location); // Update selected location
                      setLocationOpen(false); // Close dropdown on selection
                    }}
                  >
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-purple-700 transition duration-200">
            Search
          </button>
        </div>

        {/* Cuisine Tags */}
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-2">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 transition duration-200"
            >
              {cuisine}
            </button>
          ))}
        </div>
      </main>

      <ContainerSection title="Special Offers">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : error ? (
          <p className="text-red-500">Error loading offers: {error.message}</p>
        ) : (
          offers?.data.map((offer) => {
            const discountPercentage = offer.originalPrice > 0 
              ? Math.round(((offer.originalPrice - offer.discountedPrice) / offer.originalPrice) * 100)
              : 0;
            const discountString = `${discountPercentage}% OFF`;
  
            const imageUrl = offer.image ? `https://backend.kulaa.co.uk/images/${offer.image}` : undefined;
  
            const locationString = `${offer.location.region}, ${offer.location.area}`;
  
            return (
              <OfferCard 
                key={offer.id}
                id={offer.id}
                offerTitle={offer.offerName}
                discount={discountString}
                restaurantName={offer.restaurantName}
                location={locationString}
                rating={offer.rating ? offer.rating : 0}
                originalPrice={offer.originalPrice}
                discountedPrice={offer.discountedPrice}
                imageUrl={imageUrl}
              />
            );
          })
        )}
      </ContainerSection>

      {/* Top Dishes Section */}
      <ContainerSection title="Top Dishes in London">
        {topDishesLoading ? (
          // Skeleton Loading State
           Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} /> // Assuming DishCard has a similar skeleton
          ))
        ) : topDishesError ? (
           // Error State
          <p className="text-red-500">Error loading top dishes: {topDishesError.message}</p>
        ) : (
           // Loaded State - Map over topDishes.data
          topDishes?.data.map((dish) => {
            // Construct image URL from the first image in the array, if available
            const imageUrl = dish.images?.[0] ? `https://backend.kulaa.co.uk/images/${dish.images[0]}` : undefined;

            return (
              <DishCard 
                key={dish.id} 
                id={dish.id}
                dishName={dish.dishName} 
                price={dish.price} 
                restaurantName={dish.restaurantName} 
                address={dish.restaurantAddress} 
                imageUrl={imageUrl} 
              /> 
            );
          })
        )}
      </ContainerSection>

      {/* Top Restaurants Section */}
      <ContainerSection title="Top Restaurants Near You">
        {restaurantsLoading ? (
          // Skeleton Loading State
          Array.from({ length: 3 }).map((_, index) => (
            <ProductCardSkeleton key={index} /> // Using product skeleton for now
          ))
        ) : restaurantsError ? (
          // Error State
          <p className="text-red-500">Error loading top restaurants: {restaurantsError.message}</p>
        ) : (
          // Loaded State - Map over topRestaurants.data
          topRestaurants?.data.map((restaurant) => {
            // Construct image URL (assuming logo or first image)
            const imageUrl = restaurant.logo ? `https://backend.kulaa.co.uk/images/${restaurant.logo}` 
                          : restaurant.images?.[0] ? `https://backend.kulaa.co.uk/images/${restaurant.images[0]}` 
                          : undefined;
            // Format location string
            const locationString = `${restaurant.location.area}, ${restaurant.location.region}`;
            const rating = restaurant.rating; // Use the direct rating for now
            
            return (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id} 
                name={restaurant.name} 
                location={locationString} 
                tags={restaurant.tags} 
                rating={rating} 
                imageUrl={imageUrl} 
              />
            );
          })
        )}
      </ContainerSection>

    </div>
  );
};

export default SearchPage;