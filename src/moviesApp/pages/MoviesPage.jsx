import { MoviesLayout } from "../layout";
import { Card } from "flowbite-react";
import { ShowMoviesbyURL } from "../components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormSearch } from "../components/FormSearch";

export const MoviesPage = () => {

  let initialInputSearch="https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=20"
  const [searchMovies, setSearchMovies] = useState( initialInputSearch );

  return (
    <MoviesLayout>
      <Card>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome to <span className="text-primary-500">MoviesApp</span>
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Browse movies, add them to watchlists and share them with friends.
          Just click the add a movie, the poster to see more details or to mark
          the movie as watched.
        </p>
      </Card>
      <FormSearch searchMovies={searchMovies} setSearchMovies={setSearchMovies} initialInputSearch={initialInputSearch} />
      <article>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-6">
          Popular movies right now
        </h2>

        <ShowMoviesbyURL url={searchMovies} page={20} />
      </article>
    </MoviesLayout>
  );
};
