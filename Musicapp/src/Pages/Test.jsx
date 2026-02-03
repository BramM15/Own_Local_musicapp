import React, { useState } from 'react';

function MuziekTester() {
  const [status, setStatus] = useState('Nog niet getest');
  const [pad, setPad] = useState(); // Pas dit pad aan!

  const testBestand = async () => {
    try {
      setStatus('Laden...');

      const data = await window.electronAPI.checkBestand(pad);

      if (data) {
        setStatus('Bestand gevonden');
        console.log('Bestand data:', data);
        await getMetadata();
      }
    } catch (error) {
      console.error('Fout:', error);
      setStatus('Fout: Bestand niet gevonden of pad is onjuist.');
    }
  };

    const getMetadata = async () => {
    try {
      setStatus('Metadata laden...');

      const data = await window.electronAPI.getMetadata(pad);

      if (data) {
        setStatus('Bestand metadata gevonden');
        console.log('Bestand metadata:', data);
      }
    } catch (error) {
      console.error('Fout:', error);
      setStatus('Fout: Bestand niet gevonden of pad is onjuist.');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
      <h3>Test omgeving
      </h3>
      <input 
        type="text" 
        value={pad} 
        onChange={(e) => setPad(e.target.value)} 
      />
      <button onClick={testBestand}>Check Bestand</button>
      <p>Status: <strong>{status}</strong></p>
    </div>
  );
}

export default MuziekTester;