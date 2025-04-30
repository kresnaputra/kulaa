"use client";

import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react'; // Keep needed icons
import OfferCard from '@/components/OfferCard';
import DishCard from '@/components/DishCard'; // Import the DishCard component
import RestaurantCard from '@/components/RestaurantCard'; // Import the RestaurantCard component
import Header from '@/components/Header'; // Import the Header component
import ContainerSection from '@/components/ContainerSection';

const SearchPage = () => {
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

  // Sample offer data
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

  // Sample dish data
  const topDishes = [
    {
      id: "kfc-tenders-1", // Add ID
      imageUrl: undefined,
      dishName: 'Chicken Tenders',
      restaurantName: 'KFC Northallerton',
      address: '32 High Street, Northallerton, North Yorkshire...', // Truncated
      price: 20,
      isRecommended: true,
    },
    {
      id: "mcd-qpc-2", // Add ID
      imageUrl: undefined,
      dishName: 'Quarter Pounder with Ch...',
      restaurantName: 'McDonalds',
      address: '472 Elizabeth St, Melbourne VIC 3000',
      price: 20,
      isRecommended: true,
    },
    {
      id: "kfc-slaw-3", // Add ID
      imageUrl: undefined,
      dishName: 'Cole Slaw',
      restaurantName: 'KFC Northallerton',
      address: '32 High Street, Northallerton, North Yorkshire...',
      price: 5,
      isRecommended: true,
    },
    {
      id: "kfc-popcorn-4", // Add ID
      imageUrl: undefined,
      dishName: 'Popcorn Chicken',
      restaurantName: 'KFC Northallerton',
      address: '32 High Street, Northallerton, North Yorkshire...',
      price: 20,
      isRecommended: true,
    },
    {
      id: "mcd-bigmac-5", // Add ID
      imageUrl: undefined,
      dishName: 'Big Mac',
      restaurantName: 'KFC Northallerton',
      address: '32 High Street, Northallerton, North Yorkshire...',
      price: 20,
      isRecommended: true,
    },
    // Add more sample dishes if needed
  ];

  // Sample data for Restaurants
  const restaurants = [
    {
      id: 'kfc-northallerton',
      name: 'KFC Northallerton',
      rating: 4.5,
      location: 'Yorkshire and the Humber, North Yorkshire',
      tags: ['Chicken', 'Fast Food'],
      imageUrl: '/images/restaurant-kfc.jpg'
    },
    {
      id: 'sonnys-chicken',
      name: 'Sonnys Chicken',
      rating: 4.8,
      location: 'Northern Ireland, Fermanagh and Omagh',
      tags: ['Chicken', 'American'],
      imageUrl: '/images/restaurant-sonnys.jpg'
    },
    {
      id: 'gbk-covent-garden',
      name: 'Gourmet Burger Kitchen',
      rating: 4.2,
      location: 'London, Covent Garden',
      tags: ['Burger', 'Gourmet'],
      imageUrl: '/images/restaurant-gbk.jpg'
    },
    {
      id: 'pizza-express-deansgate',
      name: 'Pizza Express',
      rating: 4.0,
      location: 'Manchester, Deansgate',
      tags: ['Pizza', 'Italian'],
      imageUrl: '/images/restaurant-pizzaexpress.jpg'
    },
    {
      id: 'wagamama-bullring',
      name: 'Wagamama',
      rating: 4.6,
      location: 'Birmingham, Bullring',
      tags: ['Japanese', 'Noodles'],
      imageUrl: '/images/restaurant-wagamama.jpg'
    },
    {
      id: 'nandos-cabot-circus',
      name: 'Nandos',
      rating: 4.3,
      location: 'Bristol, Cabot Circus',
      tags: ['Chicken', 'Portuguese'],
      imageUrl: '/images/restaurant-nandos.jpg'
    },
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

      {/* Special Offers Section */}
      <ContainerSection title="Special Offers">
        {offers.map((offer, index) => (
          <OfferCard key={index} {...offer} />
        ))}
      </ContainerSection>

      {/* Top Dishes Section */}
      <ContainerSection title="Top Dishes in London">
        {topDishes.map((dish) => (
          <DishCard key={dish.id} {...dish} /> // Use dish.id for key and pass id via spread
        ))}
      </ContainerSection>

      {/* Top Restaurants Section */}
      <ContainerSection title="Top 5 Restaurants in London">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            id={restaurant.id}
            name={restaurant.name}
            rating={restaurant.rating}
            location={restaurant.location}
            tags={restaurant.tags}
            imageUrl={restaurant.imageUrl}
          />
        ))}
      </ContainerSection>

    </div>
  );
};

export default SearchPage;