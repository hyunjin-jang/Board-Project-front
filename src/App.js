import Login from './pages/Login';
import Join from './pages/Join';
import Navbar from './component/Navbar'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import './App.css';
import PostList from './pages/PostList';
import WirtePost from './pages/WritePost';
import EditPost from './pages/EditPost';
import DetailPost from './pages/DetailPost';
import MyPage from './pages/MyPage';
import EditUser from './pages/EditUser';


function App() {
  const loginModal = useSelector((state)=>{ return state.loginModal })
  const joinModal = useSelector((state)=>{ return state.joinModal })

  return (
    <div className="App">
      {loginModal ? <Login/> : null}
      {joinModal ? <Join/> : null}
      <Navbar/>
      <Routes>
        <Route path='/' element={ <PostList/> }/>
        <Route path='/posts' element={ <PostList/> }/>
        <Route path='/posts/:id' element={ <DetailPost/> }/>
        <Route path='/posts/edit/:id' element={ <EditPost/> }/>
        <Route path='/posts/write' element={ <WirtePost/> }/>
        <Route path='/mypage' element={ <MyPage/> }/>
        <Route path='/mypage/edit' element={ <EditUser/> }/>
      </Routes>
      
      
      <div id='fail_page'></div>
    </div>
  );
}

export default App;
