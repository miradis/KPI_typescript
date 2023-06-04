import {useState, useEffect} from"react"
import { IDepartment, IRate, ITeacher, IUser } from "../common/ITeacher";
import { getAllCategories, getAllDepartaments, getAllRates, getAllTeachers, getAllUsers } from "../services/userService";
import { ITask, Status } from "../common/IEvent";
const useTeachers =() =>{
    const [teachers, setTeachers] = useState<ITeacher[]>([]);
    const [categories, setCategories] =useState<ITask[] | undefined>(undefined)
    const [users, setUsers] =useState<IUser[] | undefined>(undefined)
    const [statuses, setStatuses] = useState<Status[] | undefined>(undefined)
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedEmail, setSelectedEmail] =useState<IUser | undefined>(undefined)
    const [departments, setDepartments] =useState<IDepartment[] | undefined>(undefined)
    const [rates, setRates] =useState<IRate[] | undefined>(undefined)
  useEffect(() => {
    const fetchTeachers = async () => {
      const allTeachers = await getAllTeachers();
      setTeachers(allTeachers);
    };
    fetchTeachers()
  }, []);

  useEffect(()=>{
    const fetchCategroies =async() =>{
        const getCategories = await getAllCategories();
        setCategories(getCategories)
    }
    fetchCategroies()
},[])
useEffect(()=>{
    const fetchTeachers= async()=>{
     const getUsers =await getAllUsers();
     setUsers(getUsers)
    }
    fetchTeachers()
 },[])

 useEffect(() => {
    if (selectedCategory && categories) {
      const selectedCategoryObj = categories.find(
        (cat) => cat.category_name === selectedCategory
      );
      if (selectedCategoryObj) {
        setStatuses(selectedCategoryObj.statuses);
        setSelectedStatus(selectedCategoryObj.statuses[0].status_name);
      }
    }
  }, [selectedCategory, categories]);
  useEffect(()=>{
    const fetchDepartamets = async ()=>{
      const alldepartments =await getAllDepartaments()
      setDepartments(alldepartments)
    }
    fetchDepartamets()
  },[])

  useEffect(()=>{
    const fetchRate =async()=>{
      const allRates = await getAllRates();
      setRates(allRates);
    }
    fetchRate();
  },[])
  useEffect(() => {
    if (selectedCategory && categories) {
      const selectedCategoryObj = categories.find(
        (cat) => cat.category_name === selectedCategory
      );
      if (selectedCategoryObj) {
        setStatuses(selectedCategoryObj.statuses);
        setSelectedStatus(selectedCategoryObj.statuses[0].status_name);
      }
    }
  }, [selectedCategory, categories]);
  const handleCategoryChange =(val:string) =>{
    setSelectedCategory(val);
}
const handleStatusChange =(val:string) =>{
    setSelectedStatus(val)
}
const handleTeacherChange = (val: string) => {
  const selectedTeacherObj = users?.find((teacher) => teacher.name === val);
  setSelectedEmail(selectedTeacherObj);
};
  return {teachers, categories, users, statuses,selectedCategory,selectedStatus,selectedEmail,rates,departments,
    handleCategoryChange,handleStatusChange,handleTeacherChange}
}
export {useTeachers}