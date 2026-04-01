import { Route, Routes } from 'react-router'
import Home from './Pages/Home.jsx'
import Settings from './Pages/Settings.jsx'
import TestPage from './Pages/Test.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/settings" element={<Settings />} />
        {/* <Route path="/test" element={<Test />} /> */}
      </Routes>
    </>
  )
}

export default App