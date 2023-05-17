import { Typography,Avatar, Card, Row, Col, Descriptions, Space, Button, Divider, Tag, Tabs, Table,} from 'antd'
import {UserOutlined, LeftOutlined,MailOutlined} from '@ant-design/icons'
import ProfileTabs from '../../ProfileTabs';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../../services/authServies';
import { IUser } from '../../../common/IUser';

const data = [
    {
        title: "Статья опубликованная визданиях, входящих в Q4 по данным Journal Citation Report",
        observer: "Aigerim",
        status: "Accepted"
    },
    {
        title: "Научно-исследовательская работа",
        observer: "Didar",
        status: "Rejected"
    },
    {
        title: "Организационно-методическая деятельность",
        observer: "Dina",
        status: "Accepted"
    },
    {
        title: "Средний процент независимиого анкетирования ",
        observer: "Samat",
        status: "Left"
    },
  ];
const {Title, Text} =Typography;
const columns = [
    {
        title: 'Event ID',
        dataIndex: 'eventId',
        key: 'eventId',
    },
    {
        title: 'Event Name',
        dataIndex: 'eventName',
        key: 'eventName',
    },
    {
        title: 'Event Status',
        dataIndex: 'eventStatus',
        key: 'eventStatus',
    },
    {
        title: 'Event Category',
        dataIndex: 'eventCategory',
        key: 'eventCategory',
    },
];
const ProfilePage =()=>{
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
    
    useEffect(() => {
        const fetchCurrentUser = async () => {
          const user = await getCurrentUser();
          setCurrentUser(user || undefined)
        };
      
        fetchCurrentUser();
      }, []);
    const navigate =useNavigate();
    function handleButton(){
        navigate(-1);
    }

    return(
       <>
       
        <Button size='large' icon={<LeftOutlined />} onClick={handleButton}>Back</Button>
        
        <Row align='middle' justify='center'>
        <Space direction='vertical' size='large'>
        <Avatar size={384}
        icon={<UserOutlined/>}>
        </Avatar>
        </Space>
        </Row>
        {/* <Row> */}
        <Space direction='vertical'
        style={{width:"100%"}} >
        <Title level={1}>{currentUser?.userName}</Title>
        <Title level={4}>{currentUser?.statusName}</Title>
        <Space direction='vertical'></Space>
        <Title type='secondary' level={3} > No depatament</Title>
        
        <Divider/>
        <Space wrap>
            <Title level={4}>Ученая степень</Title>
            <Title level={4}>Ученое звание</Title>
        </Space>

        <Divider/>
    
            <Title level={4}>Контактные данные</Title>
            <Tag style={{fontSize:"18px"}} icon={<MailOutlined/>} color='green'>Почта: <b>{currentUser?.userEmail}</b></Tag>
        
        <Divider/>

    
            <Title level={4}>Scientific interest</Title>
            <Text>No interest</Text>
        

        
            <Title level={4}>Teaching disciplins</Title>
            <Text>No courses</Text>
        
        <Divider/>
        
        <Tabs size='large'
        type="card"
        items={new Array(3).fill(null).map((_, i) => {
      const id = String(i + 1);
      return {
        label: `KPI`,
        key: id,
        children: <Table columns={columns} dataSource={currentUser?.eventsByStatus}></Table>,
      };
    })}
  />
        
        </Space>
        {/* </Row> */}

        </>
    );
}
export {ProfilePage}
       