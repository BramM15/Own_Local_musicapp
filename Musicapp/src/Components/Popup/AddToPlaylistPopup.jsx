import React from 'react';
import { Check } from 'lucide-react';

export default function AddToPlaylistPopup({ show, onClose, onConfirm, playlists = [], trackInfo = {} }) {
  const [selectedPlaylists, setSelectedPlaylists] = React.useState([]);

  React.useEffect(() => {
    if (show && trackInfo.path) {
      const playlistsWithTrack = playlists
        .filter(playlist => playlist.tracks?.some(t => t.path === trackInfo.path))
        .map(p => p.id);
      setSelectedPlaylists(playlistsWithTrack);
    }
  }, [show, trackInfo.path]);

  const togglePlaylist = (playlistId) => {
    setSelectedPlaylists(prev =>
      prev.includes(playlistId)
        ? prev.filter(id => id !== playlistId)
        : [...prev, playlistId]
    );
  };

  const handleSave = () => {
    // Voeg toe aan geselecteerde playlists
    selectedPlaylists.forEach(playlistId => {
      const playlist = playlists.find(p => p.id === playlistId);
      const trackExists = playlist?.tracks?.some(t => t.path === trackInfo.path);
      if (!trackExists) {
        onConfirm(playlistId, trackInfo.path);
      }
    });

    // Verwijder uit niet-geselecteerde playlists
    playlists.forEach(playlist => {
      const isSelected = selectedPlaylists.includes(playlist.id);
      const trackExists = playlist.tracks?.some(t => t.path === trackInfo.path);
      if (trackExists && !isSelected) {
        onConfirm(playlist.id, trackInfo.path, true); // true voor delete
      }
    });

    handleClose();
  };

  const handleClose = () => {
    setSelectedPlaylists([]);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#181818] p-6 rounded-lg w-96 max-h-96 overflow-y-auto">
        <h3 className="text-white text-lg font-semibold mb-2">Add to Playlist</h3>
        <p className="text-gray-400 text-sm mb-4">
          {trackInfo.title && `Track: ${trackInfo.title}`}
        </p>

        {!playlists || playlists.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p>No playlists available. Create one first!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => togglePlaylist(playlist.id)}
                className={`w-full p-3 rounded-lg text-left transition flex items-center justify-between ${
                  selectedPlaylists.includes(playlist.id)
                    ? 'bg-[#1db954] text-white'
                    : 'bg-[#282828] text-gray-200 hover:bg-[#3a3a3a]'
                }`}
              >
                <span className="font-medium">{playlist.title}</span>
                {selectedPlaylists.includes(playlist.id) && <Check size={18} />}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-6">
          <button
            onClick={handleClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-[#1db954] hover:bg-[#16a34a] text-white py-2 rounded transition font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
