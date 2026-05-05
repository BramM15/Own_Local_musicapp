import React from "react";
import Settings from "./Settings";
import Sidebar from "../Components/Home/Sidebar";
import Topbar from "../Components/Home/Topbar";
import Main from "../Components/Home/Main";
import Player from "../Components/Home/Player";
import ChangeDirectoryPopup from "../Components/Popup/ChangeDirectoryPopup";
import NewPlaylistPopup from "../Components/Popup/NewPlaylistPopup";
import AddToPlaylistPopup from "../Components/Popup/AddToPlaylistPopup";

export default function Home({ library, fetchLibrary }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [currentView, setCurrentView] = React.useState('home');
  const [showChangeDirectoryPopup, setShowChangeDirectoryPopup] = React.useState(false);
  const [showNewPlaylistPopup, setShowNewPlaylistPopup] = React.useState(false);
  const [showAddToPlaylistPopup, setShowAddToPlaylistPopup] = React.useState(false);
  const [selectedTrackForAdd, setSelectedTrackForAdd] = React.useState(null);
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

  const handleLike = (trackPath) => {
    const isLiked = library.likedSongs?.some(song => song.path === trackPath);
    const updatedLikedSongs = isLiked
      ? library.likedSongs.filter(song => song.path !== trackPath)
      : [...(library.likedSongs || []), library.paths.find(song => song.path === trackPath)].filter(Boolean);
    const updatedLibrary = {
      ...library,
      likedSongs: updatedLikedSongs
    };
    window.electronAPI.saveLibrary(updatedLibrary);
    fetchLibrary();
  };

  const handleAdd = (trackPath) => {
    const track = library.paths?.find(t => t.path === trackPath);
    if (track) {
      setSelectedTrackForAdd(track);
      setShowAddToPlaylistPopup(true);
    }
  };

  const handleChangeDirectory = () => {
    setShowChangeDirectoryPopup(true);
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
    const newPlaylist = {
      id: Date.now().toString(),
      title: playlistName,
      tracks: []
    };
      const updatedLibrary = {
        ...library,
        playlists: [...(library.playlists || []), newPlaylist]
      };
      window.electronAPI.saveLibrary(updatedLibrary);
      fetchLibrary();
  };

  const confirmAddToPlaylist = (playlistId, trackPath, isDelete = false) => {
    const track = library.paths?.find(t => t.path === trackPath);
    if (!track) return;

    const updatedPlaylists = library.playlists?.map(playlist => {
      if (playlist.id === playlistId) {
        if (isDelete) {
          // Verwijder track uit playlist
          return {
            ...playlist,
            tracks: playlist.tracks?.filter(t => t.path !== trackPath) || []
          };
        } else {
          // Voeg track toe aan playlist
          const trackExists = playlist.tracks?.some(t => t.path === trackPath);
          if (!trackExists) {
            return {
              ...playlist,
              tracks: [...(playlist.tracks || []), track]
            };
          }
        }
      }
      return playlist;
    }) || [];

    const updatedLibrary = {
      ...library,
      playlists: updatedPlaylists
    };
    window.electronAPI.saveLibrary(updatedLibrary);
    fetchLibrary();
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
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} handleToggleView={handleToggleView} />
        {(() => {
          switch (currentView) {
            case 'settings':
              return <Settings />;
            default:
              return <Main
                library={library}
                onSelectSong={handleSelectSong}
                handleToggleView={handleToggleView}
                onChangeDirectory={handleChangeDirectory}
                onNewPlaylist={handleNewPlaylist}
                onLike={handleLike}
                onAdd={handleAdd}
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
          likedSongs={library.likedSongs}
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
      <AddToPlaylistPopup
        show={showAddToPlaylistPopup}
        onClose={() => setShowAddToPlaylistPopup(false)}
        onConfirm={confirmAddToPlaylist}
        playlists={library.playlists || []}
        trackInfo={selectedTrackForAdd || {}}
      />
    </div>
  );
}