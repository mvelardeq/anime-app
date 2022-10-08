export const getMovieByURL = async(url)=>{
    const result = await fetch(url)
    const {data} = await result.json()
    return {
        id: data.mal_id,
        image: data.images.webp.large_image_url,
        title:data.title,
        year:data.year,
        score:data.score
    }
}