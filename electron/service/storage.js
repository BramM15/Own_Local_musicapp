const fs = require('node:fs');
const path = require('node:path');
const { app } = require('electron');

const saveMusicPaths = async (paths) => {
  try {
    const userDataPath = app.getPath('userData');
    const filePath = path.join(userDataPath, 'library.json');

    const data = JSON.stringify({ 
      lastUpdated: new Date().toISOString(),
      count: paths.length,
      paths: paths 
    }, null, 2);

    fs.writeFileSync(filePath, data, 'utf-8');
    return { success: true, path: filePath };
  } catch (error) {
    console.error("Fout bij opslaan JSON:", error);
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
      lastUpdated: data.lastUpdated 
    };
  } catch (error) {
    console.error("Fout bij ophalen JSON:", error);
    throw error;
  }
};

module.exports = { saveMusicPaths, loadMusicLibrary };