import avatar1 from '../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp';
import avatar2 from '../assets/compressed/avatar2_compressed_compressed_compressed-transformed-transformed.webp';
import avatar3 from '../assets/compressed/avatar3_compressed_compressed_compressed-transformed-transformed-transformed-transformed.webp';
import { FaFacebook, FaInstagram, FaYoutube, FaSnapchat, FaWhatsapp, FaShareAlt, FaLink } from 'react-icons/fa';
import { LuCircleFadingPlus } from "react-icons/lu";
export const users = [
    { id: 1, name: 'Javis', avatar: avatar1 },
    { id: 2, name: 'Christina', avatar: avatar2 },
    { id: 3, name: 'Nathan', avatar: avatar3 },
    { id: 4, name: 'John Cena', avatar: avatar1 },
    { id: 5, name: 'Arleen', avatar: avatar2 },
    { id: 6, name: 'Jessica', avatar: avatar3 },
    { id: 7, name: 'Jose Boss', avatar: avatar1 },
    { id: 8, name: 'User 4', avatar: avatar2 },
    { id: 9, name: 'User 5', avatar: avatar1 },
    { id: 10, name: 'User 6', avatar: avatar3 },
    { id: 11, name: 'User 7', avatar: avatar2 },
    { id: 12, name: 'User 8', avatar: avatar3 },
    { id: 13, name: 'User 9', avatar: avatar1 },
    { id: 14, name: 'User 10', avatar: avatar2 },
    { id: 15, name: 'User 11', avatar: avatar3 },
    { id: 16, name: 'User 12', avatar: avatar1 },
];

export const socialIcons = [
    { id: 1, name: 'Whatsapp', icon: <FaWhatsapp />, url: 'https://www.whatsapp.com/' },
    { id: 2, name: 'Share', icon: <FaShareAlt />, url: '/' },
    { id: 3, name: 'Copy Link', icon: <FaLink />, url: '/' },
    { id: 4, name: 'Add Story', icon: <LuCircleFadingPlus />, url: '/' },
    { id: 5, name: 'Instagram', icon: <FaInstagram />, url: 'https://www.instagram.com/' },
    { id: 6, name: 'Youtube', icon: <FaYoutube />, url: 'https://www.youtube.com/' },
    { id: 7, name: 'Snapchat', icon: <FaSnapchat />, url: 'https://www.snapchat.com/' },
    { id: 8, name: 'Facebook', icon: <FaFacebook />, url: 'https://www.facebook.com/' },
];