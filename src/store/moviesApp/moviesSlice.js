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
    showingReplyForm:(state,{payload})=>{
      state.allPosts.map(el=>{
        if(el.id===payload.postId){
          el.comments.map(comment=>{
            if(comment.id===payload.commentId) comment.isReplyingActive=true
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
  showingReplyForm,
  getAttachMovies,
  getPosts,
} = moviesSlice.actions;
