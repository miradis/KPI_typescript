import { useState } from "react";
import { Event, ITask } from "../../../common/IEvent";
import { Modal, Radio } from "antd";
import { createCategory, createStatus, getAllCategories } from "../../../services/userService";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const useCategoryActions = () => {
  const [categories, setCategories] = useState<ITask[]>([]);
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [save, setSave] =useState<boolean>(false);
  const [modalAction, setModalAction] = useState<"delete" | "edit" | null>(null);
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
  const handleDeleteRow = (eventId: number) => {
    const updatedCategories = [...categories];
    updatedCategories.forEach((category: ITask) => {
      category.statuses.forEach((status: any) => {
        status.events = status.events.filter((event: Event) => event.event_id !== eventId);
      });
    });
    setSave(true);
    setCategories(updatedCategories);
  };

  const handleEditTab = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "add" && targetKey === "2") {
      setIsModalOpen(true);
      setCurrentCategory(null);
    } else {
      setCurrentCategory(null);
      handleEdit(targetKey, action);
    }
  };

  const handleEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "add") {
      setIsModalOpen(true);
      setModalAction("edit");
    } else if (action === "remove") {
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

  return {
    categories,
    setCategories,
    currentCategory,
    setCurrentCategory,
    isModalOpen,
    setIsModalOpen,
    handleDeleteRow,
    handleEditTab,
    handleEdit,
    handleModalOk,
    handleModalCancel,
    editValue,
    setEditValue,
    modalAction,
    handleCreateCategory,
    handleCurrentCategory,
    handleCreateStatus,
    save,
    setSave,
  };
};

export default useCategoryActions;