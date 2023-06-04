import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ITeacher } from "../../../common/ITeacher";
import { getCurrentUser, getRole } from "../../../services/authServies";
import { getTeacher } from "../../../services/userService";

const useProfile =(id: string | undefined)=>{
    const [currentUser, setCurrentUser] = useState< ITeacher | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [isOwner, setIsOwner] =useState(false);
    useEffect(() => {
        const fetchCurrentUser = async () => {
          
            setLoading(true)
          const role =await getRole();
          const user:ITeacher = await getCurrentUser();
          if (role.roles.includes("ADMIN_ROLE")) {
            setLoading(false);
            setIsOwner(true)
            return;
          }
          if (role.email==user.email){
            setIsOwner(true)
          }
          setCurrentUser(user || undefined)
          setLoading(false);
        };
        if (id){
            const fetchCurrentTeacher = async() =>{
                setLoading(true)
                const role =await getRole();
                if (role.roles.includes("ROLE_ADMIN")){
                  setIsOwner(true);
                }
                
                const teacher =await getTeacher(id);
                if (role.email==teacher.email){
                  setIsOwner(true)
                }
                setCurrentUser(teacher || undefined)
                setLoading(false)

            };
            fetchCurrentTeacher();
        }
        else{
        fetchCurrentUser();  
      }
      }, [id]);
    
      return {currentUser, loading, isOwner};
}
export {useProfile}