import React from 'react';
import { MapPin, ChevronDown, User } from 'lucide-react';
import Link from 'next/link'; // Import Link for navigation if needed

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {/* Replace with actual Logo component or Image if available */}
        <Link href="/" className="flex items-center space-x-2">
           <div className="w-8 h-8 bg-purple-200 rounded-md flex items-center justify-center text-purple-600 font-bold">
           </div>
           <span className="font-bold text-xl">kulaa</span>
        </Link>
        {/* Location - Consider making this dynamic */}
        <div className="hidden md:flex items-center text-sm text-gray-600 cursor-pointer hover:text-gray-900">
          <MapPin size={16} className="mr-1" />
          <span>London, Islington</span>
          <ChevronDown size={16} className="ml-1" />
        </div>
        {/* Optional: Add Change button functionality if needed */}
        {/* <button className="hidden md:block text-sm text-purple-600 font-semibold hover:underline">Change</button> */}
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/claim-restaurant">
           <p className="text-sm font-semibold hover:text-purple-600 hidden sm:block">Claim My Restaurant</p>
        </Link>
        <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
