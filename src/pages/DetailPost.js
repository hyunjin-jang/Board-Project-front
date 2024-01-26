import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { setLoginModal } from "../store/store"

export default function DetailPost(){
  const API_URL = process.env.REACT_APP_API_URL
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const {id} = useParams()
  const [posting, setPosting] = useState()
  const [images, setImages] = useState()
  const [getComment, setGetComment] = useState()
  const [comment, setComment] = useState()
  const [commentCount, setCommentCount] = useState()
  const [loginUserEmail, setLoginUserEmail] = useState()
  let currentImage = 0

  const WriteCommentDto = {
    comment,
    posting
  }
  
  useEffect(()=>{
    axios.get(`${API_URL}/posts/`+(id))
    .then((response)=>{
      setPosting(response.data)
      setImages(response.data.postImageNames)
      setGetComment(response.data.commentList)
      setCommentCount(response.data.commentList.length)
    })
    if(localStorage.getItem('authorization')){
      axios.defaults.headers.common.Authorization = localStorage.getItem('authorization')
      axios.get(`${API_URL}/user`)
      .then((response)=>{
        setLoginUserEmail(response.data.userEmail)
      })
    }
  }, [commentCount])

  function postDelete(){
    axios.delete(`${API_URL}/posts/`+(id))
    .then((response)=>{
      navigate(-1)
    }).catch((error)=>{
      console.log(error)
    })
  }

  function commentAction(){
    if(!(localStorage.getItem('authorization') == null)) {
      axios.defaults.headers.common.Authorization = localStorage.getItem('authorization')
      axios.post(`${API_URL}/comment`, WriteCommentDto)
      .then((response)=>{
        setCommentCount(commentCount+1)
      })
    } else {
      dispatch(setLoginModal(true))
    }
  }

  return (
    <div className="detail-container">
      <div className="detail-box">
        <div className="slide-box">
          <div className="slide-container">
            { posting ?
              images.map((imageName, id)=>{
                return <img 
                  key={id} 
                  src={imageName}
                  alt="Post"
                />
              }):
              null
            }
          </div>
          <div className="selectImage">
            <button onClick={(e)=>{
              if(currentImage > 0){
                if(document.body.clientWidth > 1200) {
                  currentImage = currentImage-500
                } else if(document.body.clientWidth > 768) {
                  currentImage = currentImage-350
                } else {
                  currentImage = currentImage-332
                }
                
                document.querySelector('.slide-container').style.transform='translateX(-'+currentImage+'px)'
              }
            }}>◀</button>

            {
              posting ?
              images.map((image, id)=>{
                return (
                  <button key={id} onClick={()=>{
                    if(document.body.clientWidth > 1200) {
                      currentImage = id*500
                    } else if(document.body.clientWidth > 768) {
                      currentImage = id*350
                    } else {
                      currentImage = id*332
                    }
                    document.querySelector('.slide-container').style.transform='translateX(-'+currentImage+'px)'
                  }}>{id+1}</button>
                )
              }):
              null
            }
            <button onClick={()=>{
              if(currentImage < (images.length-1)){
                if(document.body.clientWidth > 1200) {
                  currentImage = currentImage + 500
                } else if(document.body.clientWidth > 768) {
                  currentImage = currentImage + 350
                } else {
                  currentImage = currentImage + 332
                }
                
                document.querySelector('.slide-container').style.transform='translateX(-'+currentImage+'px)'
              } else {
                currentImage = 0
                document.querySelector('.slide-container').style.transform='translateX(-'+currentImage+'px)'
              }
            }}>▶</button>
          </div>
        </div>
        <div className="detail-content"> 
          { posting ?
            posting.userEmail == loginUserEmail ?
            <>
              <button onClick={()=>{ navigate('/posts/edit/'+id) }}>수정</button>
              <button onClick={postDelete}>삭제</button> 
            </>
            :
            null
          :
          null
          }
          {
            posting ?
            <>
              <h3>{posting.postTitle}</h3>
              <h5>{posting.postContent}</h5>
              <h5>{posting.postCreateTime}</h5>
              <h5>{posting.userNickName}</h5>
            </> :
            <p>Loading...</p>
          }
          <div>
            <h3>댓글</h3>
            <input className="comment-input" placeholder="댓글을 적어보세요" onChange={(e)=>{ setComment(e.target.value) }}/>
            <button className="comment-btn" onClick={ commentAction }>작성</button>
            {
            posting ?
            getComment.map((comment, id)=>{
              return (
                <div>
                  <p>{comment.commentContent} <span>{comment.user.userNickName}</span></p>
                </div>
              )
            }):
            null
            }
          </div>
        </div>
      </div>
    </div>
  )
}