import React, { useState, useEffect } from "react";
import { Card, Button, Typography, Select, Form } from "antd";
import CategoryTabs from "../../CategoryTabs/CategoryTabs";
import CategoryModal from "../../CategoryModal/CategoryModal";
import { createCategory, createStatus, deleteCategory, deleteEvent, deleteStatus, downloadFile, getAllCategories, getAllDepartaments, getReportByDep, updateCategory, updateStatus } from "../../../services/userService";
import { Event, ITask } from "../../../common/IEvent";
import { IDepartment } from "../../../common/ITeacher";


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
  const [departments, setDepartaments] =useState<IDepartment[] | undefined>(undefined);
  const [form] =Form.useForm()
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

  useEffect(()=>{
    const fetchDepartamets =async ()=>{
      const alldepartments =await getAllDepartaments();
      setDepartaments(alldepartments);
    } 
    fetchDepartamets();
  },[])
  const onFinishFailed =()=>{

  }
  const onFinish =(values:any)=>{
    handleDownLoad(values);
  }
  const handleDownLoad=async(values:{department:string,category:string,status:string})=>{
    try {
          const { department, category, status } = values;
          console.log(department)
          let url = ``;
      
          if (department && category && status) {
            url = `report/department/${department}/category/${category}/status/${status}/?exportType=PDF`;
          } else if (department && category) {
            url = `report/department/${department}/category/${category}/?exportType=PDF`;
          } else if (category && status) {
            url = `report/category/${category}/status/${status}/?exportType=PDF`;
          } else if (category) {
            url = `report/category/${category}/?exportType=PDF`;
          } else if (department) {
            url = `report/department/${department}/?exportType=PDF`;
          }
          console.log(url);
          const response = await getReportByDep(url);
          const pdfUrl = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
          const link = document.createElement('a');
          link.href = pdfUrl;
          link.setAttribute('download', 'report.pdf');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(pdfUrl);
        } catch (error) {
          console.log(error);
        }
    
  //   try{
  //     const {department} =values;
  //     const file =await getReportByDep(department);
  //     const blob =new Blob([file], {type: 'application/pdf'})
  //     const url =URL.createObjectURL(blob);
  //     const link =document.createElement("a")
  //     link.href =url;
  //     link.download = `time`;
  //     link.click();
  //     URL.revokeObjectURL(url)
  // }
  // catch(error){
  //     console.log(error)
  // }
    // try {
    //   const { department } = values;
    //   const response = await getReportByDep(department);
    //   const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute('download', 'report.pdf');
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    //   window.URL.revokeObjectURL(url);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  // const handleDownLoad = async (values: any) => {
  //   try {
  //     const { department, category, status } = values;
  //     console.log(department)
  //     let url = ``;
  
  //     if (department && category && status) {
  //       url = `report/department/${department}/category/${category}/status/${status}/?exportType=PDF`;
  //     } else if (department && category) {
  //       url = `report/department/${department}/category/${category}/?exportType=PDF`;
  //     } else if (category && status) {
  //       url = `report/category/${category}/status/${status}/?exportType=PDF`;
  //     } else if (category) {
  //       url = `report/category/${category}/?exportType=PDF`;
  //     } else if (department) {
  //       url = `report/department/${department}/?exportType=PDF`;
  //     }
  //     console.log(url);
  //     const response = await getReportByDep(url);
  //     const pdfUrl = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
  //     const link = document.createElement('a');
  //     link.href = pdfUrl;
  //     link.setAttribute('download', 'report.pdf');
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(pdfUrl);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
    <Title level={2}>Events</Title>
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
      <Card style={{marginTop:"1%"}}>
        <Title level={2}>Report</Title>
        <Form
        labelCol={{span:2}}
        wrapperCol={{span:8}}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Departments" name="department">
  <Select placeholder="Select department" options={departments?.map((dep) => ({
    label: dep.department_name,
    value: dep.department_id
  }))} allowClear>
  </Select>
</Form.Item>

<Form.Item label="Category:" name="category">
  <Select placeholder="Select Category" options={categories?.map((cat) => ({
    label: cat.category_name,
    value: cat.category_id,
  }))} allowClear>
  </Select>
</Form.Item>

<Form.Item label="Status:" name="status">
  <Select placeholder="Select Status" options={categories?.map((cat) =>
    cat.statuses?.map((status) => ({
      label: status.status_name,
      value: status.status_id,
    }))
  ).flat()} allowClear>
  </Select>
</Form.Item>
        <Button type="primary" htmlType="submit">Generate report</Button>
        </Form>
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
    </>
    
  );
};

export { EventPage };