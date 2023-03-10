import './App.css'
import StartPage from './pages/startPage/startPage'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/mainPage/mainPage'
import NotFoundPage from './pages/notFoundPage/notFoundPage'
import BoardPage from './pages/boardPage/boardPage'
import Layout from './components/layout/layout'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route index element={<StartPage />} />
        <Route path='/' element={<Layout />}>
          <Route path='main' element={<MainPage />} />
          <Route path='board' element={<BoardPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
