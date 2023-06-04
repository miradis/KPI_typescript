import { Button, Card, Form, Input, Layout, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import logo from '../../../assets/img/aitu_logo.png'
import {WindowsOutlined} from '@ant-design/icons'
import { login } from "../../../services/authServies";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";




type SizeType = Parameters<typeof Form>[0]['size'];
const LoginPage = ()=>{
  const [errorMessage, setErrorMessage] = useState("");
  
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  }
    const navigate = useNavigate();

    const onFinish = (values:any) => {
        handleLogin(values);
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

    const handleLogin =(formValue: {username:string, password:string})=>{
        const {username, password} =formValue;
        
        login(username, password)
        .then((response)=>{
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
        style={{ maxWidth: 800, display:"flex", flexDirection:"column"}}
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="logo-container">
            <img src={logo} style={{width:"300px"}}/>
        </div>
        {errorMessage && (
          <Form.Item wrapperCol={{span: 16}} style={{color:"red", textAlign: "center"}}>
            {errorMessage}
          </Form.Item>
        )}
        <Form.Item
          label="Username:"
          name="username"
          rules={[{required: true, message: "Please input your username"}]}
          wrapperCol={{ span: 16 }}
        >
          <Input />
        </Form.Item>
        <FormItem
          label="Password:"
          name="password"
          rules={[{required:true, message:"Please input passwod" }]}
          wrapperCol={{ span: 16 }}
        >
          <Input.Password />
        </FormItem>
          <Button  type="primary" htmlType="submit" size='large'  icon={<WindowsOutlined />}>Sign with corporate E-mail</Button>
        <Space />
      </Form>
    </Layout>);
}
export {LoginPage}