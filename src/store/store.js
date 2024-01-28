import { configureStore, createSlice } from '@reduxjs/toolkit'

const userToken = createSlice({
  name : 'userToken',
  initialState : null,
  reducers : {
    setUserToken(state, action){
      return action.payload
    }
  }
})

const loginToken = createSlice({
  name : 'loginToken',
  initialState : false,
  reducers : {
    setLoginToken(state, action){
      return action.payload
    }
  }
})

const loginModal = createSlice({
  name : 'loginModal',
  initialState : false,
  reducers : {
    setLoginModal(state, action){
      return action.payload
    }
  }
})

const joinModal = createSlice({
  name : 'joinModal',
  initialState : false,
  reducers : {
    setJoinModal(state, action){
      return action.payload
    }
  }
})

const postModal = createSlice({
  name : 'postModal',
  initialState : false,
  reducers : {
    setPostModal(state, action){
      return action.payload
    }
  }
})

const postList = createSlice({
  name : 'postList',
  initialState : [],
  reducers : {
    setPostList(state, action){
      return [...action.payload]
    }
  }
})

const commentList = createSlice({
  name : 'commentList',
  initialState : [],
  reducers : {
    setCommentList(state, action){
      return [...action.payload]
    }
  }
})

export const { setUserToken} = userToken.actions
export const { setLoginToken } = loginToken.actions
export const { setLoginModal } = loginModal.actions
export const { setJoinModal } = joinModal.actions
export const { setPostModal } = postModal.actions
export const { setPostList } = postList.actions
export const { setCommentList } = commentList.actions

const store = configureStore({
  reducer: { 
    userToken : userToken.reducer,
    loginModal : loginModal.reducer,
    loginToken : loginToken.reducer,
    joinModal : joinModal.reducer,
    postModal : postModal.reducer,
    postList : postList.reducer,
    commentList : commentList.reducer
  }
}) 

export default store