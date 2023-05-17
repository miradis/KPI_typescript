import { Button, Card, Form, Input, Layout, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import logo from '../../../assets/img/aitu_logo.png'
import {WindowsOutlined} from '@ant-design/icons'
import { login } from "../../../services/authServies";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { IUser } from "../../../common/IUser";

import { getCurrentUser } from "../../../services/authServies";
const LoginPage = ()=>{
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     const user = await getCurrentUser();
  //     console.log("User : "+user);
  //     // if (user) {
  //     //   setCurrentUser(user);
  //     // }
  //     // else{
  //     //   setCurrentUser(undefined)
  //     // }
  //   };
  
  //   fetchCurrentUser();
  // }, []);
    const navigate = useNavigate();

    const onFinish = (values:any) => {
        // console.log('Success:', values);
        handleLogin(values);
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

    const handleLogin =(formValue: {username:string, password:string})=>{
        const {username, password} =formValue;

        login(username, password)
        .then((response)=>{
            localStorage.setItem("user", JSON.stringify(response.data))
            navigate("/Main"); // Navigate to the profile page
        }).catch((error)=>{
            const resMessage =
            (
                error.response &&
                error.response.data &&
                error.response.data.message) || 
                error.message || error.toString();
                
                if (error.response && error.response.status ===400){
                  setErrorMessage("User doesn't exist. ")
                }
                else{
                  setErrorMessage(resMessage)
                }
        })
        getCurrentUser();
    }
    return(
    <Layout style={{
        display: "flex",
        alignItems:'center',
        justifyContent: "center",
        background:"white"
    }}>
        
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="logo-container" >
            <img src={logo}/>
        </div>
        {errorMessage && (
          <Form.Item wrapperCol={{span: 16}} style={{color:"red", textAlign: "center"}}>
            {errorMessage}
          </Form.Item>
        )}
        <Form.Item
          label="username"
          name="username"
          rules={[{required: true, message: "Please input your username"}]}
          wrapperCol={{ span: 16 }}
        >
          <Input />
        </Form.Item>
        <FormItem
          label="password"
          name="password"
          rules={[{required:true, message:"Please input passwod" }]}
          wrapperCol={{ span: 16 }}
        >
          <Input.Password />
        </FormItem>
        <Space />
        <FormItem >
          <Button  type="primary" htmlType="submit" size='large' style={{width: '150%'}} icon={<WindowsOutlined />}>Sign with corporate E-mail</Button>
        </FormItem>
      </Form>
    </Layout>);
}
export {LoginPage}