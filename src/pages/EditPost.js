import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function EditPost(){
  const API_URL = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  
  const {id} = useParams()
  const [postTitle, setPostTitle] = useState()
  const [postContent, setPostContent] = useState()
  const [postId, setPostId] = useState(id)
  const [loading, setLoading] = useState(false);
  const [imageAlert, setImageAlert] =useState(false)
  const files = new FormData()

  const editPostDto = {
    postId,
    postTitle,
    postContent, 
  }

  useEffect(()=>{
    axios.get(`${API_URL}/posts/`+(id))
    .then((response)=>{
      setPostId(response.data.postId)
      setPostTitle(response.data.postTitle);
      setPostContent(response.data.postContent)
    })
  }, [])

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
        editPostDto.postImageNames = ImageNames
        
        axios.put(`${API_URL}/posts`, editPostDto)
        .then((response)=>{
          console.log(editPostDto)
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
      <form onSubmit={ handleSubmit } className="write-box">
        <h5>제목</h5>
        <input className="write-title" value={postTitle} onChange={(e)=>{ setPostTitle(e.target.value) }}></input>
        <h5>내용</h5>
        <textarea value={postContent} onChange={(e)=>{ setPostContent(e.target.value) }}/>
        { imageAlert ? <p className="img-error">이미지를 포함시켜주세요!</p> : null }
        <br/>
        <input type="file" multiple name="files" onChange={ handleImageUpload }/>
        <br/>
        <button className="write-btn" type="submit">작성하기</button>
      </form>
    </div>
  )
}