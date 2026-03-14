import { Post } from "./types";
import { users } from "./users";

const basePosts: Post[] = [
  {
    id: "1",
    user: users.tech,
    content:
      "Generative AI is moving faster than anyone predicted. The next 12 months will be wild. 🚀 #AI #FutureTech",
    images: ["https://picsum.photos/seed/ai_future/800/500"],
    timestamp: "5m",
    stats: {
      comments: 124,
      reposts: 450,
      likes: 2300,
      views: "45K",
      bookmarks: 12,
      quotes: 5,
    },
  },
  {
    id: "2",
    user: users.artist,
    content:
      "Just finished this new piece! Inspired by the cyberpunk vibes of Night City. What do you think? 🎨✨ @CDPROJEKTRED",
    images: [
      "https://picsum.photos/seed/cyberpunk_art/800/600",
      "https://picsum.photos/seed/cyber_2/800/600",
    ],
    timestamp: "15m",
    stats: {
      comments: 45,
      reposts: 12,
      likes: 890,
      views: "12K",
      bookmarks: 45,
      quotes: 2,
    },
  },
  {
    id: "poll-1",
    user: users.news,
    content:
      "Which programming language are you most excited about in 2024? 💻 #Programming #Survey",
    timestamp: "30m",
    stats: {
      comments: 890,
      reposts: 120,
      likes: 3400,
      views: "150K",
      bookmarks: 230,
      quotes: 89,
    },
    poll: {
      options: [
        { id: "1", label: "TypeScript", votes: 450 },
        { id: "2", label: "Rust", votes: 320 },
        { id: "3", label: "Go", votes: 150 },
        { id: "4", label: "Python", votes: 280 },
      ],
      totalVotes: 1200,
      expiresAt: "2024-12-31T23:59:59Z",
      myVote: "1",
    },
  },
  {
    id: "quote-1",
    user: users.creator,
    content: "This is exactly what we need! The future is looking bright. ✨",
    timestamp: "1h",
    stats: {
      comments: 45,
      reposts: 12,
      likes: 230,
      views: "5K",
      bookmarks: 8,
      quotes: 1,
    },
    quotePost: {
      id: "3",
      user: users.news,
      content:
        "Breaking: New breakthrough in clean energy technology could power entire cities with zero emissions. 🌍⚡️ #GreenTech #BreakingNews",
      timestamp: "25m",
      stats: {
        comments: 560,
        reposts: 1200,
        likes: 5400,
        views: "2M",
        bookmarks: 890,
        quotes: 340,
      },
    },
  },
];

export const dummyPosts: Post[] = [
  ...basePosts,
  ...Array.from({ length: 60 }).map((_, i) => {
    const userKeys = Object.keys(users);
    const userKeyIndex = i % userKeys.length;
    const randomUser = users[userKeys[userKeyIndex]];

    const categories = [
      "Tech",
      "Life",
      "News",
      "Art",
      "Sports",
      "Food",
      "Nature",
      "Space",
      "Crypto",
      "Gaming",
    ];
    const category = categories[i % categories.length];
    const id = `dynamic-${i}`;

    // Randomly add 1-4 images to some posts
    const imageCount = i % 7 === 0 ? (i % 4) + 1 : 0;
    const images =
      imageCount > 0
        ? Array.from({ length: imageCount }).map(
            (_, idx) => `https://picsum.photos/seed/post_${id}_${idx}/800/500`,
          )
        : undefined;

    return {
      id,
      user: randomUser,
      content: `Post #${i + 6} about ${category}. Explore the latest trends in ${category} only on VOICE.🗣️ #${category} #VOICE #Trending @voice_app`,
      timestamp: `${(i % 23) + 2}h`,
      images,
      stats: {
        comments: (i * 13) % 500,
        reposts: (i * 27) % 1000,
        likes: (i * 41) % 5000,
        views: `${((i * 153) % 5000) + 100}`,
        bookmarks: (i * 7) % 100,
        quotes: (i * 3) % 50,
      },
    };
  }),
];
