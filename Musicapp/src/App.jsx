import { Route, Routes } from 'react-router'
import { useEffect, useState } from 'react'
import Home from './Pages/Home.jsx'
import Settings from './Pages/Settings.jsx'
import Test from './Pages/Test.jsx'

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      const result = await window.electronAPI.loadMusicLibrary();
      if (result.success) {
        console.log("Bibliotheek geladen, laatste update:", result.lastUpdated);
        setSongs(result.paths);
      } else {
        console.log("Nog geen bibliotheek gevonden. Scan eerst een map.");
      }
    };

    fetchLibrary();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Settings />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  )
}

export default App