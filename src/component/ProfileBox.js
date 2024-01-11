import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ProfileBox(){
  const navigate = useNavigate()

  const [userNickName, setUserNickName] = useState()
  const [userBirth, setUserBirth] = useState()
  const [userEmail, setUserEmail] = useState("-")
  const [userPhone, setUserPhone] = useState("-")
  const [userAddress, setUserAddress] = useState("-")

  useEffect(()=>{
    axios.defaults.headers.common.Authorization = localStorage.getItem('authorization')
    axios.get('http://localhost:8080/user') 
    .then((response)=>{
      setUserNickName(response.data.userNickName)
      setUserBirth(response.data.userBirth)
      if(userEmail!=null){ setUserEmail(response.data.userEmail) }
      if(userPhone!=null){ setUserPhone(response.data.userPhone) }
      if(userAddress!=null){ setUserAddress(response.data.userAddress) }
    }).catch((error)=>{
      console.log("axios error start!")
      console.log(error)
    })
  })
  

  return (
    <div className="profile-box">
      <div className="profile-top">
        <div className="clear"></div>
        <h2 style={{ float:"left" }}>내 정보</h2>
        <h4 className="edit-btn" onClick={()=>{ navigate('/mypage/edit') }}>수정</h4>
        <div className="clear"></div>
      </div>
      <div className="profile-middle">
        <div className="profile-img">
          <img src="https://kormedi.com/wp-content/uploads/2022/04/ck_tica1010005154_l-580x387.jpg"/>
        </div>
        <h3>닉네임 : { userNickName }</h3>
        <h3>생년월일 : { userBirth }</h3>
        <h3>이메일 : { userEmail }</h3>
        <h3>전화번호 : { userPhone }</h3>
        <h3>주소 : { userAddress } </h3>
      </div>
    </div>
  )
}