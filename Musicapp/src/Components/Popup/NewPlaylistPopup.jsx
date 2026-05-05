import React, { useState } from 'react';

export default function NewPlaylistPopup({ show, onClose, onConfirm }) {
  const [playlistName, setPlaylistName] = useState('');

  const handleConfirm = () => {
    onConfirm(playlistName);
    setPlaylistName('');
  };

  const handleClose = () => {
    setPlaylistName('');
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#181818] p-6 rounded-lg w-96">
        <h3 className="text-white text-lg font-semibold mb-4">New Playlist</h3>
        <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Enter playlist name"
          className="w-full p-2 bg-[#282828] text-white rounded mb-4"
        />
        <div className="flex gap-2">
          <button
            onClick={handleClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-[#1db954] hover:bg-[#1ed760] text-white py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}