import Section from './Section.jsx';
import CallToAction from './CallToAction.jsx';
import PlaylistView from './PlaylistView.jsx';

export default function Main({ library, onSelectSong, handleToggleView, onChangeDirectory, onNewPlaylist, onLike, onAdd }) {
  const uploadedSongs = library.paths || [];
  const likedSongs = library.likedSongs || [];
  const playlists = library.playlists || [];

  const handleChangeDirectory = () => {
    onChangeDirectory();
  };

  const handleLikedSongs = () => {
    handleToggleView('liked');
  };

  const handleNewPlaylist = () => {
    onNewPlaylist();
  };

  return (
    <div className="flex-1 bg-black p-4 md:p-6 pb-24 overflow-y-auto">
      <CallToAction
        onChangeDirectory={handleChangeDirectory}
        onLikedSongs={handleLikedSongs}
        onNewPlaylist={handleNewPlaylist}
      />

      {!uploadedSongs.length ? (
        <div className="text-center text-gray-400 mt-20">
          <h2 className="text-white text-lg md:text-xl font-bold mb-4">
            No Uploaded Songs
          </h2>
          <p className="text-lg">No songs found. Start by adding a music directory.</p>
        </div>
      ) : (<Section title="Your Uploaded Songs" items={uploadedSongs} showImage={false} onSelectSong={onSelectSong} onLike={onLike} onAdd={onAdd} likedSongs={likedSongs}/>)}

      {!likedSongs.length ? (
        <div className="text-center text-gray-400 mt-20">
          <h2 className="text-white text-lg md:text-xl font-bold mb-4">
            No Liked Songs
          </h2>
          <p className="text-lg">No songs found. Start by liking some songs.</p>
        </div>
      ) : (<Section title="Liked Songs" items={likedSongs} showImage={false} onSelectSong={onSelectSong} onLike={onLike} onAdd={onAdd} likedSongs={likedSongs} />)}

      {!playlists.length ? (
        <div className="text-center text-gray-400 mt-20">
          <h2 className="text-white text-lg md:text-xl font-bold mb-4">
            No Playlists
          </h2>
          <p className="text-lg">No playlists found. Create a new playlist to get started.</p>
        </div>
      ) : (<Section title="Your Playlists" items={playlists} showImage={true} onSelectSong={onSelectSong} onLike={onLike} onAdd={onAdd} likedSongs={likedSongs} />)}
    </div>
  );
};