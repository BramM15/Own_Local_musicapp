import DirectoryReader from '../Components/Tests/DirectoryReader.jsx';
import FileReader from '../Components/Tests/FileReader.jsx';

export default function Test() {
  return (
    <div>
      <h3>Test omgeving:</h3>
      <FileReader />
      <DirectoryReader />
    </div>
  );
}