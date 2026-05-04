import { Heart, Plus, Pause, Play } from "lucide-react";

export default function Player({ track, isPlaying, onTogglePlay, onLike, onAdd }) {
  const title = track?.title || "Unknown track";
  const artist = track?.artist || "Unknown artist";
  const duration = track?.duration || "0:00";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-[#282828] p-4 md:px-6 z-50">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-white font-semibold text-base">{title}</div>
          <div className="text-gray-400 text-sm">{artist}</div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onTogglePlay}
            className="flex items-center gap-2 rounded-full bg-[#1db954] px-4 py-2 text-black text-sm font-semibold hover:bg-[#16a34a]"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />} 
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-2 rounded-full bg-[#282828] px-4 py-2 text-gray-200 text-sm hover:bg-[#3a3a3a]"
          >
            <Plus size={14} /> Add
          </button>
          <button
            type="button"
            onClick={onLike}
            className="flex items-center gap-2 rounded-full bg-[#282828] px-4 py-2 text-gray-200 text-sm hover:bg-[#3a3a3a]"
          >
            <Heart size={14} /> Like
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
        <span>{isPlaying ? "Now playing" : "Paused"}</span>
        <span>{duration}</span>
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#2f7a32]">
        <div className="h-full w-1/3 rounded-full bg-[#1db954]" />
      </div>
    </div>
  );
}
