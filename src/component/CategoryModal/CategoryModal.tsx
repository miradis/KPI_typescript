import React from "react";
import { Modal, Form, Input } from "antd";

interface CategoryModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  createCategory: (categoryName: string) => Promise<void>;
  createStatus: (category_id:number, statusName: string) =>Promise<void>
  currentCategory: number | null;
  editValue: string,
  setEditValue:(value:string)=>void;
  modalAction: string | null
  // modalAction: "delete" | "edit";
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  createCategory,
  createStatus,
  currentCategory,
  editValue,
  modalAction,
  setEditValue,
}) => {
  const [form] = Form.useForm();
  const onFinish = async () => {
    
    try {
      await form.validateFields();
      const { categoryName,statusName} = form.getFieldsValue();
      if (currentCategory){
        await createStatus(currentCategory, statusName);
      }
      else{
      await createCategory(categoryName);
      }
      handleOk();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Modal
    title={currentCategory ? "Status" : "Category"}
      open={isModalOpen}
      onOk={onFinish}
      onCancel={handleCancel}
    >
       <Form form={form}>
        {currentCategory ? (
          <Form.Item label="Status Name" name="statusName">
            <Input />
          </Form.Item>
        ) : (
          // modalAction ? ()
          <Form.Item label="Insert name" name="categoryName">
            <Input />
          </Form.Item>
        )}
      </Form>

    </Modal>
  );
};

export default CategoryModal;