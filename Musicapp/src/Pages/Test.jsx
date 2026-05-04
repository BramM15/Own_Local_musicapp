import DirectoryReader from '../Components/Tests/DirectoryReader.jsx';
import FileReader from '../Components/Tests/FileReader.jsx';

export default function Test() {
  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h3>Test omgeving:</h3>
      <FileReader />
      <DirectoryReader />
    </div>
  );
}