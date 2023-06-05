import React, { useState, useEffect } from "react";
import { Card, Button, Typography } from "antd";
import CategoryTabs from "../../CategoryTabs/CategoryTabs";
import CategoryModal from "../../CategoryModal/CategoryModal";
import { createCategory, createStatus, deleteCategory, deleteEvent, deleteStatus, getAllCategories, updateCategory, updateStatus } from "../../../services/userService";
import { Event, ITask } from "../../../common/IEvent";


const { Title } = Typography;
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface EventPageProps {}
export interface ModalAction {
  name:string,
  action:string
}
const EventPage: React.FC<EventPageProps> = () => {
  type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

  const [categories, setCategories] = useState<ITask[]>([]);
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const [currentStatus, setCurrentStatus] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [save, setSave] =useState<boolean>(false);
  const [modalAction, setModalAction] = useState<ModalAction | null>(null);

  //Getting selected category and status from CategoryTable
  const handleCurrentStatus =(status_id:number)=>{
    setCurrentStatus(status_id)
  }
  const handleCurrentCategory =(category_id:number) =>{
    setCurrentCategory(category_id);
} 
//Request to update state after each request
  const handleGetAllEvents=async()=>{
    const allCategories: ITask[] = await getAllCategories();
    setCategories(allCategories);
}
//Status requests 
  const handleCreateStatus = async(statusName:string)=>{
    if (currentCategory){
    await createStatus(currentCategory,statusName);
    handleGetAllEvents()
    }
    else{ console.log("category ID is undefined:"+currentCategory )}
  }
  const handleUpdateStatus = async (newStatus:string)=>{
    if (currentStatus){
      await updateStatus(currentStatus,newStatus);
      handleGetAllEvents()
    }
  }
  const handleDeleteStatus = async()=>{
    if (currentStatus){
      await deleteStatus(currentStatus)
      handleGetAllEvents()
  }
}

  //Category requests
  const handleDeleteCategory =async()=>{  
      if (currentCategory){
      await deleteCategory(currentCategory);
      handleGetAllEvents()
    }
  }

  const handleUpdateCategory =async(newCategory:string)=>{
    if (currentCategory){
    await updateCategory(currentCategory,newCategory)
    handleGetAllEvents()
    }
  }
  const handleCreateCategory = async (categoryName: string) => {
    await createCategory(categoryName);
    handleGetAllEvents()
  };
  //Delete row frim table
  const handleDeleteRow = async(eventId: number) => {
    try{
      await deleteEvent(eventId)
    const updatedCategories = [...categories];
    updatedCategories.forEach((category: ITask) => {
      category.statuses.forEach((status: any) => {
        status.events = status.events.filter((event: Event) => event.event_id !== eventId);
      });
    });
    setSave(true);
    setCategories(updatedCategories);
  }
  catch(error){
    console.log("ERROR:",error)
  }
  };

  //Edit first tab in CategoryTable: category tab
  const handleEditCategory = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "add") {
      setIsModalOpen(true);
      setCurrentCategory(null);
      setModalAction({ name: "category", action: "add" })
    }
    else if(action==="remove" ){
      setIsModalOpen(true)
      setModalAction({ name:"category", action:"remove"})
    }
     else {
      setCurrentCategory(null);
      handleEditStatus(targetKey, action);
    }
  };
  //Edit second tab in CategoryTable:status tab
  const handleEditStatus = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "add") {
      setModalAction({ name: "status", action: "add" })
      setIsModalOpen(true);
    } else if (action === "remove") {
      setIsModalOpen(true);
      setModalAction({ name: "status", action: "remove" })
    }
  };

  const handleModalOk = () => {
    if (modalAction?.action === "delete") {
      
    } else if (modalAction?.action === "edit") {
      // Handle edit action
      // ...
    }

    setIsModalOpen(false);
    setModalAction(null);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories: ITask[] = await getAllCategories();
      setCategories(allCategories);
    };
    fetchCategories();
  }, []);


  return (
    <>
    <Title level={2}>Tasks</Title>
      <Card>
        <CategoryTabs 
        categories={categories} 
        handleDelete={handleDeleteRow} 
        handleEditCategory={handleEditCategory}
        handleCurrentCategory={handleCurrentCategory}
        handleCurrentStatus={handleCurrentStatus}
        handleEditStatus={handleEditStatus}
         />
        {save && <Button type="primary">Save</Button>}
      </Card>
      <CategoryModal
        modalAction= {modalAction}
        currentCategory={currentCategory}
        currentStatus={currentStatus}
        isModalOpen={isModalOpen}
        handleOk={handleModalOk}
        handleCancel={handleModalCancel}
        createStatus={handleCreateStatus}
        updateStatus={handleUpdateStatus}
        deleteStatus ={handleDeleteStatus}
        createCategory={handleCreateCategory}
        updateCategory={handleUpdateCategory}
        deleteCategory ={handleDeleteCategory}

        
      />
      {/* <CategoryModal
      
      /> */}
    </>
  );
};

export { EventPage };