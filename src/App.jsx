import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import SubTopicSelection from './pages/SubTopicSelection'
import QuestionPractice from './pages/QuestionPractice'
import Solution from './pages/Solution'
import Progress from './pages/Progress'
import MockTestSetup from './pages/MockTestSetup'
import MockTestQuestion from './pages/MockTestQuestion'
import MockTestOverview from './pages/MockTestOverview'
import MockTestResults from './pages/MockTestResults'
import MockTestReview from './pages/MockTestReview'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/practice" element={<SubTopicSelection />} />
        <Route path="/practice/question" element={<QuestionPractice />} />
        <Route path="/mock-test" element={<MockTestSetup />} />
        <Route path="/mock-test/question" element={<MockTestQuestion />} />
        <Route path="/mock-test/overview" element={<MockTestOverview />} />
        <Route path="/mock-test/results" element={<MockTestResults />} />
        <Route path="/mock-test/review" element={<MockTestReview />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
