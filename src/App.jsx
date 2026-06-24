import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import SubTopicSelection from './pages/SubTopicSelection'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/practice" element={<SubTopicSelection />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
