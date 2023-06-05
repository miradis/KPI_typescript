import { error } from "console"
import { axiosInstance } from "./authHeader"

export const addComment = async(eventId:string, comment:string)=>{
    console.log("id:",eventId)
    const body ={
        comment:comment
    }
    await axiosInstance.post(`teacher/comment/${eventId}`,body)
    .catch((error)=>{
        console.log("ERROR:",error)
        throw error;
    })
}

export const deleteComment =async(eventId:string)=>{
    await axiosInstance.delete(`teacher/comment/${eventId}/delete`)
    .catch((error)=>{
        console.log("ERROR:", error)
        throw error;
    })
}