import React, { useState, useEffect, useRef } from 'react';

export default function ChangeDirectoryPopup({ show, onClose, onConfirm, status }) {
  const [directoryPath, setDirectoryPath] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (show) {
      inputRef.current?.focus();
    }
  }, [show]);

  const handleConfirm = async () => {
    try {
      await onConfirm(directoryPath);
      setDirectoryPath('');
    } catch (error) {
      console.error('ChangeDirectoryPopup error:', error);
      inputRef.current?.focus();
    }
  };

  const handleClose = () => {
    setDirectoryPath('');
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#181818] p-6 rounded-lg w-96">
        <h3 className="text-white text-lg font-semibold mb-4">Change Directory</h3>
        <input
          ref={inputRef}
          type="text"
          value={directoryPath}
          onChange={(e) => setDirectoryPath(e.target.value)}
          placeholder="Enter directory path"
          autoFocus
          className="w-full p-2 bg-[#282828] text-white caret-white rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#1db954]"
        />
        {status && <div className="text-sm text-red-500 mb-4">{status}</div>}
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
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}