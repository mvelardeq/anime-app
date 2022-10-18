import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAttachMoviesByURL, getMoviesByURL } from "../../store/moviesApp/thunks";
import { CardMovie } from "./CardMovie";

export const ShowAttachedMovies = ({ url, page, setAttatchMovieId }) => {

  const {moviesForAttaching} = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAttachMoviesByURL(`${url}&page=1`));
  }, [url]);


  return (
    
        <div className="grid-cards mt-6">
          {moviesForAttaching.map((movie) => (
            <CardMovie key={movie.id} {...movie} isCardForAttach setAttatchMovieId={setAttatchMovieId} />
          ))}
        </div>
  );
};
