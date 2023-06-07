import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaving: false,
  movies: [],
  moviesForAttaching:[],
  favorites: [],
  friends: [],
  allPosts:[],
  genresInterest: [],
};

export const moviesSlice = createSlice({
  initialState,
  name: "movies",
  reducers: {
    savingNewInfo: (state) => {
      state.isSaving = true;
    },
    newFavorite: (state, { payload }) => {
      state.favorites.push(payload);
    },
    removeFavoriteMovie: (state, { payload }) => {
      const index = state.favorites.indexOf(
        state.favorites.find((el) => el.id === payload)
      );
      state.favorites.splice(index, 1);
    },
    getMovies: (state, { payload }) => {
      state.movies = payload;
    },
    getAttachMovies: (state, { payload }) => {
      state.moviesForAttaching = payload;
    },
    addMovies: (state, { payload }) => {
      state.movies = state.movies.concat(payload);
    },
    getPosts: (state, { payload }) => {
      state.allPosts = payload;
    },
    addPost: (state, { payload }) => {
      state.allPosts.unshift(payload);
    },
    likePost: (state,{payload})=>{
      state.allPosts.map(el=>{
        if(el.id === payload.id) el.likes.push({date:payload.date,userId:payload.userId})
      })
    },
    dislikePost: (state,{payload})=>{
      state.allPosts.map(el=>{
        if(el.id === payload.id) {
          const index = el.likes.indexOf(el.likes.find(el=>el.userId===payload.userId))
          el.likes.splice(index,1)
        }
      })
    },
    newCommentPost:(state,{payload})=>{
      state.allPosts.map(el=>{
        if(el.id===payload.postId){

          if(!el.comments) el.comments = []
          delete payload.postId
          el.comments.unshift(payload)

        }
      })
    },
    showMoreReplies: (state,{payload})=>{
      state.allPosts.map(post=>{
        if(post.id === payload.postId){
          post.comments.map(comment=>{
            if(comment.id === payload.commentId){

              if(comment.replies.length-comment.countShowingReplies<3) return comment.countShowingReplies=comment.replies.length

              comment.countShowingReplies = comment.countShowingReplies+3

            }
          })
        }
      })
    },
    showingReplyForm:(state,{payload})=>{
      state.allPosts.map(el=>{
        if(el.id===payload.postId){
          el.comments.map(comment=>{
            if(comment.id===payload.commentId) comment.isReplyingActive=true
          })
        }
      })
    },
    showingReplyOfReplyForm:(state,{payload})=>{
      state.allPosts.map(el=>{
        if(el.id===payload.postId){
          el.comments.map(comment=>{
            if(comment.id===payload.commentId) {
              comment.replies.map(reply=>{
                if(reply.id === payload.id) reply.isReplyingActive=true
              })
            }
          })
        }
      })
    },
    newReplyComment: (state, {payload})=>{
      state.allPosts.map(post=>{
        if(post.id === payload.postId){
          post.comments.map(comment=>{
            if(comment.id === payload.commentId){
              comment.replies.push({id:payload.id,date:payload.date, description:payload.description, likes:payload.likes ,userInfo:payload.userInfo, userReplyInfo:payload.userReplyInfo, userId:payload.userId, userReplyId:payload.userReplyId})
            }
          })
        }
      })
    },
    hidingReplyForm:(state,{payload})=>{
      state.allPosts.map(el=>{
        if(el.id===payload.postId){
          el.comments.map(comment=>{
            if(comment.id===payload.commentId) comment.isReplyingActive=false
          })
        }
      })
    },
    likeComment: (state, {payload})=>{
      state.allPosts.map(post=>{
        if(post.id === payload.postId){
          post.comments.map(comment=>{
            if(comment.id === payload.commentId){
              comment.likes.push({date:payload.date, userId:payload.userId})
            }
          })
        }
      })
    },
    dislikeComment: (state, {payload})=>{
      state.allPosts.map(post=>{
        if(post.id === payload.postId){
          post.comments.map(comment=>{
            if(comment.id === payload.commentId){
              const index = comment.likes.indexOf(comment.likes.find(like=>like.userId===payload.userId))
              comment.likes.splice(index,1)
            }
          })
        }
      })
    },
    likeReply: (state,{payload}) => {
      state.allPosts.map(post=>{
        if(post.id === payload.postId){
          post.comments.map(comment=>{
            if(comment.id === payload.commentId){
              comment.replies.map(reply=>{
                if(reply.id===payload.replyId){
                  reply.likes.push({date:payload.date, userId:payload.userId})
                }
              })
            }
          })
        }
      })
    },
    dislikeReply: (state,{payload})=>{
      state.allPosts.map(post=>{
        if(post.id === payload.postId){
          post.comments.map(comment=>{
            if(comment.id === payload.commentId){
              comment.replies.map(reply=>{
                if(reply.id===payload.replyId){
                  const index = reply.likes.indexOf(reply.likes.find(like=>like.userId===payload.userId))
                  reply.likes.splice(index,1)
                }
              })
            }
          })
        }
      })
    },
    loadFavorites: (state, { payload }) => {
      state.favorites = payload;
    },
    resetMoviesState: (state) => {
      return initialState
    },
  },
});

export const {
  getMovies,
  savingNewInfo,
  newFavorite,
  loadFavorites,
  addMovies,
  removeFavoriteMovie,
  resetMoviesState,
  addPost,
  likePost,
  dislikePost,
  newCommentPost,
  showMoreReplies,
  showingReplyForm,
  showingReplyOfReplyForm,
  newReplyComment,
  hidingReplyForm,
  likeComment,
  dislikeComment,
  likeReply,
  dislikeReply,
  getAttachMovies,
  getPosts,
} = moviesSlice.actions;
