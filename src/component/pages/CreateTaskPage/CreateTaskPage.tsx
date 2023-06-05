
import { Button, Card, Form, Input, Typography } from "antd"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { createEvent, editEvent, getEditEvent } from "../../../services/userService"
import { BackButton } from "../../BackButton/BackBUtton"
import { useEffect, useState } from 'react'
import { Event } from "../../../common/IEvent"
const {Title} =Typography;

const CreateTaskPage =() =>{
    const {id} =useParams<string>()
    const [event, setEvent] = useState<Event | undefined>(undefined)
    const navigation =useNavigate()
    const location =useLocation()
    const isCreateLink = location.pathname.includes('create');

    const [form] = Form.useForm();
    useEffect(() => {
        const fetchEvent =async()=>{
            if (id){
            const response =await getEditEvent(id)
            setEvent(response)
            if (form) {
                form.setFieldsValue(response);
              }
            }
        }
        fetchEvent()
    
      }, [form,id]);
    const onFinish = (values: any) => {
        if (isCreateLink) {
            
            handleCreateEvent(values);
        } else {
            
            handleEditEvent(values);
        }
      };
    const onFInishFailed =(errorInfo:any)=>{
        console.log("EVENT:",event)
        console.log('Failed:', errorInfo);
    }
    const handleCreateEvent = async(values: {name:string, percentage:number, rate:string})=>{
        const {name, percentage, rate} =values;
        try {
            if (id){
            await createEvent(id,name, percentage, rate)
            navigation(-1)
        }
    }
    catch(error){
        throw error
    }
    }
    const handleEditEvent =async(values:{name:string, percentage:number, rate:string})=>{
        const {name, percentage, rate} =values;
        try {
            if (event?.event_id){
                await editEvent(event?.event_id,name,percentage,rate)
                navigation(-1)
            }
        }
        catch(error){
            throw error
        }
    } 

    
    const renderActionButton = () => {
        if (isCreateLink) {
          return (
            <Button type="primary" htmlType="submit" style={{ alignSelf: "center" }}>
              Add task
            </Button>
          );
        } else {
          return (
            <Button type="primary" htmlType="submit" style={{ alignSelf: "center" }}>
              Edit task
            </Button>
          );
        }
      };
    return (
        <>
        <BackButton/>
        <Card style={{marginTop:"1%"}}>
        <Form 
        form={form}
        initialValues={{
            name: event?.event_name,
            percentage: event?.event_percentage,
            rate: event?.event_rates
        }}
        onFinish={onFinish}
        onFinishFailed={onFInishFailed}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        style={{display:"flex", flexDirection:"column", maxWidth:"100%"}}>
            <Title level={3} style={{alignSelf:'center'}}>Task</Title>

            <Form.Item label="Name of event:" name="name">
                <Input.TextArea rows={8}/>
            </Form.Item>
            <Form.Item label="Percentage:" name="percentage">
                <Input/>
            </Form.Item>
            <Form.Item label="Rate:" name="rate">
                <Input/>
            </Form.Item>
            {renderActionButton()}
        </Form>
        <Button onClick={()=>{console.log("EVENT:",event)}}>Click</Button>
        </Card>
        </>
    )

}
export {CreateTaskPage}