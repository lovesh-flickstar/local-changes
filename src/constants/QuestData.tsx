import quest from "../assets/compressed/quest.webp";
import quest3 from "../assets/compressed/quest3.webp";
import quest2 from "../assets/compressed/quest2.webp";
import quest1 from "../assets/compressed/quest1.webp";
import avatar3 from "../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp";
import avatar5 from "../assets/compressed/avatar5_compressed_compressed_compressed-transformed.webp";
import avatar7 from "../assets/compressed/avatar7_compressed_compressed_compressed.webp";
import FlickStarLogo from "../assets/compressed/logo1.png";

interface QuestData {
    image: string;
    avatar: string;
    name: string;
    username: string;
    title: string;
    status: "OnFlick" | "GoFlick";
    description: string;
    amount: number;
  }

export const questData: QuestData[] = [
    {
        image: quest2,
        avatar: avatar5,
        name: "John Doe",
        username: "@johndoe",
        title: "Visit My Coffee Cafe",
        status: "OnFlick",
        description: "Get a free latte with a 10% discount. Offer valid only for today at our Coffee Cafe. Come and enjoy your time with us! Get a free latte with a 10% discount. Offer valid only for today at our Coffee Cafe. Come and enjoy your time with us!",
        amount: 100,
    },
    {
        image: quest3,
        avatar: FlickStarLogo,
        name: "FlickStar",
        username: "Sponsored",
        title: "Visit My Coffee Cafe",
        status: "GoFlick",
        description: "Get a free latte with a 10% discount. Offer valid only for today at our Coffee Cafe. Come and enjoy your time with us! Get a free latte with a 10% discount. Offer valid only for today at our Coffee Cafe. Come and enjoy your time with us!",
        amount: 100,
    },
    {
        image: quest1,
        avatar: avatar7,
        name: "John Doe",
        username: "@johndoe",
        title: "Visit My Coffee Cafe",
        status: "GoFlick",
        description: "Get a free latte with a 10% discount. Offer valid only for today at our Coffee Cafe. Come and enjoy your time with us! Get a free latte with a 10% discount. Offer valid only for today at our Coffee Cafe. Come and enjoy your time with us!",
        amount: 100,
    },
    {
        image: quest,
        avatar: avatar3,
        name: "John Doe",
        username: "@johndoe",
        title: "Visit My Coffee Cafe",
        status: "GoFlick",
        description: "Get a free latte with a 10% discount. Offer valid only for today at our Coffee Cafe. Come and enjoy your time with us! Get a free latte with a 10% discount. Offer valid only for today at our Coffee Cafe. Come and enjoy your time with us!",
        amount: 100,
    },
];