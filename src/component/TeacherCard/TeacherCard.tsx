import { Card,Space,Input, Avatar } from "antd"
import {UserOutlined} from '@ant-design/icons'

const { Meta } = Card;

interface TeacherCardProps {
    name: string;
    department: string;
  }
const TeacherCard =({name,department}:TeacherCardProps)=>{
    return(
          <Meta style={{}}
          
          avatar={<Avatar size={64} icon={<UserOutlined/>}/>}
          title={name}
          description={department}/>
          
    );
}
export {TeacherCard}
