import { useSelector } from "react-redux"

export default function MyPostBox(){
  const postList = useSelector((state)=>{return state.postList})

  return (
    <div className="myposts-box">
      <div className="profile-top">
        <div className="clear"></div>
        <h3 style={{ float:"left" }}>내가 작성한 포스팅</h3>
        <div className="clear"></div>
      </div>
      <div className="post-list">
          {
            postList.map((post)=>{
              console.log(post.user.userNickName)
              if(post.user.userNickName == "admin"){
                return (
                  <div className="myposts">
                    <h5>{post.postTitle}</h5>
                  </div>
                )
              }
            })
          }
      </div>
    </div>
  )
 }