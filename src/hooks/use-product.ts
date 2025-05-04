import { useQuery } from '@tanstack/react-query';
import api from '@/app/utils/base-api'; 

export interface Location {
  area: string;
  region: string;
}

export interface Product {
  id: string;
  restaurantId: string;
  restaurantName: string;
  location: Location;
  offerName: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  termsAndConditions: string;
  available: string;
  booking: string;
  rating: number;
  tags: string[];
  image: string | null;
  currency: string;
}

export interface ApiResponse {
  code: number;
  message: string;
  data: Product[];
}

export interface Dish {
  id: string;
  dishName: string;
  description: string;
  price: number;
  restaurantId: string;
  restaurantName: string;
  restaurantLogo: string | null;
  restaurantAddress: string;
  location: Location;
  createdAt: string;
  updatedAt: string;
  images: string[] | null;
  tags: string[];
  rating: number;
  currency: string;
  dish_review: string[] | null;
}

export interface ApiDishResponse {
  code: number;
  message: string;
  data: Dish[];
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  email: string | null;
  phone: number;
  description: string;
  openingHours: string[];
  location: Location; 
  logo: string | null;
  images: string[]; 
  tags: string[];
  rating: number;
  bookingLinks: unknown | null; 
  restaurant_review: string[] | null;
  zipCode: string;
  latitude: number | null;
  longitude: number | null;
  category: string;
}

export interface ApiRestaurantResponse {
  code: number;
  message: string;
  data: Restaurant[];
}

const fetchProductsSpecialOffers = async (): Promise<ApiResponse> => { 
  const response = await api.get<ApiResponse>('/offers/randomGet'); 
  return response.data;
};

const fetchProductsTopDishes = async (): Promise<ApiDishResponse> => { 
  const response = await api.get<ApiDishResponse>('/dishes/top', {params: {topNum: 5}}); 
  return response.data;
};

const fetchTopRestaurant = async (): Promise<ApiRestaurantResponse> => { 
  const response = await api.get<ApiRestaurantResponse>('/restaurants/top', {params: {topNum: 3}}); 
  return response.data;
};

export const useGetProductsSpecialOffers = () => {
  return useQuery<ApiResponse, Error>({ 
    queryKey: ['productsSpecialOffers'],
    queryFn: fetchProductsSpecialOffers,
  });
};

export const useGetProductsTopDishes = () => {
  return useQuery<ApiDishResponse, Error>({ 
    queryKey: ['productsTopDishes'],
    queryFn: fetchProductsTopDishes,
  });
};

export const useGetTopRestaurant = () => {
  return useQuery<ApiRestaurantResponse, Error>({ 
    queryKey: ['topRestaurant'],
    queryFn: fetchTopRestaurant,
  });
};
