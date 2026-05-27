
import API from "../../api";
import { useEffect, useState } from "react";
import { Link,  useNavigate, useParams } from "react-router-dom";


export function DeleteVideo(){
    const { id } = useParams();
    const navigate=useNavigate();
    const[videos,setVideos]=useState([{VideoId:0,Title:'',Url:'',Likes:'0',Dislikes:'0',Views:'0',CategoryId:'0'}]);
    useEffect(()=>{
        API.get(`/videos/${id}`)
        .then((response)=>{
            setVideos(response.data)
        })
    },[id]);
    async function handleDeleteClick(){
        await API.delete(`/deletevideo/${id}`)
        alert('video deleted')
        navigate('/admin-home')
    }
    return(
        <div>
            <h2>Are you sure you want to delete?</h2>
            <iframe title={`Preview of ${videos[0].Title}`} src={videos[0].Url} width={400} height={400}></iframe>
            <p>
            <button className="btn btn-success me-2" onClick={handleDeleteClick}>Yes</button><Link to='/admin-home' className="btn btn-warning" >Cancel</Link>
            </p>
        </div>
    )
}