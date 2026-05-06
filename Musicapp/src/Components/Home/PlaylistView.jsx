import { Heart, Plus, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";

export default function PlaylistView({ playlist, onSelectSong, onLike, onAdd, onDeletePlaylist, onUpdatePlaylistTitle, likedSongs = [] }) {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState(playlist?.title || "");

    const handleSaveTitle = () => {
        if (!playlist) return;

        if (editedTitle.trim() && editedTitle !== playlist?.title) {
            onUpdatePlaylistTitle(playlist.id, editedTitle);
        }
        setIsEditingTitle(false);
    };

    return (
        <div className="bg-black p-4 md:p-6 pb-24 mb-24 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                {isEditingTitle ? (
                    <div className="flex gap-2 flex-1">
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="flex-1 bg-[#282828] text-white px-3 py-2 rounded border border-[#1db954]"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveTitle();
                                if (e.key === 'Escape') {
                                    setIsEditingTitle(false);
                                    setEditedTitle(playlist?.title);
                                }
                            }}
                        />
                        <button
                            onClick={handleSaveTitle}
                            className="px-4 py-2 bg-[#1db954] text-black rounded font-semibold hover:bg-[#1ed760] transition"
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-white text-lg md:text-xl font-bold">
                            {playlist?.title}
                        </h2>
                        {playlist.id != 'liked' && (

                            <div className="flex gap-2 ml-auto">
                                <button
                                    onClick={() => setIsEditingTitle(true)}
                                    className="p-2 hover:bg-[#282828] rounded transition text-gray-400 hover:text-[#1db954]"
                                    title="Edit playlist name"
                                >
                                    <Edit2 size={20} />
                                </button>
                                <button
                                    onClick={() => onDeletePlaylist(playlist.id)}
                                    className="p-2 hover:bg-[#282828] rounded transition text-gray-400 hover:text-red-500"
                                    title="Delete playlist"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="space-y-2">
                {playlist?.tracks.map((item, index) => {
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
                                            onLike(item.path);
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
                                            onAdd(item.path);
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
