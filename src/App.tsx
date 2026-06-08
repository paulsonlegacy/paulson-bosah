import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@/assets/css/App.css'
import Home from '@/pages/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
