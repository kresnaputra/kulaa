"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'; // Keep needed icons
import OfferCard from '@/components/OfferCard';
import DishCard from '@/components/DishCard'; // Import the DishCard component
import RestaurantCard from '@/components/RestaurantCard'; // Import the RestaurantCard component
import Header from '@/components/Header'; // Import the Header component

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
      imageUrl: undefined,
      dishName: 'Chicken Tenders',
      restaurantName: 'KFC Northallerton',
      address: '32 High Street, Northallerton, North Yorkshire...', // Truncated
      price: 20,
      isRecommended: true,
    },
    {
      imageUrl: undefined,
      dishName: 'Quarter Pounder with Ch...',
      restaurantName: 'McDonalds',
      address: '472 Elizabeth St, Melbourne VIC 3000',
      price: 20,
      isRecommended: true,
    },
    {
      imageUrl: undefined,
      dishName: 'Cole Slaw',
      restaurantName: 'KFC Northallerton',
      address: '32 High Street, Northallerton, North Yorkshire...',
      price: 5,
      isRecommended: true,
    },
    {
      imageUrl: undefined,
      dishName: 'Popcorn Chicken',
      restaurantName: 'KFC Northallerton',
      address: '32 High Street, Northallerton, North Yorkshire...',
      price: 20,
      isRecommended: true,
    },
    {
      imageUrl: undefined,
      dishName: 'Big Mac',
      restaurantName: 'KFC Northallerton',
      address: '32 High Street, Northallerton, North Yorkshire...',
      price: 20,
      isRecommended: true,
    },
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

  // Ref for the dishes scroll container
  const dishesScrollRef = useRef<HTMLDivElement>(null);
  // Ref for the offers scroll container
  const offersScrollRef = useRef<HTMLDivElement>(null);
  // Ref for the restaurants scroll container
  const restaurantsScrollRef = useRef<HTMLDivElement>(null);

  // State for scroll button disabling
  const [isOffersAtStart, setIsOffersAtStart] = useState(true);
  const [isOffersAtEnd, setIsOffersAtEnd] = useState(false);
  const [isDishesAtStart, setIsDishesAtStart] = useState(true);
  const [isDishesAtEnd, setIsDishesAtEnd] = useState(false);
  const [isRestaurantsAtStart, setIsRestaurantsAtStart] = useState(true);
  const [isRestaurantsAtEnd, setIsRestaurantsAtEnd] = useState(false);

  // Generalized scroll function - adjusted type to accept null
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
    const dishesContainer = dishesScrollRef.current;
    const restaurantsContainer = restaurantsScrollRef.current;

    const handleOffersScroll = () => checkScrollBounds(offersScrollRef, setIsOffersAtStart, setIsOffersAtEnd);
    const handleDishesScroll = () => checkScrollBounds(dishesScrollRef, setIsDishesAtStart, setIsDishesAtEnd);
    const handleRestaurantsScroll = () => checkScrollBounds(restaurantsScrollRef, setIsRestaurantsAtStart, setIsRestaurantsAtEnd);

    const handleResize = () => {
      handleOffersScroll();
      handleDishesScroll();
      handleRestaurantsScroll();
    };

    // Initial check
    handleResize();

    // Add listeners
    offersContainer?.addEventListener('scroll', handleOffersScroll);
    dishesContainer?.addEventListener('scroll', handleDishesScroll);
    restaurantsContainer?.addEventListener('scroll', handleRestaurantsScroll);
    window.addEventListener('resize', handleResize);

    // Cleanup listeners on unmount
    return () => {
      offersContainer?.removeEventListener('scroll', handleOffersScroll);
      dishesContainer?.removeEventListener('scroll', handleDishesScroll);
      restaurantsContainer?.removeEventListener('scroll', handleRestaurantsScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once on mount and cleans up on unmount

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
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Special Offers</h2>
          <div className="flex space-x-2">
            {/* Conditionally render Left button */}
            {!isOffersAtStart && (
              <button
                onClick={() => scrollContainer(offersScrollRef, 'left')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {/* Conditionally render Right button */}
            {!isOffersAtEnd && (
              <button
                onClick={() => scrollContainer(offersScrollRef, 'right')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
        {/* Add ref and hide scrollbar */}
        <div ref={offersScrollRef} className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {offers.map((offer, index) => (
            <OfferCard key={index} {...offer} />
          ))}
        </div>
      </section>

      {/* Top Dishes Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Top Dishes in London</h2>
          <div className="flex space-x-2">
            {/* Conditionally render Left button */}
            {!isDishesAtStart && (
              <button
                onClick={() => scrollContainer(dishesScrollRef, 'left')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {/* Conditionally render Right button */}
            {!isDishesAtEnd && (
              <button
                onClick={() => scrollContainer(dishesScrollRef, 'right')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
        {/* Add ref and hide scrollbar */}
        <div ref={dishesScrollRef} className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {topDishes.map((dish, index) => (
            <DishCard key={index} {...dish} />
          ))}
        </div>
      </section>

      {/* Top Restaurants Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Top 5 Restaurants in London</h2>
          <div className="flex space-x-2">
            {/* Conditionally render Left button */}
            {!isRestaurantsAtStart && (
              <button
                onClick={() => scrollContainer(restaurantsScrollRef, 'left')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {/* Conditionally render Right button */}
            {!isRestaurantsAtEnd && (
              <button
                onClick={() => scrollContainer(restaurantsScrollRef, 'right')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
        {/* Add ref and hide scrollbar */}
        <div ref={restaurantsScrollRef} className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
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
        </div>
      </section>

    </div>
  );
};

export default SearchPage;