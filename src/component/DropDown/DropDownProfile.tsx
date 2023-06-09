import React, { useEffect, } from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {
    UserOutlined,
     LogoutOutlined, 
     DownOutlined} from '@ant-design/icons'
import {Dropdown, Space, Avatar, Typography} from 'antd';
import { getCurrentUser, getUser, logOut } from '../../services/authServies';
import {useNavigate} from "react-router-dom"


const { Text } = Typography;
function DropDownProfile(){

    const navigate =useNavigate()
    const [userEmail, setUserEmail] =useState()
    useEffect(()=>{
        // const user = async ()=>{
        //     getUser();
        // setUserEmail(user.userEmail)}
        // const fetchCurrentUser= async ()=>{
        //     const user = await getCurrentUser();
        //     setUserEmail(user.userEmail);
        // }
        // fetchCurrentUser();   
      }, []);
    //UseState для выпадающего меню
    const [dropDownVisible, setDropDownVisible] =useState(false)

    const handleDropVisibleChange = (visible:boolean )=>{
        setDropDownVisible(visible)
    }

    const items=[
        {
            key: "1",
            label: (<Link to={"/Profile"} style={{textDecoration:"none"}}> Profile </Link>),
            icon: <UserOutlined />, 
        },
        {
            key:"2",
            label: <Link to ={"/"} onClick={logOut}>LogOut</Link>,
            icon:<LogoutOutlined />,
        }
        ]
    return (
        <Dropdown
        menu={{items}}
        open={dropDownVisible}
        onOpenChange={handleDropVisibleChange}
        trigger={['click']}
        getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}>
            <a onClick={(e) =>e.preventDefault()}>
                <Space>
                    <Avatar style={{
                        background: '#87d068',
                    }}
                    icon={<UserOutlined/>}
                    size={36}/>
                    <Space>
                    <Text style={{
                        color: "White",
                        fontSize: "18px",
                        // padding:" 0px 5px 10px 10px",
                        margin: "10px 10px 10px 10px"
                    }}>{userEmail}</Text>
                        <DownOutlined style={{background: "69b1ff"}}/>
                    </Space>
                </Space>
            </a>
        </Dropdown>
    );
}

export {DropDownProfile}