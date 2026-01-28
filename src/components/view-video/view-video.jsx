import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"


export function ViewVideo(){
    const params=useParams();
    const[videos,setVideos]=useState([{VideoId:0,Title:'',Url:'',Likes:'0',Dislikes:'0',Views:'0',CategoryId:'0'}]);
    useEffect(()=>{
        axios({
            method:'get',
            url:`http://127.0.0.1:5000/videos/${params.id}`


        })
        .then(response=>{
            setVideos(response.data)
        })
    },[])
    return(
        <div>
            <h2>{videos[0].Title}</h2>
            <iframe src={videos[0].Url} width={400} height={400} frameborder="0"></iframe>
            <p>
                <button className="btn btn-secondary"><Link to='/admin-home' className="text-decoration-none text-white">Back to Home</Link></button>
            </p>
        </div>
    )
}