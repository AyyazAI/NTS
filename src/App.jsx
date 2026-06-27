import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import SubTopicSelection from './pages/SubTopicSelection'
import QuestionPractice from './pages/QuestionPractice'
import QuestionMockTest from './pages/QuestionMockTest'
import Solution from './pages/Solution'
import Progress from './pages/Progress'
import MockTest from './pages/MockTest'
import MockTestResults from './pages/MockTestResults'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/practice" element={<SubTopicSelection />} />
        <Route path="/practice/question" element={<QuestionPractice />} />
        <Route path="/mock-test" element={<MockTest />} />
        <Route path="/mock-test/question" element={<QuestionMockTest />} />
        <Route path="/mock-test/results" element={<MockTestResults />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
