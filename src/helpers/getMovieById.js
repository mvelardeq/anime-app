import { movieResponseByData } from "./movieResponseByData"

export const getMovieById = async(id)=>{
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
    const {data} = await res.json()

    return movieResponseByData(data)
}