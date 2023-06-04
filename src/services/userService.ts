
// import Cookies from "js-cookie";
// import { IUser } from "../common/IUser";
import { error } from "console";
import { IEventSmall, ITask } from "../common/IEvent";
import { ITeacher } from "../common/ITeacher";
import { axiosInstance } from "./authHeader";



export const getAllUsers =async() =>{
  const response =await axiosInstance.get("users")
  .catch((error)=>{
    console.log("ERROR:",error);
    throw error
  })
  return response.data;
}

export const getAllTeachers = async (): Promise<ITeacher[]> => {
  const response = await axiosInstance.get<ITeacher[]>("teachers");
  const teachers: ITeacher[] = response.data;
  return teachers;
};

export const getAllCategories = async (): Promise<ITask[]> => {
  const response = await axiosInstance.get<ITask[]>("categories");
  const categories: ITask[] = response.data;
  return categories;
};

export const getTeacher = async (id: string): Promise<ITeacher> => {
  const response = await axiosInstance.get<ITeacher>(`teacher/getById/${id}`);
  const teacher: ITeacher = response.data;
  return teacher;
};

export const getEvent = async (id: string): Promise<IEventSmall> => {
  const response = await axiosInstance.get<IEventSmall>(
    `status/event/getById/${id}`
  );
  const event: IEventSmall = response.data;
  console.log("ID:"+id);
  return event;
};


export const submission = async (id: string, file: File) => {
  const formData = new FormData();
  formData.append("files", file);
  const response = await axiosInstance.post<IEventSmall>(
    `event/${id}/uploads`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log("Log:"+ response.data)
  return response.data;
};

export const giveGrade = async (grade:string,teacherId:string, eventId: string)=>{
  console.log("Teacher: "+teacherId+ " Event: "+eventId+ " Grade: "+grade)
  const body = {
    approve_name: grade,
  };
  const response =await axiosInstance.post(`teacher/${teacherId}/event/${eventId}/approve`, body,
  {headers: {
    'Content-Type': 'application/json',
  },})
  return response.data;
}

export const createCategory = async (category:string)=>{
  const body ={
    category_name: category
  }
  const response =await axiosInstance.post(`category/add`, body)
  return response.data;
}

export const createStatus =async (category_id:number,name:string)=>{
  const body={
    status_name:name
  }
  const response = await axiosInstance.post(`category/${category_id}/status/add`, body)
  return response.data;
}

export const downloadFile= async(id:string)=>{
  const response = await axiosInstance.get(`download/${id}`)
  return response.data;
}

export const getSubmissions =async (teacher_id:string, event_id:string)=>{
  const response =await axiosInstance.get(`event/${event_id}/teacher/${teacher_id}`)
  .catch ((error)=>{
    console.log(error)
    throw error;
    
  });
  return response.data;
}

export const createAccount = async(name:string, email:string, password:string, confirmPassword:string, role:string[])=>{
  const body ={
    email:email,
    username:name,
    password:password,
    confirmPassword:confirmPassword,
    role: role
  }
  const response =await axiosInstance.post(`api/auth/register`,body)
  .catch((error)=>{
    throw error;
  })
  return response.data;
}

export const getAllDepartaments = async() =>{
  const response =await axiosInstance.get(`departments`)
  .catch((error)=>{
    console.log("ERROR:" +error)
    throw error;
  })
  return response.data;
}

export const getAllRates = async() =>{
  const response =await axiosInstance.get(`rates`)
  .catch((error)=>{
    console.log("ERROR:"+error);
    throw error;
  })
  return response.data;
}
export const assignUser =async(email:string,category:string, status:string, department:string, rate:string)=>{
  const body ={
    email:email,
    categoryName:category,
    statusName:status,
    departmentName:department,
    rateName:rate
  }
  console.log("BODY:"+body)
  const response =await axiosInstance.post(`assign`,body)
  .catch((error)=>{
    console.log("ERROR:"+error)
    throw error
  })
}

export const deleteSubmission = async(id:string) =>{
await axiosInstance.delete(`submission/delete/${id}`)
.catch((error)=>{
  console.log("ERROR:" +error.status)
  throw error;
})
}
export const addComment = async(id:string)=>{
await axiosInstance.post(`teacher/comment/${id}`)
.catch((error)=>{
  console.log("Error:"+error)
  throw error
})
}
export const deleteComment =async(id:string)=>{
  await axiosInstance.delete(`teacher/comment/${id}/delete`)
  .catch((error)=>{
    console.log("Error:"+error);
    throw error;
  })
}

export const createEvent=async(id:string,name:string,percentage:number, rate:string) =>{
  const body={
    event_name:name,
    event_percentage:percentage,
    event_rates:rate
  }
  await axiosInstance.post(`status/${id}/event/add`,body)
  .catch((error)=>{
    console.log("ERROR:",error);
    throw error
  })
}
export const editEvent =async(id:number,name:string,percentage:number, rate:string)=>{
  const body={
    event_name:name,
    event_percentage:percentage,
    event_rates:rate
  }
  console.log("ID:",id)
  await axiosInstance.put(`event/update/${id}`,body)
  .catch((error)=>{
    console.log("ERROR",error);
    throw error
  })
}

export const getEditEvent =async(id:string)=>{
  console.log("ID:",id)
  const response =await axiosInstance.get(`event/update/${id}`)
  .catch((error)=>{
    console.log("ERROR",error);
    throw error
  })
  return response.data
}
export const deleteEvent = async(id:number) =>{
  console.log("DELETE ID:",id)
  await axiosInstance.delete(`event/delete/${id}`)
  .catch((error)=>{
    console.log("ERROR",error)
    throw error   
})
}
export const getTeacherByEventId=async(id:string)=>{
  const response = await axiosInstance.get(`event/${id}/teachers`)
  .catch((error)=>{
    console.log("ERROR:"+error);
    throw error
  })
  return response.data;
}