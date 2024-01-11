import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function EditPost(){
  const navigate = useNavigate()
  const {id} = useParams()
  const [postTitle, setPostTitle] = useState()
  const [postContent, setPostContent] = useState()
  const [postId, setPostId] = useState(id)
  const files = new FormData()

  const editPostDto = {
    postId,
    postTitle,
    postContent, 
  }

  useEffect(()=>{
    
    axios.get('http://localhost:8080/posts/'+(id))
    .then((response)=>{
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
    axios.defaults.headers.common.Authorization = localStorage.getItem('authorization')
    await axios.post('http://localhost:8080/posts/image', files)
    .then((response)=>{
      let ImageNames = response.data
      editPostDto.postImageNames = ImageNames
      
      axios.put('http://localhost:8080/posts', editPostDto)
      .then((response)=>{
        console.log(response.data)
        navigate('/')
      }).catch((error)=>{
        console.log(error + "  포스팅 저장 실패")
      })
    }).catch((error)=>{
      console.log(error + " 이미지 저장 실패함")
    })
  }
  
  return (
    <div className="write-container">
      <form onSubmit={ handleSubmit } className="write-box">
        <h5>제목</h5>
        <input className="write-title" value={postTitle} onChange={(e)=>{ setPostTitle(e.target.value) }}></input>
        <h5>내용</h5>
        <textarea value={postContent} onChange={(e)=>{ setPostContent(e.target.value) }}/>
        <br/>
        <input type="file" multiple name="files" onChange={ handleImageUpload }/>
        <br/>
        <button className="write-btn" type="submit">작성하기</button>
      </form>
    </div>
  )
}