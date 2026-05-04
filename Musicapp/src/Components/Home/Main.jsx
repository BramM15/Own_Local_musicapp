import Section from './Section.jsx';

export default function Main({ library }) {
  const uploadedSongs = library.paths || [];
  const likedSongs = library.likedSongs || [];
  const playlists = library.playlists || [];

  return (
    <div className="flex-1 bg-black p-4 md:p-6 overflow-y-auto">
      <Section title="Your Uploaded Songs" items={uploadedSongs} showImage={false} />
      <Section title="Liked Songs" items={likedSongs} showImage={false} />
      <Section title="Your Playlists" items={playlists} showImage={true} />
    </div>
  );
};