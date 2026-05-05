const fs = require('node:fs');
const path = require('node:path');
const { app } = require('electron');

const saveMusicPaths = async (paths) => {
  try {
    const existingData = await loadMusicLibrary();

    return await saveLibrary({
      ...existingData,
      paths: paths
    });
  } catch (error) {
    console.error("Fout bij opslaan paden:", error);
    throw error;
  }
};

const saveLibrary = async (libraryData) => {
  try {
    const userDataPath = app.getPath('userData');
    const filePath = path.join(userDataPath, 'library.json');

    const data = JSON.stringify({
      lastUpdated: new Date().toISOString(),
      paths: libraryData.paths || [],
      playlists: libraryData.playlists || [],
      likedSongs: libraryData.likedSongs || []
    }, null, 2);

    fs.writeFileSync(filePath, data, 'utf-8');
    return { success: true };
  } catch (error) {
    console.error("Fout bij opslaan:", error);
    throw error;
  }
};

const loadMusicLibrary = async () => {
  try {
    const userDataPath = app.getPath('userData');
    const filePath = path.join(userDataPath, 'library.json');

    if (!fs.existsSync(filePath)) {
      return { success: false, message: "Geen bibliotheek gevonden", paths: [] };
    }

    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    return {
      success: true,
      paths: data.paths,
      playlists: data.playlists || [],
      likedSongs: data.likedSongs || [],
      lastUpdated: data.lastUpdated
    };
  } catch (error) {
    console.error("Fout bij ophalen JSON:", error);
    throw error;
  }
};


module.exports = { saveMusicPaths, loadMusicLibrary, saveLibrary };