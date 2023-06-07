import { IEvent, ISubmission } from "./IEvent";

export interface IUser {
  email:string,
  user_id:string;
  name:string,
  roles:string[]
} 
export interface ITeacher {
    roles:string[]
    teacher_id: string;
    category_name: string;
    status_name: string;
    kpi_sum:number;
    teacher_events: IEvent[]
    teacher_submissions: ISubmission[];
    teacher_rate:string;
    name: string,
    email: string,
    department_name:string,
  }
  export interface IDepartment {
    department_id:number,
    department_name:string;
    teacher: ITeacher[]
  }

  export interface IRate {
    teacher_rate: string;
  }