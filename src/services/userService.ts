import axios from "axios";
import { ITeacher } from "../common/ITeacher";
import { ITask } from "../common/ITask";
const API_URL="http://localhost:8088/";

export const getAllTeachers = async (): Promise<ITeacher[]> => {
      
  const response = await axios.get(API_URL+"users");
    const teachers: ITeacher[] = response.data;
    console.log("Teachers in service: "+ teachers)
    return teachers;
  };

export const getAllCategories = async (): Promise<ITask[]> => {
    const response =await axios.get(API_URL+"categories");
    const categories:ITask[]=response.data;
    return categories
}
