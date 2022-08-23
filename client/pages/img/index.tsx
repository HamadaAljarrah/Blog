import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../variables';

const fetchImages = async (name: string) => {
    const imageName = name
    const url = `${SERVER_URL}/fetchImage/${imageName}`

    const response = await fetch(url)
    const blob = await response.blob()
    return URL.createObjectURL(blob)
}


const FilePage = () => {
    const [img, setImg] = useState<any>()



    useEffect(() => {
        const getData = async () => {
            setImg(await fetchImages('img-1661206912997'))
        }
        getData()
    }, [])



    return (
        <div>
            <img src={img} alt="trial" />
        </div>
    )
}
export default FilePage