import React from "react";
import Sidebar from "../Components/Home/Sidebar";
import Topbar from "../Components/Home/Topbar";
import Main from "../Components/Home/Main";
import Player from "../Components/Home/Player";

export default function Home({ library }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleSelectSong = (track) => {
    console.log("Selected track:", track.path);
    setCurrentTrack(track);
    setIsPlaying(true);
    playSong(currentTrack.path);
  };

  const handleTogglePlay = () => {
    setIsPlaying((state) => !state);
      if (isPlaying && currentTrack) {
        playSong(currentTrack.path);
      }
  };

  const handleLike = () => {
    console.log("Liked track:", currentTrack?.title);
  };

  const handleAdd = () => {
    console.log("Added track:", currentTrack?.title);
  };

  const playSong = (songPath) => {
    const audioUrl = `music://${songPath}`;

    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Sidebar open={sidebarOpen} />
      <div className="flex flex-col flex-1 w-full">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Main library={library} onSelectSong={handleSelectSong} />
      </div>
      {currentTrack && (
        <Player
          track={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onLike={handleLike}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}