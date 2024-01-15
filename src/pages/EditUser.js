import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function EditUser(){
  const navigate = useNavigate()
  const [userId, setUserId] = useState()
  const [editNickName, setNickName] = useState()
  const [editBirth, setBirth] = useState()
  const [editEmail, setEmail] = useState()
  const [editPhone, setPhone] = useState()
  const [editAddress, setAddress] = useState()
  const userToken = localStorage.getItem('authorization')

  const editInfo = {
    userId,
    editNickName,
    editEmail,
    editPhone,
    editAddress,
  }

  useEffect(()=>{
    axios.defaults.headers.common.Authorization = localStorage.getItem('authorization')
    axios.get('http://15.152.189.106:8080/user')
    .then((response)=>{
      console.log(response.data)
      setUserId(response.data.userId)
      setNickName(response.data.userNickName)
      setBirth(response.data.userBirth)
      setEmail(response.data.userEmail)
      setPhone(response.data.userPhone)
      setAddress(response.data.userAddress)
    })
  }, [])

  function editAct(){
    console.log(editInfo)
    axios.put('http://15.152.189.106:8080/user', editInfo)
    .then((response)=>{
      console.log(response.data)
      navigate('/mypage')
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div>
      <div className="profile-box">
        <div className="profile-top">
          <div className="clear"></div>
          <h2 style={{ float:"left" }}>내 정보</h2>
          <div className="clear"></div>
        </div>
        <div className="profile-middle">
          <div className="profile-img">
            <img src="https://kormedi.com/wp-content/uploads/2022/04/ck_tica1010005154_l-580x387.jpg"/>
          </div>
          <h3>닉네임 : <input value={ editNickName } onChange={(e)=>{setNickName(e.target.value)}}></input></h3>
          <h3>생년월일 : {editBirth}</h3>
          <h3>이메일 : {editEmail}</h3>
          <h3>전화번호 : <input value={ editPhone } onChange={(e)=>{setPhone(e.target.value)}}></input></h3>
          <h3>주소 : <input value={ editAddress } onChange={(e)=>{setAddress(e.target.value)}}></input> </h3>
          <button onClick={ editAct }>수정</button>
        </div>
      </div>
    </div>
  )
}