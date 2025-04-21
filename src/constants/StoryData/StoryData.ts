import avatar1 from "../../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp";
import avatar2 from "../../assets/compressed/avatar2_compressed_compressed_compressed-transformed-transformed.webp";
import avatar3 from "../../assets/compressed/avatar3_compressed_compressed_compressed-transformed-transformed-transformed-transformed.webp";
import avatar4 from "../../assets/compressed/avatar4_compressed_compressed_compressed-transformed-transformed-transformed-transformed.webp";
import avatar5 from "../../assets/compressed/avatar5_compressed_compressed_compressed-transformed.webp";
import avatar6 from "../../assets/compressed/avatar6.webp";
import avatar7 from "../../assets/compressed/avatar7_compressed_compressed_compressed.webp";
import avatar8 from "../../assets/compressed/avatar8_compressed_compressed_compressed-transformed-transformed-transformed.webp";
import post1 from "../../assets/compressed/post1-transformed-transformed_compressed_compressed-transformed.webp";
import post2 from "../../assets/compressed/post2-transformed-transformed_compressed_compressed_compressed.webp";
import post3 from "../../assets/compressed/post3-transformed-transformed_compressed_compressed_compressed-transformed-transformed.webp";
import post4 from "../../assets/compressed/post4-OBRyovQ4V-transformed-transformed_compressed_compressed-transformed-transformed.webp";
import post5 from "../../assets/compressed/post5-transformed-transformed_compressed_compressed.webp";
export const yourStory = {
    id: 1,
    self: true,
    name: "Story",
    thumbnailImage: avatar8,
    images: post2,
    song: "coldplay",
    username: "username",
    views: 13,
    viewers: [
        { avatar: avatar1, username: "Issac Newton", icon: "heart" },
        { avatar: avatar2, username: "Jessica", icon: "heart" },
        { avatar: avatar3, username: "Colt Steel", icon: "love" },
        { avatar: avatar4, username: "John Doe", icon: "fire" },
        { avatar: avatar5, username: "Christina", icon: "love" },
        { avatar: avatar6, username: "Nathan", icon: "none" },
        { avatar: avatar7, username: "Username", icon: "none" },
        { avatar: avatar8, username: "Abel Doe", icon: "none" },
    ]
};

// Friend stories array
const friendStories = [
    { id: 2, name: "Jessica", thumbnailImage: avatar1, images: post1, song: "coldplay", username: "username" },
    { id: 3, name: "Saylor", thumbnailImage: avatar2, images: post2, song: "coldplay", username: "username" },
    { id: 4, name: "Johndoe", thumbnailImage: avatar3, images: post3, song: "coldplay", username: "username" },
    { id: 5, name: "Martina", thumbnailImage: avatar4, images: post4, song: "coldplay", username: "username" },
    { id: 6, name: "Obama", thumbnailImage: avatar5, images: post5, song: "coldplay", username: "username" },
    { id: 7, name: "Nathan", thumbnailImage: avatar6, images: post1, song: "coldplay", username: "username" },
    { id: 8, name: "Taylor", thumbnailImage: avatar7, images: post2, song: "coldplay", username: "username" },
    { id: 9, name: "John", thumbnailImage: avatar8, images: post3, song: "coldplay", username: "username" },
    { id: 10, name: "Christina", thumbnailImage: avatar1, images: post4, song: "coldplay", username: "username" },
    { id: 11, name: "Arleen", thumbnailImage: avatar2, images: post5, song: "coldplay", username: "username" },
    { id: 13, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 14, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 15, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 16, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 17, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 18, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 19, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 20, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 21, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 22, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 23, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 24, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 25, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 26, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 27, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 28, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
    { id: 29, name: "Robert", thumbnailImage: avatar3, images: post1, song: "coldplay", username: "username" },
];

export const stories = [yourStory, ...friendStories];