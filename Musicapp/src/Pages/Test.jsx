import React, { useState } from 'react';

function MusicTester() {
  const [status, setStatus] = useState('Nog niet getest');
  const [filePath, setFilePath] = useState(); // Adjust this path!

  const testFile = async () => {
    try {
      setStatus('Laden...');

      const data = await window.electronAPI.readMusicFile(filePath);

      if (data) {
        setStatus('Bestand gevonden');
        console.log('File data:', data);
        await readMetadata();
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Fout: Bestand niet gevonden of pad is onjuist.');
    }
  };

    const readMetadata = async () => {
    try {
      setStatus('Metadata laden...');

      const data = await window.electronAPI.readMusicMetadata(filePath);

      if (data) {
        setStatus('Bestand metadata gevonden');
        console.log('File metadata:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Fout: Bestand niet gevonden of pad is onjuist.');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
      <h3>Test omgeving
      </h3>
      <input 
        type="text" 
        value={filePath} 
        onChange={(e) => setFilePath(e.target.value)} 
      />
      <button onClick={testFile}>Check Bestand</button>
      <p>Status: <strong>{status}</strong></p>
    </div>
  );
}

export default MusicTester;