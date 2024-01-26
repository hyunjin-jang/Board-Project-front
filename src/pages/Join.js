import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setJoinModal, setLoginModal, setUserToken } from '../store/store';
import axios from "axios";

export default function Join(){
  const API_URL = process.env.REACT_APP_API_URL

  const isEmail = (email) => {
    const emailRegex = 
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email)
  }

  const dispatch = useDispatch()
  const [userNickName, setJoinUserNickName] = useState()
  const [userEmail, setJoinUserEmail] = useState()
  const [userPassword, setJoinPassword] = useState()
  const [userBirth, setJoinBirth] = useState()

  const joinInfo = {
    userEmail,
    userPassword,
    userNickName,
    userBirth
  }

  function joinAction(){
    if(isEmail(joinInfo.userEmail)){
      axios.post(`${API_URL}/user`, joinInfo)
      .then((response)=>{
        localStorage.setItem("authorization", response.headers['authorization'])
        dispatch(setJoinModal(false))
      }).catch((error)=>{
        if(error.code == "ERR_BAD_REQUEST") {
          console.log("중복 아이디 있음")
        } else {
          console.log("error발생")
        }
      })
    } else {
      return alert("이메일 형식이 아님")
    }
  }
  
  return (
    <div className='black-bg' onClick={(e)=>{
      if(e.target == document.querySelector('.black-bg')){
        dispatch(setJoinModal(false))
      }
    }}>
      <div className="join-container">
        <div className="clear"></div>
        <h1 style={{float: "right", margin: "0px", cursor: "pointer"}} onClick={()=>{ dispatch(setJoinModal(false)) }}>x</h1>
        <div className="clear"></div>
        <div className="join-box">
          <h3 style={{marginTop: "0px"}}>Logo</h3>
          <h3>더 많은 내용을 보고려면 로그인하세요.</h3>
          <form>
            <label>이메일</label>
            <input onChange={(e)=>{ setJoinUserEmail(e.target.value) }}></input>
            <label>비밀번호</label>
            <input type="password" onChange={(e)=>{ setJoinPassword(e.target.value) }}></input>
            <label>닉네임</label>
            <input onChange={(e)=>{ setJoinUserNickName(e.target.value) }}></input>
            <label>생년월일</label>
            <input type="date" onChange={(e)=>{ setJoinBirth(e.target.value) }}></input>
            <h5 className="btn" style={{background: "#E32C2C", color: "white"}} onClick={ joinAction }>가입하기</h5>
          </form>
          <h5>또는</h5>
          <h5 className="btn" style={{background: "#2C80DE", color: "white"}}>페북 로그인</h5>
          <h5 className="btn" style={{background: "white", color: "#323232", border: "1px solid #323232"}}>구글 로그인</h5>
          <h5 className="btn" style={{background: "#21C148", color: "white"}}>라인 로그인</h5>
          <label>이미 회원이신가요? <b onClick={()=>{ dispatch(setJoinModal(false)); dispatch(setLoginModal(true)); }}>로그인</b></label>
        </div>
      </div>
    </div>
  )
}