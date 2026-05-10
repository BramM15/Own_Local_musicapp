import { Menu, Search } from "lucide-react";

export default function Topbar({ toggleSidebar, handleToggleView }) {
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

      <div className="flex items-center gap-3">
        <button
          onClick={() => handleToggleView('search')}
          className="flex items-center gap-2 bg-[#282828] hover:bg-[#333333] px-3 md:px-4 py-2 rounded-full text-white text-sm font-semibold cursor-pointer transition"
        >
          <Search size={18} />
          <span className="hidden sm:inline">Search</span>
        </button>
        <div onClick={() => handleToggleView('settings')} className="bg-[#1db954] px-3 md:px-4 py-2 rounded-full text-black text-sm font-semibold cursor-pointer hover:bg-[#16a34a]">
          Profile
        </div>
      </div>
    </div>
  );
};