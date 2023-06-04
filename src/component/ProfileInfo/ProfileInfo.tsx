import { Space, Typography, Divider,Tag} from "antd"
import { ITeacher } from "../../common/ITeacher";
import {MailOutlined} from '@ant-design/icons'

const {Text, Title} =Typography;
interface ProfileProps {
    currentUser: ITeacher | undefined;
  }
const ProfileInfo =({currentUser}: ProfileProps)=>{
    return(
    <Space direction='vertical'
        style={{width:"100%"}} >
        <Title level={1}>{currentUser?.name}</Title>
        <Title level={4}>{currentUser?.status_name}</Title>
        <Space direction='vertical'></Space>
        <Title type='secondary' level={3} >{currentUser?.department_name}</Title>
        
        <Divider/>
        <Space wrap>
            <Title level={4}>Ученая степень</Title>
            <Title level={4}>Ученое звание</Title>
        </Space>

        <Divider/>
    
            <Title level={4}>Контактные данные</Title>
            <Tag style={{fontSize:"18px"}} icon={<MailOutlined/>} color='green'>Почта: <b>{currentUser?.email}</b></Tag>
        
        <Divider/>

            <Title level={4}>Scientific interest</Title>
            <Text>No interest</Text>
        
            <Title level={4}>Teaching disciplins</Title>
            <Text>No courses</Text>
        
        <Divider/>
        </Space>)
}

export {ProfileInfo}