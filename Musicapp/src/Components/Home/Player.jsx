import { Heart, Plus, Pause, Play } from "lucide-react";

const formatTime = (seconds) => {
  if (typeof seconds !== 'number' || Number.isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
};

export default function Player({ track, isPlaying, currentTime, onSeek, onTogglePlay, onLike, onAdd }) {
  const title = track?.title || "Unknown track";
  const artist = track?.artist || "Unknown artist";
  const durationRaw = Number(track?.durationRaw ?? track?.duration ?? 0);
  const durationFormatted = track?.durationFormatted || track?.duration || "0:00";
  const progress = durationRaw > 0 ? Math.min(100, (currentTime / durationRaw) * 100) : 0;
  const currentTimeFormatted = formatTime(currentTime);

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
            onClick={() => onLike(track?.path)}
            className="flex items-center gap-2 rounded-full bg-[#282828] px-4 py-2 text-gray-200 text-sm hover:bg-[#3a3a3a]"
          >
            <Heart size={14} /> Like
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
        <span>{currentTimeFormatted}</span>
        <span>{durationFormatted}</span>
      </div>

      <input
        type="range"
        min="0"
        max={durationRaw}
        step="0.01"
        value={Math.min(currentTime, durationRaw)}
        onChange={(event) => onSeek(event.target.value)}
        className="w-full accent-[#1db954]"
        disabled={durationRaw <= 0}
      />
    </div>
  );
}
