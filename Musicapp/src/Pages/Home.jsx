import React from "react";
import Settings from "./Settings";
import Sidebar from "../Components/Home/Sidebar";
import Topbar from "../Components/Home/Topbar";
import Main from "../Components/Home/Main";
import Player from "../Components/Home/Player";
import ChangeDirectoryPopup from "../Components/Popup/ChangeDirectoryPopup";
import NewPlaylistPopup from "../Components/Popup/NewPlaylistPopup";

export default function Home({ library, fetchLibrary }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [currentView, setCurrentView] = React.useState('home');
  const [showChangeDirectoryPopup, setShowChangeDirectoryPopup] = React.useState(false);
  const [showNewPlaylistPopup, setShowNewPlaylistPopup] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const audioRef = React.useRef(null);
  const objectUrlRef = React.useRef(null);

  const getMimeType = (filePath) => {
    const ext = filePath?.split('.')?.pop()?.toLowerCase();
    switch (ext) {
      case 'mp3':
        return 'audio/mpeg';
      case 'wav':
        return 'audio/wav';
      case 'ogg':
        return 'audio/ogg';
      case 'm4a':
        return 'audio/mp4';
      case 'flac':
        return 'audio/flac';
      case 'aac':
        return 'audio/aac';
      default:
        return 'audio/mpeg';
    }
  };

  const convertToArrayBuffer = (data) => {
    if (!data) return null;
    if (data instanceof ArrayBuffer) return data;
    if (ArrayBuffer.isView(data)) return data.buffer;
    if (data.type === 'Buffer' && Array.isArray(data.data)) return new Uint8Array(data.data).buffer;
    if (data.data && Array.isArray(data.data)) return new Uint8Array(data.data).buffer;
    return data;
  };

  const playSong = async (songPath) => {
    if (!songPath) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    try {
      const fileData = await window.electronAPI.readMusicFile(songPath);
      const buffer = convertToArrayBuffer(fileData);
      const blob = new Blob([buffer], { type: getMimeType(songPath) });
      const objectUrl = URL.createObjectURL(blob);

      objectUrlRef.current = objectUrl;
      const audio = new Audio(objectUrl);
      audioRef.current = audio;
      audio.onended = () => setIsPlaying(false);
      audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
      audio.onloadedmetadata = () => setCurrentTime(audio.currentTime || 0);

      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error('Afspeel fout:', err);
      setIsPlaying(false);
    }
  };

  const handleSelectSong = (track) => {
    setCurrentTrack(track);
    setCurrentTime(0);
    playSong(track.path);
  };

  const handleTogglePlay = () => {
    if (!audioRef.current && currentTrack) {
      playSong(currentTrack.path);
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.error('Afspeel fout:', err));
      }
    }
  };

  const handleToggleView = (view) => {
    setCurrentView(view);
  };

  const handleSeek = (position) => {
    if (!audioRef.current) return;
    const seekTime = Number(position);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleLike = () => {
    console.log('Liked track:', currentTrack?.title);
  };

  const handleAdd = () => {
    console.log('Added track:', currentTrack?.title);
  };

  const handleChangeDirectory = () => {
    setShowChangeDirectoryPopup(true);
  };

  const handleLikedSongs = () => {
    setCurrentView('liked');
  };

  const handleNewPlaylist = () => {
    setShowNewPlaylistPopup(true);
  };

  const confirmChangeDirectory = async (directoryPath) => {
    try {
      const data = await window.electronAPI.readMusicDirectory(directoryPath);
      if (!data) {
        setStatus('Fout: Directory niet gevonden of pad is onjuist.');
        return;
      }
      const saveResult = await window.electronAPI.saveMusicPaths(data);
      if (saveResult.success) {
        setStatus('');
        setShowChangeDirectoryPopup(false);
        fetchLibrary();
      } else {
        setStatus('Fout bij opslaan.');
      }
    } catch (error) {
      setStatus('Fout: Directory niet gevonden of pad is onjuist.');
    }
  };

  const confirmNewPlaylist = (playlistName) => {
    setShowNewPlaylistPopup(false);
  };

  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Sidebar open={sidebarOpen} handleToggleView={handleToggleView} />
      <div className="flex flex-col flex-1 w-full">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} handleToggleView={handleToggleView}   />
        {(() => {
          switch (currentView) {
            case 'settings':
              return <Settings />;
            case 'liked':
              return <div className="flex-1 bg-black p-4 md:p-6 pb-24 overflow-y-auto text-white">Liked Songs View</div>;
            default:
              return <Main 
                library={library} 
                onSelectSong={handleSelectSong} 
                handleToggleView={handleToggleView}
                onChangeDirectory={handleChangeDirectory}
                onLikedSongs={handleLikedSongs}
                onNewPlaylist={handleNewPlaylist}
              />;
          }
        })()}
      </div>
      {currentTrack && (
        <Player
          track={currentTrack}
          isPlaying={isPlaying}
          currentTime={currentTime}
          onSeek={handleSeek}
          onTogglePlay={handleTogglePlay}
          onLike={handleLike}
          onAdd={handleAdd}
        />
      )}
      <ChangeDirectoryPopup
        status={status}
        show={showChangeDirectoryPopup}
        onClose={() => setShowChangeDirectoryPopup(false)}
        onConfirm={confirmChangeDirectory}
      />
      <NewPlaylistPopup
        show={showNewPlaylistPopup}
        onClose={() => setShowNewPlaylistPopup(false)}
        onConfirm={confirmNewPlaylist}
      />
    </div>
  );
}