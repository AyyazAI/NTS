import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-800">NTS Prep</h1>
          </div>
        } />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
