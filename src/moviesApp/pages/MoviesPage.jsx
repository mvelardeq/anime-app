import { MoviesLayout } from "../layout";
import { Card } from "flowbite-react";
import { ShowMoviesbyURL } from "../components";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const MoviesPage = () => {
  const [searchMovies, setSearchMovies] = useState(
    "https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=20"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitSearch = (data) => {
    if(data.search==='') setSearchMovies("https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=20")
    setSearchMovies(`https://api.jikan.moe/v4/anime?q=${data.search}`);
  };

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
      <form
        className="flex items-center mt-6"
        onSubmit={handleSubmit(onSubmitSearch)}
      >
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            {...register("search")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
      <article>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-6">
          Popular movies right now
        </h2>

        <ShowMoviesbyURL url={searchMovies} />
      </article>
    </MoviesLayout>
  );
};
