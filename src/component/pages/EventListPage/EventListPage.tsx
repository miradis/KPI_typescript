import React, { useState, useEffect } from "react";
import { Card, Button, Typography } from "antd";
import CategoryTabs from "../../CategoryTabs/CategoryTabs";
import CategoryModal from "../../CategoryModal/CategoryModal";
import { createCategory, createStatus, deleteEvent, getAllCategories } from "../../../services/userService";
import { Event, ITask } from "../../../common/IEvent";
import useCategoryActions from "./useCategoryActions";


const { Title } = Typography;
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface EventPageProps {}

const EventPage: React.FC<EventPageProps> = () => {
  type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

  const [categories, setCategories] = useState<ITask[]>([]);
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [save, setSave] =useState<boolean>(false);
  const [modalAction, setModalAction] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleCreateStatus = async(currentCategory:number,statusName:string)=>{
    if (currentCategory){
    await createStatus(currentCategory,statusName);
    const allCategories: ITask[] = await getAllCategories();
    setCategories(allCategories);
    }
    else{ console.log("category ID is undefined:"+currentCategory )}
  }
  const handleCurrentCategory =(category_id:number) =>{
    setCurrentCategory(category_id);
} 

  const handleCreateCategory = async (categoryName: string) => {
    await createCategory(categoryName);
    const allCategories: ITask[] = await getAllCategories();
    setCategories(allCategories);
  };
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

  const handleEditTab = (targetKey: TargetKey, action: "add" | "remove") => {
    console.log("TARGET KEY:",targetKey);
    if (action === "add" && targetKey === "2") {
      console.log("4TARGET KEY:",targetKey);
      setIsModalOpen(true);
      setCurrentCategory(null);
    } else {
      console.log("5TARGET KEY:",targetKey);
      setCurrentCategory(null);
      handleEdit(targetKey, action);
    }
  };

  const handleEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    console.log("2TARGET KEY:", targetKey)
    if (action === "add") {
      console.log("3TARGET KEY:",targetKey);
      setIsModalOpen(true);
      setModalAction("edit");
    } else if (action === "remove") {
      console.log("6TARGET KEY:",targetKey);
      setIsModalOpen(true);
      setModalAction("delete");
    }
  };

  const handleModalOk = () => {
    if (modalAction === "delete") {
      
    } else if (modalAction === "edit") {
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
        handleEditTab={handleEditTab}
        handleCurrentCategory={handleCurrentCategory}
        handleEdit={handleEdit}
         />
        {save && <Button type="primary">Save</Button>}
      </Card>
      <CategoryModal
        modalAction= {modalAction}
        currentCategory={currentCategory}
        isModalOpen={isModalOpen}
        handleOk={handleModalOk}
        handleCancel={handleModalCancel}
        createStatus={handleCreateStatus}
        createCategory={handleCreateCategory}
        editValue={editValue}
        setEditValue={setEditValue}
      />
      {/* <CategoryModal
      
      /> */}
    </>
  );
};

export { EventPage };