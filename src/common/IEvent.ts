
export interface IEvent {
    submission_status:boolean;
    event_rate:string;
    modify_date: Date;
    comment:string,
    event_id: string;
    event_name: string;
    event_percentage:number;
    approve_name: string;
    teacher_name:string,
    department_name:string;
    teacher_id:string,
  }
  export interface IEventSmall {
    event_id: number;
    event_name: string;
    event_percentage:number;
    // Other event properties
  }

  export interface Event {
    event_id: number;
    event_name: string;
    event_percentage: number;
    event_rates:string;
  }
  
export  interface Status {
    status_id: number;
    status_name: string;
    events: Event[];
    category_name:string;
  }
  
export  interface ITask {
    category_id: number;
    category_name: string;
    statuses: Status[];
    
  }
export interface ISubmission{
    file_name:string;
    file_type:string,
    submission_id:string;
    event_id:number;
    size:number;
}
export interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  link: string;
  role?: string;
  children?: MenuItem[];
}