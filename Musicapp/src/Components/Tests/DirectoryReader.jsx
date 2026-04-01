import { useState } from "react";

export default function DirectoryReader() {
    const [status, setStatus] = useState('Nog niet getest');
    const [directoryPath, setDirectoryPath] = useState('');

    const testDirectory = async () => {
        try {
            setStatus('Laden...');

            const data = await window.electronAPI.readMusicDirectory(directoryPath);

            if (data) {
                setStatus('Directory gevonden');
                console.log('Directory data:', data);
                await readMetadata();
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('Fout: Directory niet gevonden of pad is onjuist.');
        }
    }

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
            <h3>Test Read Music Directory
            </h3>
            <input
                type="text"
                value={directoryPath}
                onChange={(e) => setDirectoryPath(e.target.value)}
            />
            <button onClick={testDirectory}>Check Directory</button>
            <p>Status: <strong>{status}</strong></p>
        </div>);
}