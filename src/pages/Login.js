import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginModal } from '../store/store';

export default function Login(){
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
      axios.post("http://localhost:8080/login", loginInfo)
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
      <h1 style={{float: "right", margin: "0px"}} onClick={()=>{ dispatch(setLoginModal(false)) }}>x</h1>
      <div className="clear"></div>
      <div className="login-box">
        <h3 style={{marginTop: "0px"}}>Logo</h3>
        <h3>더 많은 내용을 보고려면 로그인하세요.</h3>
        <form>
          <label>이메일</label>
          <input onChange={(e)=>{ setUserEmail(e.target.value) }}></input>
          <label>비밀번호</label>
          <input type='password' onChange={(e)=>{ setPassword(e.target.value) }}></input>
          <label style={{fontWeight: "bold"}}>비밀번호를 잊으셨나요?</label>

          <div id='login-error'></div>

          <h5 className="btn" style={{background: "#E32C2C", color: "white"}}
            onClick={ loginAction }>로그인</h5>
        </form>
        <h5>또는</h5>
        <h5 className="btn" style={{background: "#2C80DE", color: "white"}}>페북 로그인</h5>
        <h5 className="btn" style={{background: "white", color: "#323232", border: "1px solid #323232"}}>구글 로그인</h5>
        <h5 className="btn" style={{background: "#21C148", color: "white"}}>라인 로그인</h5>
        <label>아직 Logo를 사용하고 있지 않으신가요?<span>가입하기</span></label>
      </div>
    </div>
   </div>
  )
}