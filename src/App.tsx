import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@/assets/css/App.css'
import Home from '@/pages/Home/Home'
import QuickAir from '@/pages/QuickAir/QuickAir'
import MyRoomStatus from '@/pages/MyRoomStatus/MyRoomStatus'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/quickair" element={<QuickAir />} />
        <Route path="/projects/myroomstatus" element={<MyRoomStatus />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
