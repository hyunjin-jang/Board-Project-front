import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function WirtePost(){
  const API_URL = process.env.REACT_APP_API_URL
  const navigate = useNavigate()

  const [postTitle, setPostTitle] = useState()
  const [postContent, setPostContent] = useState()
  const [loading, setLoading] = useState(false);
  const [imageAlert, setImageAlert] =useState(false)
  const files = new FormData()

  const writeDto = {
    postTitle,
    postContent,
    
  }

  const handleImageUpload = (e) =>{
    for (let i=0; i < e.target.files.length; i++){
      files.append(`files` ,e.target.files[i])
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true)
    setImageAlert(false)
    try {
      axios.defaults.headers.common.Authorization = localStorage.getItem('authorization')
      await axios.post(`${API_URL}/posts/image`, files)
      .then((response)=>{
        let ImageNames = response.data
        writeDto.postImageNames = ImageNames
        
        axios.post(`${API_URL}/posts`, writeDto)
        .then((response)=>{
          console.log(response.data)
          navigate('/')
        }).catch((error)=>{
          console.log(error + "  포스팅 저장 실패")
        })
      }).catch((error)=>{
        setImageAlert(true)
        console.log(error + " 이미지 저장 실패함")
      })
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="write-container">
      { loading ? 
        <div className="black-bg">
          <img src={process.env.PUBLIC_URL + '/Spinner-1.3s-197px.gif'} alt="Loading"/> 
        </div>
        : null }
      { imageAlert ? <p>이미지를 포함시켜주세요</p> : null }
      <form onSubmit={ handleSubmit } className="write-box">
        <h5>제목</h5>
        <input className="write-title" onChange={(e)=>{ setPostTitle(e.target.value) }}></input>
        <h5>내용</h5>
        <textarea onChange={(e)=>{ setPostContent(e.target.value) }}/>
        <br/>
        <input type="file" multiple name="files" onChange={ handleImageUpload }/>
        <br/>
        <button className="write-btn" type="submit">작성하기</button>
      </form>
    </div>
  )
}