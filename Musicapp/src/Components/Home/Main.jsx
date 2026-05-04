import Section from './Section.jsx';

export default function Main({ library, onSelectSong }) {
  const uploadedSongs = library.paths || [];
  const likedSongs = library.likedSongs || [];
  const playlists = library.playlists || [];

  return (
    <div className="flex-1 bg-black p-4 md:p-6 pb-24 overflow-y-auto">
      <Section title="Your Uploaded Songs" items={uploadedSongs} showImage={false} onSelectSong={onSelectSong} />
      <Section title="Liked Songs" items={likedSongs} showImage={false} onSelectSong={onSelectSong} />
      <Section title="Your Playlists" items={playlists} showImage={true} onSelectSong={onSelectSong} />
    </div>
  );
};