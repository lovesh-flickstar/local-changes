import avatar2 from "../assets/compressed/avatar2_compressed_compressed_compressed-transformed-transformed.webp";
import avatar3 from "../assets/compressed/avatar3_compressed_compressed_compressed-transformed-transformed-transformed-transformed.webp";
import post1 from "../assets/compressed/post1-transformed-transformed_compressed_compressed-transformed.webp";
import post2 from "../assets/compressed/post2-transformed-transformed_compressed_compressed_compressed.webp";
import post3 from "../assets/compressed/post3-transformed-transformed_compressed_compressed_compressed-transformed-transformed.webp";
import post4 from "../assets/compressed/post4-OBRyovQ4V-transformed-transformed_compressed_compressed-transformed-transformed.webp";
import post5 from "../assets/compressed/post5-transformed-transformed_compressed_compressed.webp";
import avatar1 from "../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp";
 export const posts  = [
    {
      id: 1,
      username: "john_doe",
      caption: "User Descryption",
      song: "coldplay",
      img: post3,
      avatar: avatar1,
      comments: [
        {
          avatar: avatar1,
          username: "JohnDoe",
          time: "53 mins",
          text: "This is amazing!",
          liked: false,
          likes: 10,
          replies: [
            {
              avatar: avatar2,
              username: "JaneDoe",
              time: "50 mins",
              text: "Totally agree!",
              liked: true,
              likes: 5,
            },
            {
              avatar: avatar3,
              username: "TravelGuy",
              time: "45 mins",
              text: "Best post ever!",
              liked: false,
              likes: 2,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      username: "jane_doe",
      caption: "Healthy vibes 🌱",
      song: "Imagine Dragons",
      img: post2,
      avatar: avatar2,
      comments: [
        {
          avatar: avatar2,
          username: "JaneDoe",
          time: "30 mins",
          text: "Loving the green!",
          liked: true,
          likes: 8,
          replies: [],
        },
      ],
    },
    {
      id: 3,
      username: "travel_guy",
      caption: "The mountains are calling",
      song: "Arctic Monkeys",
      img: post5,
      avatar: avatar3,
      comments: [
        {
          avatar: avatar3,
          username: "TravelGuy",
          time: "1 hr",
          text: "This view is breathtaking!",
          liked: false,
          likes: 15,
          replies: [
            {
              avatar: avatar1,
              username: "JohnDoe",
              time: "58 mins",
              text: "Absolutely stunning!",
              liked: false,
              likes: 4,
            },
          ],
        },
      ],
    },
    {
      id: 4,
      username: "travel_guy",
      caption: "The mountains are calling",
      song: "Arctic Monkeys",
      img: post4,
      avatar: avatar3,
      comments: [
        {
          avatar: avatar3,
          username: "TravelGuy",
          time: "1 hr",
          text: "This view is breathtaking!",
          liked: false,
          likes: 15,
          replies: [
            {
              avatar: avatar1,
              username: "JohnDoe",
              time: "58 mins",
              text: "Absolutely stunning!",
              liked: false,
              likes: 4,
            },
          ],
        },
      ],
    },
    {
      id: 5,
      username: "travel_guy",
      caption: "The mountains are calling",
      song: "Arctic Monkeys",
      img: post1,
      avatar: avatar3,
      comments: [
        {
          avatar: avatar3,
          username: "TravelGuy",
          time: "1 hr",
          text: "This view is breathtaking!",
          liked: false,
          likes: 15,
          replies: [
            {
              avatar: avatar1,
              username: "JohnDoe",
              time: "58 mins",
              text: "Absolutely stunning!",
              liked: false,
              likes: 4,
            },
          ],
        },
      ],
    },
  ];

 export const icons = [
    {
        id: 1,
        class: 'bi bi-heart-fill',
        count: 1500000, // or get from post.likes
        action: 'like',
        isActive: false // update based on state
    },
    {
        id: 2,
        class: 'bi bi-chat',
        count: 2000000,
        action: 'comment'
    },
    {
        id: 3,
        class: 'bi bi-reply transform -scale-x-100',
        count: 1200,
        action: 'share'
    },
    {
        id: 4,
        class: 'bi bi-repeat',
        count: 2000000,
        action: 'repost'
    },
    {
        id: 5,
        class: 'bi bi-three-dots',
        action: 'options'
    }
];