import React from 'react';
import { FolderOpen, Heart, Plus } from 'lucide-react';

export default function CallToAction({ onChangeDirectory, onLikedSongs, onNewPlaylist }) {
  const actions = [
    {
      title: 'Change Directory',
      icon: FolderOpen,
      onClick: onChangeDirectory,
    },
    {
      title: 'Liked Songs',
      icon: Heart,
      onClick: onLikedSongs,
    },
    {
      title: 'New Playlist',
      icon: Plus,
      onClick: onNewPlaylist,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {actions.map((action, index) => (
        <div
          key={index}
          role="button"
          tabIndex={0}
          onClick={action.onClick}
          className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] cursor-pointer transition flex items-center gap-3"
        >
          <action.icon size={24} className="text-[#1db954]" />
          <span className="text-white font-semibold text-lg">{action.title}</span>
        </div>
      ))}
    </div>
  );
}