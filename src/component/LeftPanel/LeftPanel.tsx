import {Layout, Menu, MenuItemProps, MenuProps} from 'antd'
import {Link, useLocation, useNavigate} from "react-router-dom"
import React, { useEffect } from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined,HomeFilled } from '@ant-design/icons';
import logo from '../../assets/img/aitu-logo_white.png'
import { useState } from 'react';
import { getRole, logOut } from '../../services/authServies';
import { MenuItem } from '../../common/IEvent';
import { render } from '@testing-library/react';



const { Sider } = Layout;
const { SubMenu } = Menu;
const img ={
    height: 'auto',
    maxWidth: '100%',
    padding: '8px',
}
const LeftPanel = () => {

  const menuItems:MenuItem[] =[
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
      label: "KPI",
      link: "/Events",
      role: "ROLE_ADMIN",
      children: [
        {
          key: '4',
          icon: <VideoCameraOutlined />,
          label: 'Events',
          link: '/events/tasks',
        },
        {
          key: '6',
          icon: <VideoCameraOutlined />,
          label: 'Assigning',
          link: '/events/assigning',
        },
      ],
      
    },
    {
      key:"7",
      icon: <UploadOutlined/>,
      label: "LogOut",
      link: "/"
    },
  ]
  const [collapsed, setCollapsed] = useState(false);
  const navigation =useNavigate()
  const location =useLocation();
  const [userRole, setUserRole] =useState<string[]>([])
  const [selectedSubMenuKey, setSelectedSubMenuKey] = useState<string | null>(null);
  useEffect(()=>{
  const getUserRole = async ()=>{
    const role = await getRole();
    setUserRole(role.roles)
  }
  getUserRole()
},[])


  const selectedKey = menuItems.find((item) => location.pathname.includes(item.link))?.key;
  const handleLogout = () => {
    logOut();
    navigation('/');
  };
  const filteredMenuItems = menuItems.filter((item) => {
    if (item.role && userRole?.includes(item.role)) {
      return true; // Show the menu item if user role matches the required role
    }
    return !item.role; // Show the menu item if no role is specified
  });

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.label} onTitleClick={() => setSelectedSubMenuKey(item.key)}>
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.key} icon={item.icon} onClick={item.link === "login" ? handleLogout : undefined}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        );
      }
    });
  };
    return(
    <Sider collapsible collapsed={collapsed} onCollapse={(value)=>setCollapsed(value)} width={"13%"}  >
    <Link to = "/Main">   
        <React.Fragment>
            <img src={logo} alt='Astana IT University' style={img}/>
        </React.Fragment>
        <Menu 
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        selectedKeys={selectedKey ? [selectedKey] : []}
        openKeys={selectedSubMenuKey ? [selectedSubMenuKey] : []}
        onOpenChange={(keys) => setSelectedSubMenuKey(keys.length > 0 ? keys[0].toString() : null)}
        style={{
          fontSize:"18px",
          }}
        >
          {renderMenuItems(filteredMenuItems)}
        </Menu>
    </Link>
    </Sider>
    );
}
export {LeftPanel}