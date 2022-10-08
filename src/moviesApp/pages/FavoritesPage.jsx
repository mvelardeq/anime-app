import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetFavoriteMovieByIds } from "../../hooks/useGetFavoriteMovieByIds"
import { startGetFavorites } from "../../store/moviesApp/thunks"
import { CardMovie } from "../components/CardMovie"
import { MoviesLayout } from "../layout"

export const FavoritesPage = () => {
  const {favorites} = useSelector(state=>state.movies)

  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(startGetFavorites())
  },[])

  return (
    <MoviesLayout>
      <article>
        <h2 className="text-3xl mb-8">Favorite movies</h2>
        <div className="grid-cards">
          {favorites.map((movie) => (
            <CardMovie key={movie.id} {...movie} />
          ))}
        </div>
      </article>
    </MoviesLayout>
  )
}
