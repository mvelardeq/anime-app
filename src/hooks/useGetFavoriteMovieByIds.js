import { useEffect, useState } from "react"

export const useGetFavoriteMovieByIds = (ids=[]) => {

    const [favoriteMovies, setfavoriteMovies] = useState([])

    const getMovies = async()=>{

      console.log(ids)
      
      for (const id of ids) {
        const result = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
        const {data} = await result.json()
        console.log(id)
        setfavoriteMovies(...favoriteMovies,{
          id: data.mal_id,
          image: data.images.webp.large_image_url,
          title:data.title,
          year:data.year,
          score:data.score
        })
      }
    }

    useEffect(() => {
      getMovies()
    
    }, [ids])
    

  return {
    favoriteMovies
  }
}
