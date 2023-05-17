import axios from "axios";
import { IUser } from "../common/IUser";
import { authHeader } from "./authHeader";

interface JSONResp{
    status: number;
    baseRole: string;
}
const API_URL = "http://localhost:8088/";
export const login = (email:string, password:string)=>{
    return axios.post(API_URL+"login?email="+email+"&password="+password)
    .then ((response) =>{
        if (response.data){
            localStorage.setItem("token", JSON.parse(response.data))
        }
        return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while logging in:", error);
      throw error;
    });;
}
  

  export const getCurrentUser = () => {
    const token =localStorage.getItem('token')
    // return authHeader.get(API_URL+'profile')
    return axios.get(API_URL + "profile",{headers : {"token" : token}})
      .then((response) => {
        console.log("Response:"+response.headers)
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data;
      })
      .catch((error)=>{
        console.log(error)
        throw error
      });
  };

  export const getUser =()=>{
        const userStr = localStorage.getItem("user");
    if (userStr === null) return {};
    return JSON.parse(userStr);
  }

  export const logOut=()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token")
  }

  // export const getCurrentUser = () => {
//     const userStr = localStorage.getItem("user");
//     if (userStr === null) return {};
//     return JSON.parse(userStr);
//   };