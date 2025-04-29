import React from 'react';
import { ChevronDown, Instagram, Twitter } from 'lucide-react'; // Example icons
import Link from 'next/link';

// Placeholder for TikTok icon if lucide-react doesn't have it
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.53.02C13.17 0 13.58.02 13.97.05c2.05.14 3.9.92 5.4 2.21 1.78 1.5 2.8 3.5 3.1 5.66.07.4.1.82.1 1.25v.07c0 7.4-6.02 13.41-13.44 13.41-2.46 0-4.74-.66-6.68-1.81-.1-.06-.2-.13-.3-.2-.1-.09-.15-.2-.15-.31 0-.1.04-.2.12-.28.08-.08.17-.12.27-.12.11 0 .22.04.3.13.8.6 1.74.98 2.74 1.15.67.1 1.34.15 2.02.15 5.53 0 10.01-4.48 10.01-10.01V12c0-.14-.01-.28-.02-.42-.28-3.15-2.13-5.8-4.89-7.03a7.446 7.446 0 00-4.42-1.02c-.1-.01-.2-.01-.3-.01h-.01c-1.49 0-2.9.35-4.16 1.01-.1.05-.21.07-.32.07-.1 0-.2-.03-.29-.08a.49.49 0 01-.19-.43c0-.13.05-.25.14-.35.09-.1.21-.15.33-.15.05 0 .1.01.16.02 1.54-.75 3.25-1.15 5-1.15zM8.9 8.52c.65-.01 1.28.14 1.85.42.57.28 1.05.69 1.44 1.21.39.52.62 1.12.69 1.75.07.63.01 1.25-.19 1.83-.13.39-.31.75-.54 1.08a2.99 2.99 0 01-1.82 1.34c-.63.24-1.28.31-1.92.21-1.27-.2-2.43-.88-3.23-1.88a5.9 5.9 0 01-1.34-3.75c0-.98.23-1.95.67-2.81.44-.86 1.08-1.59 1.88-2.12.8-.53 1.72-.84 2.68-.87zm-.01 1.88c-.48 0-.94.14-1.33.4-.4.26-.7.6-.89 1-.19.4-.28.84-.28 1.29s.09.89.28 1.29c.19.4.49.74.89 1 .39.26.85.4 1.33.4s.94-.14 1.33-.4c.4-.26.7-.6.89-1 .19-.4.28-.84.28-1.29s-.09-.89-.28-1.29c-.19-.4-.49-.74-.89-1-.39-.26-.85-.4-1.33-.4z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200 pt-10 pb-6">
      <div className="container mx-auto px-4">
        {/* Explore Options Section (Consider if this belongs on the page instead) */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Explore options near me</h3>
          <div className="relative max-w-sm">
            <select
              className="w-full appearance-none border border-gray-300 rounded-md py-2 px-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              defaultValue=""
            >
              <option value="" disabled>Locations</option>
              {/* Add location options here */}
              <option value="london">London</option>
              <option value="manchester">Manchester</option>
              <option value="birmingham">Birmingham</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Column 1: Logo & Tagline */}
          <div className="col-span-2 md:col-span-1">
            {/* Replace with your actual logo */} 
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-purple-200 rounded-md mr-2 flex items-center justify-center text-purple-600 font-bold">
                K
              </div>
              <span className="font-bold text-xl">Kulaa</span>
            </div>
            <p className="text-sm text-gray-500">
              For the foodies that want to discover & eat the best dishes in the world.
            </p>
          </div>

          {/* Column 2: Users */}
          <div>
            <h4 className="font-semibold mb-3">Users</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/signin"><p className="hover:text-purple-600">Sign-In</p></Link></li>
              <li><Link href="/get-app"><p className="hover:text-purple-600">Get the App</p></Link></li>
              <li><Link href="/influencer"><p className="hover:text-purple-600">Become an Influencer</p></Link></li>
            </ul>
          </div>

          {/* Column 3: Restaurant */}
          <div>
            <h4 className="font-semibold mb-3">Restaurant</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/restaurant-signin"><p className="hover:text-purple-600">Sign-In</p></Link></li>
              <li><Link href="/claim-restaurant"><p className="hover:text-purple-600">Claim my Restaurant</p></Link></li>
            </ul>
          </div>

          {/* Column 4: About */}
          <div>
            <h4 className="font-semibold mb-3">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about"><p className="hover:text-purple-600">About kulaa</p></Link></li>
              <li><Link href="/mission"><p className="hover:text-purple-600">Mission & Vision</p></Link></li>
              <li><Link href="/careers"><p className="hover:text-purple-600">Careers</p></Link></li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <a href="mailto:team@kulaa.co.uk" className="text-sm hover:text-purple-600 block mb-3">team@kulaa.co.uk</a>
            <div className="flex space-x-3">
              <a href="#" aria-label="Instagram" className="text-purple-600 hover:text-purple-800"><Instagram size={20} /></a>
              <a href="#" aria-label="TikTok" className="text-purple-600 hover:text-purple-800"><TikTokIcon /></a>
              <a href="#" aria-label="Twitter" className="text-purple-600 hover:text-purple-800"><Twitter size={20} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-4 text-center">
          <p className="text-xs text-gray-500">
            2025 Kula Global Limited. Terms & Conditions / Privacy Policy / Cookies Policy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
