import React, { useEffect, useState } from "react";
import Title from "../Components/Admin/Title";

const Releases = () => {
  // --- Upcoming Games (with posters + details) ---
  const upcomingGames = [
    {
      id: "cyber-arena",
      title: "Cyber Arena: Future War",
      releaseDate: "2025-11-15",
      poster: "https://images.unsplash.com/photo-1606813902917-1232d7f11144?q=80&w=1400&auto=format&fit=crop",
      description:
        "A futuristic FPS with immersive graphics, cross-platform play and ranked competitive modes.",
    },
    {
      id: "shadow-hunt",
      title: "Shadow Hunt: BGMI Legends",
      releaseDate: "2025-12-05",
      poster: "https://images.unsplash.com/photo-1590608897129-79da98d159d8?q=80&w=1400&auto=format&fit=crop",
      description:
        "Battle royale rejigged — new maps, tactical gadgets and team tournaments for BGMI fans.",
    },
    {
      id: "free-fire-max",
      title: "Free Fire Max 2.0",
      releaseDate: "2026-01-10",
      poster: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1400&auto=format&fit=crop",
      description:
        "Next-gen Free Fire with ultra graphics, new heroes and global competitive leagues.",
    },
    {
      id: "space-odyssey",
      title: "Space Odyssey: Beyond",
      releaseDate: "2026-02-20",
      poster: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?q=80&w=1400&auto=format&fit=crop",
      description:
        "Open-world sci-fi RPG with massive ship combat and procedurally generated galaxies.",
    },
    {
      id: "urban-warfare",
      title: "Urban Warfare: Midnight Ops",
      releaseDate: "2026-03-03",
      poster: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1400&auto=format&fit=crop",
      description:
        "Tactical shooter focusing on team play, destructible environments, and e-sports-ready balance.",
    },
  ];

  // --- Live Gaming Streams (dummy but real-looking) ---
  const streams = [
    {
      id: "bgmi-live",
      title: "BGMI India Championship Live",
      platform: "YouTube",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // dummy working YouTube link
      badge: "LIVE",
      thumbnail:
        "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "valorant-live",
      title: "Valorant Masters Tournament",
      platform: "YouTube",
      url: "https://www.youtube.com/watch?v=3fumBcKC6RE",
      badge: "Ongoing Tournament",
      thumbnail:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "freefire-live",
      title: "Free Fire Global Series Qualifiers",
      platform: "YouTube",
      url: "https://www.youtube.com/watch?v=lXMskKTw3Bc",
      badge: "Trending",
      thumbnail:
        "https://images.unsplash.com/photo-1593642632559-0c8eaf9b9d5c?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  // --- Trending Esports Games (unchanged) ---
  const trending = [
    {
      id: "bgmi",
      title: "BGMI",
      poster:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "valorant",
      title: "Valorant",
      poster:
        "https://images.unsplash.com/photo-1541233349642-6e425fe6190e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "freefire",
      title: "Free Fire",
      poster:
        "https://images.unsplash.com/photo-1549921296-3a5a5a9ae94e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "cod",
      title: "Call of Duty Mobile",
      poster:
        "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "csgo",
      title: "Counter-Strike: Global Offensive",
      poster:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  // --- Featured Streamers (dummy but functional links) ---
  const streamers = [
    {
      id: "gamerpro",
      name: "GamerPro",
      platform: "YouTube",
      url: "https://www.youtube.com/@MrBeastGaming", // real channel but generic gaming one
      followers: "2M+",
      avatar:
        "https://images.unsplash.com/photo-1620336655055-d43bf6a20a5e?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "nexus",
      name: "Nexus Gamer",
      platform: "Twitch",
      url: "https://www.twitch.tv/directory/game/Just%20Chatting",
      followers: "900K+",
      avatar:
        "https://images.unsplash.com/photo-1616077167877-8d3f0b6a9ab8?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "shadowwolf",
      name: "ShadowWolf",
      platform: "YouTube",
      url: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
      followers: "500K+",
      avatar:
        "https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=400&auto=format&fit=crop",
    },
  ];

  // --- News ---
  const news = [
    { id: 1, title: "Valorant Mobile Beta: regional invites starting soon" },
    { id: 2, title: "BGMI announces new tournament dates for 2025" },
    { id: 3, title: "Free Fire Max 2.0 details revealed — crossplay support" },
  ];

  // --- Notify state ---
  const [notifyMap, setNotifyMap] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("releases_notify") || "{}");
    setNotifyMap(saved);
  }, []);

  const toggleNotify = (gameId) => {
    const next = { ...notifyMap, [gameId]: !notifyMap[gameId] };
    if (!next[gameId]) delete next[gameId];
    localStorage.setItem("releases_notify", JSON.stringify(next));
    setNotifyMap(next);
  };

  const openNew = (url) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <div className="px-6 md:px-16 lg:px-40 py-10 min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-100">
      <Title text1="Upcoming" text2="Game Releases" />

      {/* Upcoming Games */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingGames.map((g) => (
          <div
            key={g.id}
            className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition duration-200"
          >
            <img
              src={g.poster}
              alt={g.title}
              className="w-full h-56 object-cover object-center"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://via.placeholder.com/800x450?text=No+Image")
              }
            />
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{g.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {g.description}
                  </p>
                  <p className="text-red-400 text-sm mt-3">
                    Release:{" "}
                    {new Date(g.releaseDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => toggleNotify(g.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                      notifyMap[g.id]
                        ? "bg-green-500 text-black"
                        : "bg-transparent border border-red-600 text-red-300"
                    }`}
                  >
                    {notifyMap[g.id] ? "Notified" : "Notify Me"}
                  </button>
                  <button
                    onClick={() =>
                      openNew(
                        `https://www.youtube.com/results?search_query=${encodeURIComponent(
                          g.title + " trailer"
                        )}`
                      )
                    }
                    className="px-3 py-1 rounded-full text-sm bg-red-600 hover:bg-red-700"
                  >
                    Trailer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-800 my-10" />

      {/* Live Streams */}
      <Title text1="Live" text2="Gaming Streams" />
      <p className="text-gray-400 text-sm mt-2 mb-6 max-w-2xl">
        Official and dummy tournament streams. Click any card to open the
        channel.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {streams.map((s) => (
          <div
            key={s.id}
            onClick={() => openNew(s.url)}
            className="cursor-pointer bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-200"
          >
            <div className="relative">
              <img
                src={s.thumbnail}
                alt={s.title}
                className="w-full h-44 object-cover"
              />
              <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-red-600 text-xs font-semibold">
                {s.badge}
              </div>
              <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/60 text-xs">
                {s.platform}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-400 mt-1">
                Click to open the stream or schedule.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-800 my-10" />

      {/* Trending Esports Games */}
      <Title text1="Trending" text2="Esports Games" />
      <p className="text-gray-400 text-sm mt-2 mb-6">
        Hover to reveal “Watch Gameplay” button.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {trending.map((t) => (
          <div
            key={t.id}
            className="relative group rounded-2xl overflow-hidden bg-gray-900/50 border border-gray-800 shadow-md"
          >
            <img
              src={t.poster}
              alt={t.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h4 className="font-semibold">{t.title}</h4>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() =>
                    openNew(
                      `https://www.youtube.com/results?search_query=${encodeURIComponent(
                        t.title + " gameplay"
                      )}`
                    )
                  }
                  className="px-3 py-1 text-sm bg-red-600 rounded-full hover:bg-red-700"
                >
                  Watch Gameplay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-800 my-10" />

      {/* News & Streamers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News */}
        <div className="col-span-1 bg-gray-900/50 border border-gray-800 rounded-2xl p-4">
          <h4 className="font-semibold text-lg">Gaming News</h4>
          <div className="mt-3 space-y-3">
            {news.map((n) => (
              <div key={n.id} className="p-3 bg-gray-800/40 rounded-md">
                <p className="text-sm">{n.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Streamers */}
        <div className="col-span-2 bg-gray-900/50 border border-gray-800 rounded-2xl p-4">
          <h4 className="font-semibold text-lg">Featured Streamers</h4>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {streamers.map((s) => (
              <div
                key={s.id}
                onClick={() => openNew(s.url)}
                className="cursor-pointer p-3 bg-gray-800/40 rounded-lg flex items-center gap-3 hover:bg-gray-800/60 transition"
              >
                <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-xs text-gray-400">
                    {s.platform} • {s.followers}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-24" />
    </div>
  );
};

export default Releases;
