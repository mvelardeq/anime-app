import { useEffect, useState } from "react";

export const useFetch = (url = "") => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const res = await fetch(url);
    const { data } = await res.json();
    
    const array = []

    data.forEach(movie=>{
        array.push({
            id:movie.mal_id,
            image:movie.images.webp.large_image_url,
            title:movie.title,
            year:movie.year,
            score:movie.score
        })
    })

    setMovies(array);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    movies,
    getMovies,
  };
};
