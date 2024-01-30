import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJoinModal, setLoginModal } from '../store/store';

export default function Login(){
  const API_URL = process.env.REACT_APP_API_URL

  const isEmail = (email) => {
    const emailRegex = 
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email)
  }
  const dispatch = useDispatch()
  const loginModal = useSelector((state)=> {return state.loginModal})

  const [userEmail, setUserEmail] = useState(null)
  const [userPassword, setPassword] = useState(null)
  
  const loginInfo = {
    userEmail,
    userPassword
  }

  async function loginAction(){
    if(isEmail(loginInfo.userEmail)){
      axios.post(`${API_URL}/login`, loginInfo)
      .then((response)=>{
        localStorage.setItem("authorization", response.headers['authorization'])
        dispatch(setLoginModal(false))
      }).catch((error)=>{
        let errorCode = error.code;
        if(errorCode == 'ERR_BAD_REQUEST'){
          document.getElementById('login-error').innerHTML = "<b>이메일 또는 이메일이 잘못되었습니다.</b>"
        } else if(errorCode == 'ERR_NETWORK') {
          document.getElementById('login-error').innerHTML = "<b>서버 에러.</b>"
        } else {
          console.log("리액트 문법 돌아보삼")
        }
      })
    } else {
      return alert("이메일 형식이 아님")
    }
  }

  return (
    <div className='black-bg' onClick={(e)=>{
      if(e.target == document.querySelector('.black-bg')){
        dispatch(setLoginModal(false))
      }
    }}>
      <div className="login-container">
      <div className="clear"></div>
      <h1 style={{float: "right", margin: "0px", cursor: "pointer"}} onClick={()=>{ dispatch(setLoginModal(false)) }}>x</h1>
      <div className="clear"></div>
      <div className="login-box">
        <h3 style={{marginTop: "0px"}}>POST</h3>
        <h3>もっと、色んな機能を使うためにはログインしてください。</h3>
        <form>
          <label>メール</label>
          <input onChange={(e)=>{ setUserEmail(e.target.value) }}></input>
          <label>パスワード</label>
          <input type='password' onChange={(e)=>{ setPassword(e.target.value) }}></input>
          <label style={{fontWeight: "bold"}}>パスワードをお忘れですか？</label>

          <div id='login-error'></div>

          <h5 className="btn" style={{background: "#E32C2C", color: "white"}}
            onClick={ loginAction }>ログイン</h5>
        </form>
        {/* <h5>또는</h5>
        <h5 className="btn" style={{background: "#2C80DE", color: "white"}}>페북 로그인</h5>
        <h5 className="btn" style={{background: "white", color: "#323232", border: "1px solid #323232"}}>구글 로그인</h5>
        <h5 className="btn" style={{background: "#21C148", color: "white"}}>라인 로그인</h5> */}
        <label>まだ、会員ではないですか?<b onClick={()=>{ dispatch(setJoinModal(true)); dispatch(setLoginModal(false)); }}>登録</b>する</label>
      </div>
    </div>
   </div>
  )
}