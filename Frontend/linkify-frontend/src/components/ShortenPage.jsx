import React from 'react'
import { useParams } from 'react-router-dom'

const ShortenPage = () => {
    const { url } = useParams();
    if(url){
        window.location.href = import.meta.env.VITE_BACKEND_URL + '/' + url;
    }
}

export default ShortenPage