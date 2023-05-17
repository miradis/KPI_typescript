import {Layout, Menu, MenuItemProps, MenuProps} from 'antd'
import {Link, useLocation} from "react-router-dom"
import React from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined,HomeFilled } from '@ant-design/icons';
import logo from '../../assets/img/aitu-logo_white.png'
import { useState } from 'react';


const { Sider } = Layout;
const img ={
    height: 'auto',
    maxWidth: '100%',
    padding: '8px',
}

const LeftPanel = () => {
  const menuItems =[
    {
      key:"1",
      icon: <HomeFilled/>,
      label: "Main Page",
      link:"/Main"
    },
    {
      key:"2",
      icon: <UserOutlined/>,
      label: "Teachers",
      link: "/Teachers"
    },
    {
      key:"3",
      icon: <VideoCameraOutlined />,
      label: "Events",
      link: "/Events"
    },
    {
      key:"4",
      icon: <UploadOutlined/>,
      label: "LogOut",
      link: "/Login"
    },
  ]
  const [collapsed, setCollapsed] = useState(false);
  const location =useLocation();

  const selectedKey = menuItems.find(item => location.pathname.includes(item.link))?.key;
    return(
    <Sider collapsible collapsed={collapsed} onCollapse={(value)=>setCollapsed(value)} width={"13%"}  >
    <Link to = "/">   
        <React.Fragment>
            <img src={logo} alt='Astana IT University' style={img}/>
        </React.Fragment>
        <Menu 
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        selectedKeys={selectedKey ? [selectedKey] : []}
        style={{
          fontSize:"18px",
          }}
        >
          {menuItems.map(item => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
        </Menu>
    </Link>
    </Sider>
    );
}
export {LeftPanel}