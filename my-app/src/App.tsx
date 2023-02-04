import React from 'react';
import './App.css';
import StartPage from './pages/startPage/startPage';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage/mainPage';
import NotFoundPage from './pages/notFoundPage/notFoundPage';
import BoardPage from './pages/boardPage/boardPage';
import Layout from './components/Layout/Layout';
import {store} from './store/store';
// import { LoginForm } from './components/LoginForm/LoginForm';

function App() {
  // const { user } = useSelector((state: RootState) => state.loginReducer)
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route index element={<StartPage />} />
          <Route path="/" element={<Layout />}>
            <Route path='main' element={<MainPage /> } /> 
            <Route path="board" element={<BoardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </Provider>
  )
}

export default App
