import React from 'react';
import './App.css';
import Nav from './components/nav/nav';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import News from './components/news/news';
import Music from './components/music/music';
import Settings from './components/settings/settings';
import DialogsContainer from './components/dialogs/dialogsContainer';
import UserContainer from './components/users/userContainer';
import ProfileContainer from './components/profile/profileContainer';
import HeaderContainer from './components/header/headerContainer';
import Login from './components/login/login';
const App = () => {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <HeaderContainer />
        <Nav />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/profile/*' element={<ProfileContainer />} /> 
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/users' element={<UserContainer/>} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </div>
      </div>
      </BrowserRouter>
  );
}

export default App;
