import { Heart, Plus } from "lucide-react";

export default function PlaylistView({ title, items, onSelectSong, onLike, onAdd, likedSongs = [] }) {
    return (
        <div className="mb-8">
            <h2 className="text-white text-lg md:text-xl font-bold mb-4">
                {title}
            </h2>

            <div className="space-y-2">
                {items.map((item, index) => {
                    const { title: itemTitle = "Unknown", artist = "Unknown", durationFormatted = "0:00", path } = item || {};
                    const isLiked = likedSongs?.some(song => song.path === path);

                    return (
                        <div
                            key={index}
                            onClick={() => onSelectSong(item)}
                            className="bg-[#181818] hover:bg-[#282828] p-3 md:p-4 rounded-lg cursor-pointer transition flex items-center gap-4 group"
                        >
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-sm md:text-base whitespace-normal break-words">
                                    {itemTitle}
                                </p>
                                <p className="text-xs md:text-sm text-gray-400 truncate">
                                    {artist}
                                </p>
                            </div>
                            <span className="text-xs md:text-sm text-gray-400">{durationFormatted}</span>
                            <div className="flex flex-col items-end gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition">
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onLike(item);
                                        }}
                                        className="p-2 hover:text-[#1db954] transition"
                                    >
                                        <Heart
                                            size={18}
                                            className={isLiked ? "fill-[#1db954] text-[#1db954]" : "text-gray-400"}
                                        />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAdd(item);
                                        }}
                                        className="p-2 hover:text-[#1db954] text-gray-400 transition"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
