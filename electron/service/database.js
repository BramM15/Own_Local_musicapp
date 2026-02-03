const Database = require('better-sqlite3');

const initDatabase = () => {
  try {
    const db = new Database(':memory:');
    console.log("SQLite is succesvol geladen");
    return db;
  } catch (err) {
    console.error("Fout bij het laden van SQLite:", err);
    return null;
  }
};

module.exports = {
  initDatabase
};
