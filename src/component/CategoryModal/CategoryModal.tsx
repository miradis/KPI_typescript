import React, {useState} from "react";
import { Modal, Form, Input, Radio, RadioChangeEvent } from "antd";
import { ModalAction } from "../pages/EventListPage/EventListPage";
import { deleteCategory, updateCategory, updateStatus } from "../../services/userService";

interface CategoryModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  currentStatus: number | null
  createCategory: (categoryName: string) => Promise<void>;
  updateCategory:(newCategory:string)=>Promise<void>
  deleteCategory:()=>Promise<void>
  createStatus: (statusName: string) =>Promise<void>
  updateStatus:(newStatus:string)=>Promise<void>
  deleteStatus:()=>Promise<void>
  currentCategory: number | null;
  modalAction: ModalAction | null
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  createCategory,
  updateCategory,
  deleteCategory,
  createStatus,
  deleteStatus,
  updateStatus,
  currentCategory,
  currentStatus,
  modalAction
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const [form] = Form.useForm();
  const onFinish = async () => {
    
  
    try {
      await form.validateFields();
      const { attribute, editName} = form.getFieldsValue();
      if (modalAction?.name ==="category"){
        if (modalAction?.action==="add" ){
          await createCategory(attribute)
        }
        else if (modalAction?.action==="remove" && selectedValue==="edit" &&selectedValue !== undefined){
          await updateCategory(editName) 
        }
        else if(modalAction?.action==="remove"  && selectedValue==="remove"&&selectedValue !== undefined){
          await deleteCategory()
        }
      }
      else if (modalAction?.name==="status"){
        if (modalAction.action==="add"){
          await createStatus(attribute)
        }
        else if( modalAction?.action==="remove" && selectedValue==="edit" &&selectedValue !== undefined){
          await updateStatus(editName)
        }
        else if(modalAction?.action==="remove" && selectedValue==="remove"){
          await deleteStatus()
        }
      }
      handleOk();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const renderAddModal =(label:string, name:string)=>{
    return (<Form.Item label={label} name={name}>
    <Input />
  </Form.Item>)
  }
  const renderEditModal =(label:string)=>{

    const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedValue(e.target.value);
  };
    return (<>
    <Radio.Group size="small" onChange={handleRadioChange} value={selectedValue}>
    <Radio value="edit">Edit</Radio>
        <Radio value="remove">Remove</Radio>
    </Radio.Group>

    {selectedValue === "edit" && (
        <Form.Item label={label} name="editName" style={{padding:"20px 10px 10px 10px"}}>
          <Input />
        </Form.Item>
      )}
    </>)
  }
  return (
    <Modal
    title={modalAction?.name==="status" ? "Status" : "Category"}
      open={isModalOpen}
      onOk={onFinish}
      onCancel={handleCancel}
    >
       <Form form={form}>
        {modalAction?.name==="category" ? (
          modalAction?.action==="add" ? (
            renderAddModal("Insert name", "attribute")
          ):(
            renderEditModal("Change category")
          )
        ):(
          modalAction?.action==="add" ?(
            renderAddModal("Insert name", "attribute")
          ):(
           renderEditModal("Change status")
          )
        )}
      </Form>

    </Modal>
  );
};

export default CategoryModal;