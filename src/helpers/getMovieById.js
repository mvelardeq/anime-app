export const getMovieById = async(id)=>{
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
    const {data} = await res.json()

    return {
        id: data.mal_id,
        image: data.images.webp.large_image_url,
        title:data.title,
        year:data.year,
        score:data.score,
        synopsis:data.synopsis
    }
}