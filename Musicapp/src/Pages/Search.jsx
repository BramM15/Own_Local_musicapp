import React from 'react';
import Section from '../Components/Home/Section.jsx';

export default function Search({ library, searchQuery, setSearchQuery, searchResults, onSelectSong, onLike, onAdd, likedSongs }) {
  return (
    <div className="flex-1 bg-black p-4 md:p-6 pb-24 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-white text-lg md:text-xl font-bold mb-4">Search Songs</h2>
        <input
          type="text"
          placeholder="Search for songs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 bg-[#282828] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#1db954]"
        />
      </div>

      {searchQuery && searchResults.length > 0 ? (
        <Section
          title={`Search Results (${searchResults.length})`}
          items={searchResults}
          showImage={false}
          onSelectSong={onSelectSong}
          onLike={onLike}
          onAdd={onAdd}
          likedSongs={likedSongs}
        />
      ) : searchQuery ? (
        <div className="text-center text-gray-400 mt-20">
          <h2 className="text-white text-lg md:text-xl font-bold mb-4">No Results Found</h2>
          <p className="text-lg">Try searching for a different song.</p>
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-20">
          <h2 className="text-white text-lg md:text-xl font-bold mb-4">Start Searching</h2>
          <p className="text-lg">Enter a song name to search your library.</p>
        </div>
      )}
    </div>
  );
}
