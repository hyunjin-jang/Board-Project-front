import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setJoinModal, setLoginModal, setPostList } from '../store/store';
import { useState } from 'react';
import axios from "axios";

function Navbar(){
  const API_URL = process.env.REACT_APP_API_URL

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [search, setSearch] = useState()
  const loginModal = useSelector((state)=> {return state.loginModal})
  const loginToken = useSelector((state)=> {return state.loginToken})
  const userToken = useSelector((state)=>{ return state.userToken })
  

  function logoutAction(){
    localStorage.removeItem('authorization')
    navigate("/")
  }
  
  function searchAction(){
    axios.get(`${API_URL}/posts/search/`+search)
    .then((response)=>{
      console.log(response.data)
      dispatch(setPostList(response.data))
    }).catch((error)=>{
      console.log(error)
    })
  }

  function returnPost(){
    axios.get(`${API_URL}/posts`)
    .then((response)=>{
      dispatch(setPostList(response.data))
    }).catch((error)=>{
      console.log(error)
    })
  }
  
  return (
    <div className="navbar-container">
      <h4 style={{float: "left"}} onClick={()=>{
        returnPost()
        navigate('/')
      }}>게시판</h4>
      <div className="auth">
        { localStorage.getItem('authorization') == null ? 
        <>
          <h4 onClick={()=>{ dispatch(setJoinModal(true)) }}>회원가입</h4>
          <h4 onClick={()=>{ dispatch(setLoginModal(true)) }}>로그인</h4>
        </> :
        <>
          <h4 onClick={ logoutAction }>로그아웃</h4>
          <h4 onClick={()=>{ navigate("/mypage") }}>마이페이지</h4>
        </>
        }
        <h4 onClick={ searchAction }>검색</h4>
        <input placeholder="검색" onChange={(e)=>{ setSearch(e.target.value) }}></input>
      </div>
      <div className="clear"></div>
    </div>
  )}

 export default Navbar