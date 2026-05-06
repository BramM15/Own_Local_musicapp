export default function Sidebar({ open, handleToggleView, playlists }) {
  return (
    <div
      className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-[#121212] text-gray-300 p-4 flex flex-col gap-6 border-r border-[#282828] transform transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="text-[#1db954] text-2xl font-bold cursor-pointer" onClick={() => handleToggleView('home')}>
        Lotify
      </div>

      <nav className="flex flex-col gap-4">
        <div className="hover:text-white cursor-pointer" onClick={() => handleToggleView('home')}>
          Home
        </div>
        <div className="hover:text-white cursor-pointer" onClick={() => handleToggleView('search')}>
          Search
        </div>
      </nav>

      <div className="mt-6">
        <div className="text-sm uppercase text-gray-500 mb-2">Playlists</div>
        <div className="flex flex-col gap-2">
          <div className="hover:text-white cursor-pointer" onClick={() => handleToggleView('liked')}>
            Liked Songs
          </div>
          {playlists?.map((playlist) => (
            <div
              key={playlist.id}
              className="hover:text-white cursor-pointer"
              onClick={() => handleToggleView('playlist', playlist.id)}
            >
              {playlist.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};