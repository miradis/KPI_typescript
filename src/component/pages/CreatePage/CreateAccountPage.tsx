import { Button, Card, Row, Typography, Col, Form, Input, Select, SelectProps } from "antd";
import {SaveOutlined,LeftOutlined} from "@ant-design/icons"
import { useEffect, useState } from "react";
import { ITask, Status } from "../../../common/IEvent";
import { createAccount, getAllCategories } from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../BackButton/BackBUtton";
const {Title} =Typography
const CreateAccountPage = ()=>{
    const options = [
        {
            label:"Teacher",
            value:"Teacher"
        },
        {
            label:"Admin",
            value:"Admin"
        },
        {
            label:"Observer",
            value:"Observer"
        }
    ];
    const [categories, setCategories] =useState<ITask[] | undefined>(undefined)
    const [statuses, setStatuses] = useState<Status[] | undefined>(undefined)
    
    const navigator =useNavigate()

    useEffect(()=>{
        const fetchCategroies =async() =>{
            const getCategories = await getAllCategories();
            setCategories(getCategories)
        }
        fetchCategroies()

    },[])
      const onFinish = (values:any) => {
        handleCreate(values);
      };

      const handleCreate = async (values: { name: string, email: string, password: string, confirmPassword: string, role: string[] }) => {
        const { name, email, password, confirmPassword, role } = values;
        try {
          await createAccount(name, email, password, confirmPassword, role);
          navigator(-1);
        } catch (error) {
          console.log("Error: " + error);
          throw error;
        }
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      
    return(
        <>
        <BackButton/>
        <Card style={{marginTop:"1%"}}>
            <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{display:"flex", flexDirection:"column", maxWidth: "100%"}}>
              <Title level={2} style={{alignSelf:"center"}}>User</Title>
              <Form.Item label="Full Name:" name="name">
              <Input />
              </Form.Item>
            
              <Form.Item label="Email:" name="email">
                <Input />
                </Form.Item>
            
            
              <Form.Item label="Role:" name="role">
                <Select 
                mode="multiple"
                
                options={options}/>
                </Form.Item>
            
          
          
                <Form.Item label="Password" name="password">
                <Input.Password />
                </Form.Item>
           
              <Form.Item label="ConfirmPassword:" name="confirmPassword">
                <Input.Password/>
                </Form.Item>
            
          <Button style={{marginTop:"20px" ,alignSelf:'center'}} type="primary" icon={<SaveOutlined/>} htmlType="submit">Save changes</Button>
          
            </Form>
        </Card>
        </>
    );

}
export {CreateAccountPage}