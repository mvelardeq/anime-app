import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaving: false,
  movies: [],
  moviesForAttaching:[],
  favorites: [],
  friends: [],
  allPosts:[],
  attachMovies:[],
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
    addMovies: (state, { payload }) => {
      state.movies = state.movies.concat(payload);
    },
    addPost: (state, { payload }) => {
      state.allPosts = state.allPosts.push(payload);
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
} = moviesSlice.actions;
