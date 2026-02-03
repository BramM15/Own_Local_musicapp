import { Route, Routes } from 'react-router'
import Home from './Pages/Home.jsx'
import Settings from './Pages/Settings.jsx'
import Test from './Pages/Test.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/settings" element={<Settings />} />
        {/* <Route path="/test" element={<Test />} /> */}
      </Routes>
    </>
  )
}

export default App