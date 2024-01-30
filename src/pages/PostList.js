import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLoginModal, setPostList, setCurPage } from "../store/store"

export default function PostList(){
  const API_URL = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const postList = useSelector((state)=> {return state.postList})
  const [postCount] = useState(postList.length)
  const [totalPage, setTotalPage] = useState(0)
  const [curPage, setCurPage] = useState(0)
  let totalPageArray = []

  useEffect(()=>{
    axios.get(`${API_URL}/post/${curPage}`)
    .then((response)=>{
      setTotalPage(response.data.totalPages)
      dispatch(setPostList(response.data.content))
    }).catch((error)=>{
      console.log(error)
    })
  }, [postCount, curPage])

  for(let i=0; i < totalPage; i++){
    totalPageArray.push(i+1)
  }

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
          <h5>作成者 {postContent.user.userNickName}</h5>
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

        <div>
          {
            totalPageArray.map((pageNum, i)=>{
              return (<button key={i} className="page-btn" onClick={()=>{
                setCurPage(pageNum-1)
              }}>{ pageNum }</button>)
            })
          }
        </div>

        <button className="write-btn" onClick={()=>{ 
          if(localStorage.getItem('authorization') != null){
            navigate("/posts/write") 
          } else {
            dispatch(setLoginModal(true))
          }
          
        }}>作成</button>
      </div> 
    </div>
  )
}