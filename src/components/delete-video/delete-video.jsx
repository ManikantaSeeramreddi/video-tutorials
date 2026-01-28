
import axios from "axios";
import { useEffect, useState } from "react";
import { Link,  useNavigate, useParams } from "react-router-dom";


export function DeleteVideo(){
    const params=useParams();
    const navigate=useNavigate();
    const[videos,setVideos]=useState([{VideoId:0,Title:'',Url:'',Likes:'0',Dislikes:'0',Views:'0',CategoryId:'0'}]);
    useEffect(()=>{
        axios({
            method:'get',
          url:`http://127.0.0.1:5000/videos/${params.id}`
        })
        .then((response)=>{
            setVideos(response.data)
        })
    },[]);
    function handleDeleteClick(){
        axios({
            method:'delete',
            url:`http://127.0.0.1:5000/deletevideo/${params.id}`
        })
        alert('video deleted')
        navigate('/admin-home')
    }
    return(
        <div>
            <h2>Are you sure you want to delete?</h2>
            <iframe src={videos[0].Url} width={400} height={400}></iframe>
            <p>
            <button className="btn btn-success me-2" onClick={handleDeleteClick}>Yes</button><Link to='/admin-home' className="btn btn-warning" >Cancel</Link>
            </p>
        </div>
    )
}