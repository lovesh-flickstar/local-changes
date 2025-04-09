import avatar1 from "../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp";
import avatar2 from "../assets/compressed/avatar2_compressed_compressed_compressed-transformed-transformed.webp";
import avatar3 from "../assets/compressed/avatar3_compressed_compressed_compressed-transformed-transformed-transformed-transformed.webp";

interface Suggestion {
    id: number;
    username: string;
    handle: string;
    flicks: string;
    avatar: string;
    playing: boolean;
  }
  
export const initialSuggestions: Suggestion[] = [
    { id: 1, username: "Dil Tu Jaan Tu", handle: "Arvind Goyal", flicks: "54 Flicks", avatar: avatar1 , playing: false},
    { id: 2, username: "Dil Tu Jaan Tu", handle: "Arvind Goyal", flicks: "54 Flicks", avatar: avatar2 , playing: false},
    { id: 3, username: "Dil Tu Jaan Tu", handle: "Arvind Goyal", flicks: "54 Flicks", avatar: avatar3 , playing: false},
    { id: 4, username: "Dil Tu Jaan Tu", handle: "Arvind Goyal", flicks: "54 Flicks", avatar: avatar1 , playing: false},
    { id: 5, username: "Dil Tu Jaan Tu", handle: "Arvind Goyal", flicks: "54 Flicks", avatar: avatar2 , playing: false},
    { id: 6, username: "Dil Tu Jaan Tu", handle: "Arvind Goyal", flicks: "54 Flicks", avatar: avatar1 , playing: false},
    { id: 7, username: "Dil Tu Jaan Tu", handle: "Arvind Goyal", flicks: "54 Flicks", avatar: avatar2 , playing: false},
    { id: 8, username: "Dil Tu Jaan Tu", handle: "Arvind Goyal", flicks: "54 Flicks", avatar: avatar3 , playing: false},
    { id: 9, username: "Dil Tu Jaan Tu", handle: "Arvind Goyal", flicks: "54 Flicks", avatar: avatar1 , playing: false},
    { id: 10, username: "Dil Tu Jaan Tu", handle: "Arvind Goyal", flicks: "54 Flicks", avatar: avatar2 , playing: false},
];