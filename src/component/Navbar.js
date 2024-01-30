import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setJoinModal, setLoginModal, setPostList } from '../store/store';
import { useEffect, useState } from 'react';
import axios from "axios";

function Navbar(){
  const API_URL = process.env.REACT_APP_API_URL

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [search, setSearch] = useState()
  const loginModal = useSelector((state)=> {return state.loginModal})
  const loginToken = useSelector((state)=> {return state.loginToken})
  const userToken = useSelector((state)=>{ return state.userToken })
  const [curPage, setCurPage] = useState(0)

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
    axios.get(`${API_URL}/post/${0}`)
    .then((response)=>{
      dispatch(setPostList(response.data.content))
    }).catch((error)=>{
      console.log(error)
    })
  }
  
  return (
    <div className="navbar-container">
      <h4 style={{float: "left"}} onClick={()=>{
        returnPost()
        navigate('/')
      }}>POST</h4>
      <div className="auth">
        { localStorage.getItem('authorization') == null ? 
        <>
          <h4 onClick={()=>{ dispatch(setJoinModal(true)) }}>会員登録</h4>
          <h4 onClick={()=>{ dispatch(setLoginModal(true)) }}>ログイン</h4>
        </> :
        <>
          <h4 onClick={ logoutAction }>ログアウト</h4>
          <h4 onClick={()=>{ navigate("/mypage") }}>MyPage</h4>
        </>
        }
        <h4 onClick={ searchAction }>🔍</h4>
        <input placeholder="Search" onChange={(e)=>{ setSearch(e.target.value) }}></input>
      </div>
      <div className="clear"></div>
    </div>
  )}

 export default Navbar