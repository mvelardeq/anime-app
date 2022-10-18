import { movieResponseByData } from "./movieResponseByData"

export const getMovieByURL = async(url)=>{

    const result = await fetch(url)
    const {data} = await result.json()
    
    return movieResponseByData(data)

}
