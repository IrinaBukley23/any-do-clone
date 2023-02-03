import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import StartPage from './pages/startPage/startPage';
import MainPage from './pages/mainPage/mainPage';
import NotFoundPage from './pages/notFoundPage/notFoundPage';
import BoardPage from './pages/boardPage/boardPage';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      {/* <StartPage />       */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="board" element={<BoardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
