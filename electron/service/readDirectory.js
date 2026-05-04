const fs = require('node:fs');
const path = require('node:path');
const { parseFile } = require('music-metadata');

/**
 * Helper om seconden om te zetten naar een leesbare MM:SS string.
 */
const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const readMusicDirectory = async (directoryPath) => {
  const musicExtensions = ['.mp3', '.flac', '.wav', '.aac', '.m4a', '.ogg'];
  let results = [];

  const scan = async (currentPath) => {
    // Lees de inhoud van de huidige map
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Ga dieper de submap in
        await scan(fullPath);
      } else {
        const ext = path.extname(fullPath).toLowerCase();
        if (musicExtensions.includes(ext)) {
          try {
            // Haal de metadata op uit het bestand
            const metadata = await parseFile(fullPath);
            const durationInSeconds = metadata.format.duration || 0;
            
            results.push({
              path: fullPath,
              title: item, // Bestandsnaam zoals in de verkenner
              artist: metadata.common.artist || 'Onbekende artiest',
              // We slaan beide tijden op voor later gebruik:
              durationRaw: durationInSeconds, // Getal (bijv. 210.5) -> voor je tijdsbalk
              durationFormatted: formatDuration(durationInSeconds), // String (bijv. "3:30") -> voor de tekst
              genre: metadata.common.genre || 'Onbekend'
            });
          } catch (err) {
            console.error(`Fout bij lezen metadata van ${item}:`, err);
            // Fallback als de metadata niet gelezen kan worden
            results.push({ 
              path: fullPath, 
              title: item, 
              artist: 'Onbekend', 
              durationRaw: 0,
              durationFormatted: "0:00"
            });
          }
        }
      }
    }
  };

  await scan(directoryPath);
  return results;
};

module.exports = { readMusicDirectory };