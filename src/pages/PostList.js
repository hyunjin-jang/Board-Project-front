import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLoginModal, setPostList } from "../store/store"

export default function PostList(){
  const API_URL = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const postList = useSelector((state)=> {return state.postList})
  const [postCount] = useState(postList.length)

  useEffect(()=>{
    axios.get(`${API_URL}/posts`)
    .then((response)=>{
      dispatch(setPostList(response.data))
    }).catch((error)=>{
      console.log(error)
    })
  }, [postCount])

  function posting(postContent){
    return (
      <div key={postContent.postId} className="post-content" 
        onClick={(e)=>{
          let postIndex = postContent.postId
          navigate("/posts/" + postIndex)
        }}>
        <div className="post-list-img">
          {
            postContent.postImageNames ? 
            <img src={postContent.postImageNames[0]} alt="Post" /> :
            null
          }
        </div>
        <div className="post-list-context">
          <h4>{postContent.postTitle}</h4>
          <h5>작성자 {postContent.user.userNickName}</h5>
        </div>
      </div>
    )
  }

  return (
    <div className="post-container">
      <div className="main-box">
        <div className="clear"></div>
        {postList.map((postContent)=> (
          posting(postContent)
        ))}
        <div className="clear"></div>
        <button className="btn" onClick={()=>{ 
          if(localStorage.getItem('authorization') != null){
            navigate("/posts/write") 
          } else {
            dispatch(setLoginModal(true))
          }
          
        }}>글쓰기</button>
      </div> 
    </div>
  )
}