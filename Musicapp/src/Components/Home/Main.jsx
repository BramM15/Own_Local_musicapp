import Section from './Section.jsx';

export default function Main() {
  const uploadedSongs = [
    { title: "My Song 1", subtitle: "You" },
    { title: "My Song 2", subtitle: "You" },
    { title: "My Song 3", subtitle: "You" },
    { title: "My Song 4", subtitle: "You" },
    { title: "My Song 5", subtitle: "You" },
  ];

  const likedSongs = [
    { title: "Liked 1", subtitle: "Artist" },
    { title: "Liked 2", subtitle: "Artist" },
    { title: "Liked 3", subtitle: "Artist" },
    { title: "Liked 4", subtitle: "Artist" },
  ];

  const playlists = [
    { title: "Chill Hits", subtitle: "Playlist" },
    { title: "Workout", subtitle: "Playlist" },
    { title: "Focus", subtitle: "Playlist" },
  ];

  return (
    <div className="flex-1 bg-gradient-to-b from-[#1f1f1f] to-black p-6 overflow-y-auto">
      <Section title="Your Uploaded Songs" items={uploadedSongs} />
      <Section title="Liked Songs" items={likedSongs} />
      <Section title="Your Playlists" items={playlists} />
    </div>
  );
};