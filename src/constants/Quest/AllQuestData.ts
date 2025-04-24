// import quest from "../../assets/compressed/quest.webp";
// import quest3 from "../../assets/compressed/quest3.webp";
// import quest2 from "../../assets/compressed/quest2.webp";
// import quest1 from "../../assets/compressed/quest1.webp";
// import avatar3 from "../../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp";
// import avatar5 from "../../assets/compressed/avatar5_compressed_compressed_compressed-transformed.webp";
// import avatar7 from "../../assets/compressed/avatar7_compressed_compressed_compressed.webp";

export interface Quest {
  startIndex?: number;
  onClose?: () => void;
  _id: string;
  coverImage: string; // Keep this as is
  thumbnailURLs?: string[]; // Optional additional images
  title: string;
  description: string;
  price: number;
  date: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  tag: "OnFlick" | "GoFlick" | "OffFlick";
  liked: boolean;
  amount?: number;
  location?: string;
}

// export const AllQuestData: Quest[] = [
//   {
//     id: "11",
//     coverImage: quest,
//     thumbnailURLs: [quest1, quest2, quest3, quest], // Optional images added
//     title: "Visit My Coffee Cafe near street",
//     description:
//       "I just opened my cozy little coffee shop down the street...",
//     price: 100,
//     date: "23 Mar 2025",
//     authorName: "Steave Joe",
//     authorUsername: "steave_joe",
//     authorAvatar: avatar3,
//     tag: "OnFlick",
//     liked: true,
//   },
//   {
//     id: "12",
//     coverImage: quest1,
//     thumbnailURLs: [quest3, quest],
//     title: "Healthy Green Vibes Salad Day",
//     description:
//       "We're blending wellness with taste — try our organic green salad...",
//     price: 90,
//     date: "23 Mar 2025",
//     authorName: "Steave Joe",
//     authorUsername: "steave_joe",
//     authorAvatar: avatar5,
//     tag: "OnFlick",
//     liked: false,
//   },
//   {
//     id: "13",
//     coverImage: quest2,
//     thumbnailURLs: [quest3],
//     title: "Weekend Vibes with Friends",
//     description:
//       "Call your best friend and head over for a free trial...",
//     price: 86,
//     date: "23 Mar 2025",
//     authorName: "Steave Joe",
//     authorUsername: "steave_joe",
//     authorAvatar: avatar7,
//     tag: "GoFlick",
//     liked: true,
//   },
//   {
//     id: "1",
//     coverImage: quest,
//     title: "Visit My Coffee Cafe near street",
//     description:
//       "I just opened my cozy little coffee shop down the street, and I'm offering $100 for anyone who stops by and tries our signature pancakes or handcrafted espresso! Come chill, snap a pic, and vibe with your friends — I might feature you on our socials too!",
//     price: 100,
//     date: "23 Mar 2025",
//     authorName: "Steave Joe",
//     authorUsername: "steave_joe",
//     authorAvatar: avatar3,
//     tag: "OnFlick",
//     liked: true,
//   },
//   {
//     id: "2",
//     coverImage: quest1,
//     title: "Healthy Green Vibes Salad Day",
//     description:
//       "We're blending wellness with taste — try our organic green salad and detox smoothie combo for just 90 bucks. Valid only this Friday! Tag us in your meal pics and get featured. Bonus rewards for creative captions!",
//     price: 90,
//     date: "23 Mar 2025",
//     authorName: "Steave Joe",
//     authorUsername: "steave_joe",
//     authorAvatar: avatar5,
//     tag: "OnFlick",
//     liked: false,
//   },
//   {
//     id: "3",
//     coverImage: quest2,
//     title: "Weekend Vibes with Friends",
//     description:
//       "Call your best friend and head over for a free trial of our seasonal brews. It’s all about laughter, long chats, and creamy lattes. Extra points if you bring a pet or wear matching outfits. Let’s make weekends fun again!",
//     price: 86,
//     date: "23 Mar 2025",
//     authorName: "Steave Joe",
//     authorUsername: "steave_joe",
//     authorAvatar: avatar7,
//     tag: "GoFlick",
//     liked: true,
//   },
//   {
//     id: "4",
//     coverImage: quest3,
//     title: "Home Coffee Setups",
//     description:
//       "Post a reel or photo of your unique home coffee setup — be it minimalist, rustic, or techy. If we love your vibe, you’ll get a $70 gift card and a shoutout. Let’s celebrate coffee corners that make mornings better!",
//     price: 70,
//     date: "23 Mar 2025",
//     authorName: "Steave Joe",
//     authorUsername: "steave_joe",
//     authorAvatar: avatar3,
//     tag: "OnFlick",
//     liked: false,
//   },
//   {
//     id: "5",
//     coverImage: quest,
//     title: "Cool Café Challenges",
//     description:
//       "Embrace the chill with our polar-themed winter coffee event. Sip on our frosted lattes, pose with the snowy setup, and walk away with a $45 reward for just participating. Best costume gets double the prize!",
//     price: 45,
//     date: "23 Mar 2025",
//     authorName: "Steave Joe",
//     authorUsername: "steave_joe",
//     authorAvatar: avatar3,
//     tag: "OnFlick",
//     liked: false,
//   },
//   {
//     id: "6",
//     coverImage: quest1,
//     title: "Art in a Cup Contest",
//     description:
//       "Think you’ve got the steadiest hand and wildest creativity? Show off your latte art and win a whopping $120. Whether it's a heart, leaf, or unicorn — we're here to crown the ultimate milk foam artist!",
//     price: 120,
//     date: "24 Mar 2025",
//     authorName: "Lia Latte",
//     authorUsername: "latte_queen",
//     authorAvatar: avatar5,
//     tag: "GoFlick",
//     liked: true,
//   },
//   {
//     id: "7",
//     coverImage: quest2,
//     title: "Dunk & Sip Duo",
//     description:
//       "This week only: grab a donut and we’ll hand you a coffee absolutely free. But here’s the twist — post a funny reel with your combo and you’ll score a $30 coupon too. Humor + caffeine = win-win!",
//     price: 30,
//     date: "25 Mar 2025",
//     authorName: "Dunkin Dave",
//     authorUsername: "donut_dave",
//     authorAvatar: avatar7,
//     tag: "GoFlick",
//     liked: false,
//   },
//   {
//     id: "8",
//     coverImage: quest3,
//     title: "Café Coworking Space Offer",
//     description:
//       "Need a change from your home desk? Work from our café for a day and get $80 off your booking. Fast Wi-Fi, great ambiance, bottomless brew — what more do you need? Book fast, seats are limited!",
//     price: 80,
//     date: "25 Mar 2025",
//     authorName: "Remo Work",
//     authorUsername: "remote_life",
//     authorAvatar: avatar5,
//     tag: "OffFlick",
//     liked: true,
//   },
//   {
//     id: "9",
//     coverImage: quest,
//     title: "Mystery Mug Monday",
//     description:
//       "Every Monday, order our mystery mug for just $50 and take a shot at guessing what’s inside. If you guess right, you get double the reward and your name on our 'Legendary Sippers' wall!",
//     price: 50,
//     date: "25 Mar 2025",
//     authorName: "Steave Joe",
//     authorUsername: "steave_joe",
//     authorAvatar: avatar3,
//     tag: "GoFlick",
//     liked: false,
//   },
//   {
//     id: "10",
//     coverImage: quest1,
//     title: "Sunset Coffee Snap Quest",
//     description:
//       "Capture the golden hour with your favorite coffee from our café, and you could win $60 for the most aesthetic shot. Think pink skies, cozy mugs, and dreamy filters — let’s see your vision!",
//     price: 60,
//     date: "26 Mar 2025",
//     authorName: "Lia Latte",
//     authorUsername: "latte_queen",
//     authorAvatar: avatar5,
//     tag: "OnFlick",
//     liked: true,
//   },
// ];
