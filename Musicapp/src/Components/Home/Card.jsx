import { Heart, Plus } from "lucide-react";

export default function Card({ title, artist, duration, showImage }) {
  return (
    <div className="bg-[#181818] p-3 md:p-4 rounded-lg hover:bg-[#282828] cursor-pointer transition flex flex-col gap-2">
      {showImage && (
        <div className="w-full h-28 md:h-32 bg-[#1db954] rounded mb-2"></div>
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