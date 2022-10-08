
export const upLoadFile = async(file)=>{

    if(!file) return null

    const formData = new FormData()
    formData.append('upload_preset','moviesApp')
    formData.append('file',file)

    const url = 'https://api.cloudinary.com/v1_1/mvelardeq/upload'

    try {

        const result = await fetch(url,{
            method:'post',
            body:formData
        })
        const json = await result.json()
        const {secure_url} = json

        return secure_url
        
    } catch (error) {
        console.log(error)
    }

    
}