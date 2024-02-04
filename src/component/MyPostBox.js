import { useSelector } from "react-redux"

export default function MyPostBox(){
  const postList = useSelector((state)=>{return state.postList})

  return (
    <div className="profile-box">
      <div className="profile-top">
        <div className="clear"></div>
        <h2 style={{ float:"left" }}>내가 쓴 포스트</h2>
        <div className="clear"></div>
      </div>
      <div className="profile-middle">
        {
          postList.map((post, i)=>{
            return (
              <div className="mypost-content">
                <b>{ post } </b>
                <button>삭제</button>
                <button>수정</button>
                <div className="clear"></div> 
              </div>
           )
        })
        }
      </div>
    </div>
  )
 }