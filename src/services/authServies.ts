import axios from "axios";
import Cookies from "js-cookie";
import { axiosInstance } from "./authHeader";
interface JSONResp{
    status: number;
    baseRole: string;
}
const API_URL = "https://kpiserver-production.up.railway.app/";
export const login = async(email:string, password:string)=>{
  const body ={email, password}
    return await axios.post(API_URL+"api/auth/login", body)
    .then ((response) =>{
        if (response.data.accessToken){
          const userData ={
            roles:response.data.roles,
            accessToken: response.data.accessToken,
            id:response.data.id,
            email:response.data.email,
          }
          Cookies.set("session", JSON.stringify(userData));
        }
        return response.data;
    })
    .catch((error) => {
      console.error("Error occurred while logging in:", error);
      throw error;
    });;
}
  

  export const getCurrentUser = async () => {
    return await axiosInstance.get(API_URL + "profile")
      .then((response) => {
        return response.data;
      })
      .catch((error)=>{
        throw error
      });
  };

  // export const getUser = () => {
  //   const userStr = Cookies.get("user");
  
  //   if (userStr === undefined) return { teacher_id: '' }; // Provide a default value for teacher_id
  //   const decodedUserStr = decodeURIComponent(userStr);
  //   const userObj = JSON.parse(decodedUserStr);
  
  //   return userObj;
  // };


  export const getAuth=()=>{
    const token =Cookies.get("token");
    return token;
  }
  export const getRole = () => {
    const userStr = Cookies.get("session");
    if (userStr === undefined) return {};
    const decodedUserStr = decodeURIComponent(userStr);
    const userObj = JSON.parse(decodedUserStr);
    console.log("UserObject: "+userObj.roles)
    return userObj || [];
  };
  export const logOut=()=>{
    Cookies.remove("session")
  }