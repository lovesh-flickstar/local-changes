export interface Quest {
  startIndex?: number;
  onClose?: () => void;
  _id: string;
  coverImage: string; // Keep this as is
  thumbnailURLs?: string[]; // Optional additional images
  title: string;
  description: string;
  price: number;
  createdAt: string;
  mode: string;
  user:{
    _id: string;
    name: string;
    username: string;
    photo: string;
  }
  authorAvatar: string;
  liked: boolean;
  totalAmount?: number;
  location: string;
  gps?: {
    coordinates: number[];
    type: string;
  };
  media?: {
    alt: string[];
    audio: string;
    duration: number;
    thumbnailURL: string;
    type: string;
    url: string;
  }[];
}
  
  export interface CreateQuest {
    title: string;
    description: string;
    media: string[]; // Array of media URLs
    thumbnailURL: string; // Thumbnail image URL
    mode: string; // Mode of the quest
    location: string; // Location of the quest
    coords: {
      lat: number; // Latitude
      long: number; // Longitude
    };
    maxApplicants: number; // Maximum number of applicants
    totalAmount: number; // Total reward amount
  }