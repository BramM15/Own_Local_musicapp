import React from "react";
import { Heart, Plus, Menu } from "lucide-react";

// Layout Components
const Sidebar = ({ open }) => {
  return (
    <div
      className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-[#121212] text-gray-300 p-4 flex flex-col gap-6 border-r border-[#282828] transform transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="text-[#1db954] text-2xl font-bold">Lotify</div>

      <nav className="flex flex-col gap-4">
        <div className="hover:text-white cursor-pointer">Home</div>
        <div className="hover:text-white cursor-pointer">Search</div>
        <div className="hover:text-white cursor-pointer">Your Library</div>
      </nav>

      <div className="mt-6">
        <div className="text-sm uppercase text-gray-500 mb-2">Playlists</div>
        <div className="flex flex-col gap-2">
          <div className="hover:text-white cursor-pointer">Liked Songs</div>
          <div className="hover:text-white cursor-pointer">My Playlist #1</div>
          <div className="hover:text-white cursor-pointer">My Playlist #2</div>
        </div>
      </div>
    </div>
  );
};

const Topbar = ({ toggleSidebar }) => {
  return (
    <div className="w-full flex justify-between items-center px-4 md:px-6 py-4 bg-[#181818] border-b border-[#282828]">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden text-white"
          onClick={toggleSidebar}
        >
          <Menu />
        </button>
        <div className="text-white font-semibold text-lg">Good evening</div>
      </div>

      <div className="bg-[#1db954] px-3 md:px-4 py-2 rounded-full text-black text-sm font-semibold">
        Profile
      </div>
    </div>
  );
};

// Reusable Card
const Card = ({ title, artist, duration, showImage }) => {
  return (
    <div className="bg-[#181818] p-3 md:p-4 rounded-lg hover:bg-[#282828] cursor-pointer transition flex flex-col gap-2">
      {showImage && (
        <div className="w-full h-28 md:h-32 bg-gradient-to-br from-[#1db954] to-[#158f3e] rounded mb-2"></div>
      )}

      <div className="text-white font-semibold text-sm md:text-base truncate">
        {title}
      </div>

      {!showImage && (
        <>
          <div className="flex justify-between text-xs md:text-sm text-gray-400">
            <span className="truncate">{artist}</span>
            <span>{duration}</span>
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            <button className="flex items-center gap-1 text-xs bg-[#282828] hover:bg-[#3a3a3a] px-2 py-1 rounded text-gray-300">
              <Plus size={14} /> Add
            </button>
            <button className="flex items-center gap-1 text-xs bg-[#282828] hover:bg-[#3a3a3a] px-2 py-1 rounded text-gray-300">
              <Heart size={14} /> Like
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Sections
const Section = ({ title, items, showImage }) => {
  return (
    <div className="mb-8">
      <h2 className="text-white text-lg md:text-xl font-bold mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
        {items.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            artist={item.artist}
            duration={item.duration}
            showImage={showImage}
          />
        ))}
      </div>
    </div>
  );
};

// Main Content
const Home = () => {
  const uploadedSongs = [
    { title: "My Song 1", artist: "You", duration: "3:12" },
    { title: "My Song 2", artist: "You", duration: "2:45" },
    { title: "My Song 3", artist: "You", duration: "4:01" },
    { title: "My Song 4", artist: "You", duration: "3:33" },
    { title: "My Song 5", artist: "You", duration: "2:58" },
  ];

  const likedSongs = [
    { title: "Liked 1", artist: "Artist A", duration: "3:20" },
    { title: "Liked 2", artist: "Artist B", duration: "2:50" },
    { title: "Liked 3", artist: "Artist C", duration: "4:10" },
    { title: "Liked 4", artist: "Artist D", duration: "3:05" },
  ];

  const playlists = [
    { title: "Chill Hits" },
    { title: "Workout" },
    { title: "Focus" },
  ];

  return (
    <div className="flex-1 bg-black p-4 md:p-6 overflow-y-auto">
      <Section title="Your Uploaded Songs" items={uploadedSongs} showImage={false} />
      <Section title="Liked Songs" items={likedSongs} showImage={false} />
      <Section title="Your Playlists" items={playlists} showImage={true} />
    </div>
  );
};

// Root Layout
export default function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Sidebar open={sidebarOpen} />

      <div className="flex flex-col flex-1 w-full">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Home />
      </div>
    </div>
  );
}
