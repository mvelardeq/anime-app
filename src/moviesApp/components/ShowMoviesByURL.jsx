import { useCallback, useState } from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { addMovies } from "../../store/moviesApp/moviesSlice";
import { getMoviesByURL } from "../../store/moviesApp/thunks";
import { CheckingAuth } from "../../ui/CheckingAuth";
import { CardMovie } from "./CardMovie";

export const ShowMoviesbyURL = ({ url, page }) => {
  const { movies } = useSelector((state) => state.movies);

  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();

  if(true){ //only for test
    useEffect(() => {
      dispatch(getMoviesByURL(`${url}&page=1`));
    }, [url]);
  }


  const fetchData = async () => {
    try {

      const res = await fetch(`${url}&page=${movies.length / page+1}`);
      const { data } = await res.json();


      const arr = [];

      data.forEach((movie) => {
        arr.push({
          id: movie.mal_id,
          image: movie.images.webp.large_image_url,
          title: movie.title,
          year: movie.year,
          score: movie.score,
          synopsis: movie.synopsis,
        });
      });
      if (arr.length == 0) setHasMore(false);
      setTimeout(() => {
        dispatch(addMovies(arr));
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<CheckingAuth height="h-20" />}
      >
        <div className="grid-cards mt-6">
          {movies.map((movie) => (
            <CardMovie key={movie.id} {...movie} />
          ))}
        </div>
      </InfiniteScroll>
  );
};
