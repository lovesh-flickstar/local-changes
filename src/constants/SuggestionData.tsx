import avatar1 from "../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp";
import avatar2 from "../assets/compressed/avatar2_compressed_compressed_compressed-transformed-transformed.webp";
import avatar3 from "../assets/compressed/avatar3_compressed_compressed_compressed-transformed-transformed-transformed-transformed.webp";
import hashtag from "../assets/compressed/hashtag.svg";
import song1 from "../assets/compressed/song1.webp";
import song2 from "../assets/compressed/song2.webp";
import quest from "../assets/compressed/quest.webp";
import quest1 from "../assets/compressed/quest3.webp";
import quest2 from "../assets/compressed/quest2.webp";
import taggedImage2 from "../assets/compressed/post2-transformed-transformed_compressed_compressed_compressed.webp";
import taggedImage3 from "../assets/compressed/post3-transformed-transformed_compressed_compressed_compressed-transformed-transformed.webp";
import taggedImage4 from "../assets/compressed/post4-OBRyovQ4V-transformed-transformed_compressed_compressed-transformed-transformed.webp";
import taggedImage5 from "../assets/compressed/post5-transformed-transformed_compressed_compressed.webp";

interface Person {
    id: number;
    username: string;
    handle: string;
    avatar: string;
    followed: boolean;
  }
  
  interface Flick {
    id: number;
    image: string;
    user: string;
    username: string;
  }
  
  interface Quest {
    id: number;
    image: string;
    title: string;
    description: string;
  }
  
  interface Tag {
    id: number;
    username: string;
    handle: string;
    avatar: string;
    followed: boolean;
  }
  
  interface Song {
    id: number;
    username: string;
    handle: string;
    avatar: string;
  }
  

export const flicks: Flick[] = [
  { id: 1, image: taggedImage3, user: "Albert Einstein", username: "YO_albert" },
  { id: 2, image: taggedImage2, user: "Albert Einstein", username: "YO_albert" },
  { id: 3, image: taggedImage3, user: "Albert Einstein", username: "YO_albert" },
  { id: 4, image: taggedImage4, user: "Albert Einstein", username: "YO_albert" },
  { id: 5, image: taggedImage5, user: "Albert Einstein", username: "YO_albert" },
  { id: 6, image: taggedImage2, user: "Albert Einstein", username: "YO_albert" },
];

export const quests: Quest[] = [
  { id: 1, image: quest, title: "Visit my plant nursery", description: "I'll pay $10 if you visit my plant nursery and take a photo." },
  { id: 2, image: quest1, title: "Visit my plant nursery", description: "I'll pay $10 if you visit my plant nursery and take a photo." },
  { id: 3, image: quest2, title: "Visit my plant nursery", description: "I'll pay $10 if you visit my plant nursery and take a photo." },
];

export const tags: Tag[] = [
  { id: 1, username: "#flickstarRocks", handle: "420M Flicks ", avatar: hashtag, followed: false },
  { id: 2, username: "#flickstarRocks", handle: "420M Flicks ", avatar: hashtag, followed: false },
  { id: 3, username: "#flickstarRocks", handle: "420M Flicks ", avatar: hashtag, followed: false },
  { id: 4, username: "#flickstarRocks", handle: "420M Flicks ", avatar: hashtag, followed: false },
  { id: 5, username: "#flickstarRocks", handle: "420M Flicks ", avatar: hashtag, followed: false },
  { id: 6, username: "#flickstarRocks", handle: "420M Flicks ", avatar: hashtag, followed: false },
  { id: 7, username: "#flickstarRocks", handle: "420M Flicks ", avatar: hashtag, followed: false },
  { id: 8, username: "#flickstarRocks", handle: "420M Flicks ", avatar: hashtag, followed: false },
  { id: 9, username: "#flickstarRocks", handle: "420M Flicks ", avatar: hashtag, followed: false },
  { id: 10, username: "#flickstarRocks", handle: "420M Flicks ", avatar: hashtag, followed: false },
];

export const songs: Song[] = [
  { id: 1, username: "Dil Tu Jaan Tu", handle: "Arvind Goyal", avatar: song1 },
  { id: 2, username: "Summer Vibes", handle: "Arvind Goyal", avatar: song2 },
  { id: 3, username: "Beautiful Morning", handle: "Arvind Goyal", avatar: song1 },
];

export const peoples: Person[] = [
    { id: 1, username: "Julia Smith", handle: "@juliasmith", avatar: avatar1, followed: false },
    { id: 2, username: "Christina Hopper", handle: "@chrishopper", avatar: avatar2, followed: false },
    { id: 3, username: "John Smith", handle: "@johnsmith", avatar: avatar3, followed: false },
    { id: 4, username: "Nathan James", handle: "@nathanjames", avatar: avatar1, followed: false },
    { id: 5, username: "Taylor Swift", handle: "@taylorswift", avatar: avatar2, followed: false },
    { id: 6, username: "Julia Smith", handle: "@juliasmith", avatar: avatar1, followed: false },
    { id: 7, username: "Christina Hopper", handle: "@chrishopper", avatar: avatar2, followed: false },
    { id: 8, username: "John Smith", handle: "@johnsmith", avatar: avatar3, followed: false },
    { id: 9, username: "Nathan James", handle: "@nathanjames", avatar: avatar1, followed: false },
    { id: 10, username: "Taylor Swift", handle: "@taylorswift", avatar: avatar2, followed: false },
];