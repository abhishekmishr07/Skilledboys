export interface Worker {
  _id: string;
  id?: string;
  name: string;
  number?: string;
  phone?: string;
  contact?: string;
  category: string;
  location: string;
  experience: number;
  gender: string;
  startTime?: string;
  endTime?: string;
  age: number;
  rating: number;
  photo?: string;
  status: "working" | "not working";
  hourlyRate?: number;
  bio?: string;
  createdAt?: string;
}

export interface WorkerAuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  worker?: {
    id: string;
    name: string;
    number: string;
    phone?: string;
    category: string;
    location: string;
    experience?: number;
    age: number;
    gender: string;
    status: string;
    rating?: number;
    photo?: string;
    startTime?: string;
    endTime?: string;
    hourlyRate?: number;
    bio?: string;
  };
}

export interface WorkerSearchParams {
  category?: string;
  location?: string;
  search?: string;
  gender?: string;
  minRating?: number;
  status?: string;
}

export interface AdminStats {
  totalWorkers: number;
  activeWorkers: number;
  inactiveWorkers: number;
  totalInquiries: number;
  categories: { name: string; count: number }[];
  locations: { name: string; count: number }[];
}

export interface ContactInquiry {
  _id?: string;
  id?: string | number;
  name: string;
  email: string;
  phone?: string;
  queryType: string;
  message: string;
  createdAt?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}
