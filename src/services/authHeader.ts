import axios from "axios";

const authHeader =axios.create({
  baseURL:"http://localhost:8088/",
  headers: {
    "Content-type": "application/json",
    "token": `${localStorage.getItem('token')}`,
  },
  
})
export {authHeader}

// authHeader.interceptors.request.use(
//   (config)=>{
//     const token =localStorage.getItem('token');
//     if (token){
//       config.headers.Authorization=`Bearer ${token}`;
//     }
//     return config;
//   }


// export default function authHeader() {
//   const token = localStorage.getItem("token");
//   console.log("Token: "+token)
//   if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete axios.defaults.headers.common['Authorization'];;
//   }
// }