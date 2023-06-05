import { Button, Card, Form, Input, Modal, Space, Table, Typography } from "antd"
import { BackButton } from "../../BackButton/BackBUtton"
import {useState, useEffect} from "react"
import { ITeacher } from "../../../common/ITeacher"
import { deleteUser, getAllTeachers, getAllUsers } from "../../../services/userService"
import { IUser } from "../../../common/ITeacher"
import {DeleteOutlined, HighlightOutlined} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useForm } from "antd/es/form/Form"
const {Title} =Typography
const EditAccountPage =()=>{

    const [users,setUsers] =useState<IUser[] | undefined>(undefined)
    const [isLoading, setIsLoading] =useState(false);
    const [isOpen, setIsOpen] =useState(false);
    // const {form} =Form.useForm()
    const navigation =useNavigate()
    useEffect(()=>{
        const fetchTeachers = async() =>{
            setIsLoading(true)
            const response = await getAllUsers();
            setUsers(response)
          }
          fetchTeachers()
          setIsLoading(false)
    })
    const getUserRoles = (roles: string[]) => {
        const userRoles: string[] = [];
    
        if (roles?.includes("ROLE_ADMIN")) {
          userRoles.push("Admin");
        }
        if (roles?.includes("ROLE_TEACHER")) {
          userRoles.push("Teacher");
        }
        if (roles?.includes("ROLE_OBSERVER")) {
          userRoles.push("Observer");
        }
        return userRoles;
      };
      const handleDeleteAcc =async(id:string)=>{
        await deleteUser(id).then(()=>{
          setUsers((prevUsers) => prevUsers?.filter((user) => user.user_id !== id));
        })
      }
      const handleEditAcc= (id:string) =>{
        navigation(`/`)
      }
      const onFinishForm =(values:any)=>{

      }
    const column=[
        {
            title: "Email",
            dataIndex: "email",
            key: "userEmail",
        },
        {
            title:"Name",
            dataIndex:"name",
            key:"user_name"
        },
        {
            title:"Role",
            dataIndex:"roles",
            key:"role",
            render: (roles: string[]) =>
            <span>
            {getUserRoles(roles).map((role) => (
              <span key={role}>{role} </span>
            ))}
          </span>         
        },
        {title:"Actions",
        dataIndex:"",
        key:"action",
        render: (_: string, record: any) => {
            return(
            <Space size="small">
              <Button size="small" type="link" onClick={() => handleDeleteAcc(record.user_id)}>
                <DeleteOutlined />
              </Button>
              <Button size="small" type="link" onClick={() => handleEditAcc(record)}>
                <HighlightOutlined />
              </Button>
            </Space>
          );
        }
        }
    ]
    return(
        <>
        <BackButton/>
        <Card>
        <Title level={2}>Edit page</Title>

        <Table columns={column} dataSource={users}></Table>
        </Card>

        <Modal title="Edit account"
        open={isOpen}
        onOk={onFinishForm}>
          <Form >
          <Form.Item label="">
            <Input/>
          </Form.Item>
          </Form>

        </Modal>
        </>
    )
}
export {EditAccountPage}