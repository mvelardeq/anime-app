import { useCallback, useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { addMovies } from "../../store/moviesApp/moviesSlice";
import { getMoviesByURL } from "../../store/moviesApp/thunks";
import { CheckingAuth } from "../../ui/CheckingAuth";
import { CardMovie } from "./CardMovie";

export const ShowAttachedMovies = ({ url, page }) => {

  const { movies } = useSelector((state) => state.movies);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesByURL(`${url}&page=1`));
  }, [url]);


  return (
    
        <div className="grid-cards mt-6">
          {movies.map((movie) => (
            <CardMovie key={movie.id} {...movie} />
          ))}
        </div>
  );
};
