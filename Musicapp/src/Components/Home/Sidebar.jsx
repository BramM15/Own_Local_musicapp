export default function Sidebar() {
  return (
    <div className="w-64 bg-black text-gray-300 h-screen p-4 flex flex-col gap-6">
      <div className="text-white text-2xl font-bold">Spotify</div>

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