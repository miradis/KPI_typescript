import React from "react";
import { Card, Tabs, Table } from "antd";
import { useState, useEffect } from "react";
import { getAllCategories } from "../../../services/userService";
import { ITask } from "../../../common/ITask";
interface Event {
  eventId:number,
  eventName: string,
  eventStatus:string,
  eventCategory:string
}

interface EventPageProps {}
const column=[
  {
    title: "Id",
    dataIndex: "key",
    key:"Id"
  },
  {
    title: "Task",
    dataIndex: "eventName",
    key:"Task"
  },
  {
    title:"Task status",
    dataIndex: "eventStatus",
    key: "TaskStatus"
  },
  {
    title: "TaskCategory",
    dataIndex: "eventCategory",
    key: "TaskCategory"
  }
]
const EventPage: React.FC<EventPageProps> = () => {

  const [categories, setCategories]= useState<ITask[]>([])
  
  useEffect(()=>{
    const fetchCategories= async ()=>{ 
      const allCategories = await getAllCategories();
    setCategories(allCategories)
    };
    fetchCategories();
  },[])

  const renderTable = (status: any) =>{
    const data = status.events.map((events:Event)=>({
      key: events.eventId,
      eventName: events.eventName,
      eventStatus: events.eventStatus,
      eventCategory:events.eventCategory
    }));
    console.log("Data: "+data)
    data.map((da:any)=>(
      console.log("Key: "+da.key),
      console.log("Name: "+da.eventName),
      console.log("Status: "+da.eventStatus),
      console.log("category: "+da.eventCategory)
    ))
    return <Table columns={column} dataSource={data} />
  }
  return (
    <Card>
      <Tabs size="large">
        {categories.map((category: ITask)=>(
          <Tabs.TabPane key={category.categoryId} tab = {category.categoryName}>
            <Tabs>
              {category.statuses.map((status: any)=>
              (
                <Tabs.TabPane 
                key={status.statusId} 
                tab={status.statusName}>
                {renderTable(status)}
                </Tabs.TabPane>
              ))
              }
            </Tabs>
          </Tabs.TabPane>
        ))
        }
        </Tabs> 
    </Card>
  );
};

export { EventPage};