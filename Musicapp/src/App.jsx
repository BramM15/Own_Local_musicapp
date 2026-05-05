import { Route, Routes } from 'react-router'
import { useEffect, useState } from 'react'
import Home from './Pages/Home.jsx'
import Settings from './Pages/Settings.jsx'
import Test from './Pages/Test.jsx'

function App() {
  const [library, setLibrary] = useState(null);

  const fetchLibrary = async () => {
    const result = await window.electronAPI.loadMusicLibrary();
    if (result.success) {
      console.log("Bibliotheek geladen:", result);
      setLibrary(result);
    } 
  };

  useEffect(() => {
    fetchLibrary();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home library={library || []} fetchLibrary={fetchLibrary} />} />
      </Routes>
    </>
  )
}

export default App