export const movieResponseByData = (data)=>{
    return {
        id: data.mal_id,
        image: data.images.webp.large_image_url,
        title:data.title,
        year:data.year,
        score:data.score,
        synopsis:data.synopsis
    }
}