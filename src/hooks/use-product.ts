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

const fetchProducts = async (): Promise<ApiResponse> => { 
  const response = await api.get<ApiResponse>('/offers/randomGet'); 
  return response.data;
};

export const useGetProductsSpecialOffers = () => {
  return useQuery<ApiResponse, Error>({ 
    queryKey: ['productsSpecialOffers'],
    queryFn: fetchProducts,
  });
};