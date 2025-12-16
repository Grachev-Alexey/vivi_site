export interface City {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  detectionAliases?: string[]; // English names returned by GeoAPI
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Service {
  id: string;
  name: string;
  price: number;
  fullPrice?: number;
  description: string;
  category: 'body' | 'face' | 'sets';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}