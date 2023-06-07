import { Button, Card, Form, Input, Select, Space, Typography } from "antd"
import {useEffect, useState} from'react'
import { IDepartment, IRate, ITeacher, IUser } from "../../../common/ITeacher"
import { getAllCategories, getAllDepartaments, getAllRates, getAllUsers, getTeacher, getTeacherById, getUserById } from "../../../services/userService"
import { useParams } from "react-router-dom"
import { ITask, Status } from "../../../common/IEvent"
import { BackButton } from "../../BackButton/BackBUtton"
import { useForm } from "antd/es/form/Form"

const {Title} =Typography
const EditPage =() =>{
    const [statuses, setStatuses] = useState<Status[] | undefined>(undefined)
    const [categories, setCategories] =useState<ITask[] | undefined>(undefined)
    const [user,setUser] =useState<IUser | undefined>(undefined)
    const [roleOptions, setRoleOptions] = useState<string[]>([]);
    const [teacher, setTeachers] =useState<ITeacher | undefined>(undefined)
    const [departments, setDepartments] =useState<IDepartment[] | undefined>(undefined)
    const [rates, setRates] =useState<IRate[] | undefined>(undefined)
    const [selectedEmail, setSelectedEmail] =useState<ITeacher | undefined>(undefined)
    const {id,status} =useParams()
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [form] =Form.useForm()
    const options = [
      {
          label:"Teacher",
          value:"Teacher"
      },
      {
          label:"Admin",
          value:"Admin"
      },
      {
          label:"Observer",
          value:"Observer"
      }
  ];
    useEffect(()=>{
        const fetchCategroies =async() =>{
            const getCategories = await getAllCategories();
            setCategories(getCategories)
        }
        fetchCategroies()
    },[])
    useEffect(()=>{
      const fetchDepartamets = async ()=>{
        const alldepartments =await getAllDepartaments()
        setDepartments(alldepartments)
      }
      fetchDepartamets()
    },[])

    useEffect(()=>{
      const fetchRate =async()=>{
        const allRates = await getAllRates();
        setRates(allRates);
      }
      fetchRate();
    },[])
    useEffect(() => {
        if (selectedCategory && categories) {
          const selectedCategoryObj = categories.find(
            (cat) => cat.category_name === selectedCategory
          );
          if (selectedCategoryObj) {
            setStatuses(selectedCategoryObj.statuses);
            setSelectedStatus(selectedCategoryObj.statuses[0].status_name);
          }
        }
      }, [selectedCategory, categories]);
    useEffect(()=>{
        if (status==="user"){
        const fetchUsers = async () => {
            if (id){
            const response = await getUserById(id);
            setUser(response);
            // Extract distinct user roles
            const distinctRoles: Set<string> = new Set();
            response?.forEach((user:any) => {
              user.roles?.forEach((role:any) => {
                distinctRoles.add(role);
              });
            });
            setRoleOptions(Array.from(distinctRoles));
          }};
          fetchUsers()
        }
        else if (status==="teacher"){

            const fetchTeacherByID =async()=>{
                if (id){
                const res =await getTeacherById(id)
                setTeachers(res);
                }
            }
            fetchTeacherByID()
        }
    },[])

    const onFinish =(values:any)=>{
        // handleEdit(values)
    }
    // const handleEdit()

    const onFinishFailed=(errorInfo: any)=>{
        console.log('Failed:', errorInfo);
    }
    const handleCategoryChange =(val:string) =>{
        setSelectedCategory(val);
    }
    const handleStatusChange =(val:string) =>{
        setSelectedStatus(val)
    }
    return <>
    <BackButton/>
    <Title level={3}>Edit {status}</Title>
    <Card 
    >
    <Form
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 8 }}
    form={form}
    initialValues={
        status === "teacher"
          ? {
              name: teacher?.name,
              category: teacher?.category_name,
              status: teacher?.status_name,
              department: teacher?.department_name,
              rate: teacher?.teacher_rate,
            }
          : status === "user"
          ? {
              name: "",
              email: "",
            }
          : {}
      }
     style={{ maxWidth: "100%", display:"flex", flexDirection:"column",}}>
        {status==="user" && <>
        <Form.Item label="name" name="name">
            <Input/>
        </Form.Item>
        <Form.Item label="email" name="email">
            <Input/>
        </Form.Item>
        <Form.Item label="Select role" name="role">
        <Select 
            placeholder="Select exist role"
            options={options}
            />
        </Form.Item></>}
        {status==="teacher" && <>
        <Form.Item label="Name:" name={"name"}>
          <Input/>
        </Form.Item>

        <Form.Item label="Email:" name={"email"}>
        <Input disabled value={selectedEmail?.email} />
        </Form.Item>
        <Form.Item label="Category" name="category">
            <Select virtual
            placeholder="Select Category"
            style={{width:"100%"}}
           defaultValue={categories?.[0]?.category_name}
           onChange={handleCategoryChange}
           options={categories?.map((cat) => ({
             label: cat.category_name,
             value: cat.category_name,
           }))}
            ></Select>
        </Form.Item>
        <Form.Item label="Status" name="status">
            <Select virtual
            placeholder="Select Status"
            style={{ width: "100%" }}
            defaultValue={selectedStatus}
            onChange={handleStatusChange}
            options={statuses?.map((stat) => (
              {
              label: stat?.status_name,
              value: stat?.status_name,
            }))}
            ></Select>
        </Form.Item>

        <Form.Item label="Departament" name="department">
            <Select style={{ width: "100%" }}
            options={departments?.map((dep)=>({
              label:dep.department_name,
              value:dep.department_name}))}></Select>
        </Form.Item>
        <Form.Item label="Rate" name="rate">
            <Select style={{ width: "100%" }}
            options={rates?.map((rat) => ({
              label: rat.teacher_rate,
              value: rat.teacher_rate,
            }))}
              ></Select>
        </Form.Item>
        </>}
        <Button type="primary" style={{ width:"55%", alignSelf:"center"}} htmlType="submit">Assign</Button>
    </Form>
    </Card>
    </>
}

export {EditPage}