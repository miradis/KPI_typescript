import { Button, Card, Form, Input, Select, Space, Typography } from "antd"
import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import { assignUser, getAllCategories, getAllDepartaments, getAllRates, getAllTeachers, getAllUsers } from "../../../services/userService"
import { ITask, Status } from "../../../common/IEvent"
import { IDepartment, IRate, ITeacher, IUser } from "../../../common/ITeacher"
import { SizeType } from "antd/es/config-provider/SizeContext"


const {Title} =Typography
const AssignPage =() =>{

    const navigation =useNavigate()
    const [categories, setCategories] =useState<ITask[] | undefined>(undefined)
    const [statuses, setStatuses] = useState<Status[] | undefined>(undefined)
    const [teachers, setTeachers] =useState<ITeacher[] | undefined>(undefined)
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [selectedEmail, setSelectedEmail] =useState<ITeacher | undefined>(undefined)
    const [departments, setDepartments] =useState<IDepartment[] | undefined>(undefined)
    const [rates, setRates] =useState<IRate[] | undefined>(undefined)

    useEffect(()=>{
        const fetchCategroies =async() =>{
            const getCategories = await getAllCategories();
            setCategories(getCategories)
        }
        fetchCategroies()

    },[])

    useEffect(()=>{
       const fetchTeachers= async()=>{
        const getTeachers =await getAllUsers();
        setTeachers(getTeachers)
       }
       fetchTeachers()
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
    const handleToCreate=()=>{
        navigation("/events/assigning/createPage")
    }
    const handleToEdit =()=>{
      navigation('/events/assigning/editPage')
    }
    const handleCategoryChange =(val:string) =>{
        setSelectedCategory(val);
    }
    const handleStatusChange =(val:string) =>{
        setSelectedStatus(val)
    }
    const handleTeacherChange = (val: string) => {
      const selectedTeacherObj = teachers?.find((teacher) => teacher.name === val);
      setSelectedEmail(selectedTeacherObj);
  
    };

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


      const onFinish = (values:any) => {
        handleAssign(values);
      };
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      const handleAssign= async(values: { category:string, status:string, department:string,rate:string})=>{
        
        const {category,status,department,rate} =values

        try{
          if (selectedEmail && selectedEmail.email) {
            await assignUser(selectedEmail.email, category, status, department, rate);
            navigation(-1);
          }
        }
        catch(error){
          console.log("Error:"+error)
        }

      }
    return(
    <>
    <Title level={3}>Assign Task</Title>
    <Card 
    >
    <Form
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 8 }}
     style={{ maxWidth: "100%", display:"flex", flexDirection:"column",}}>

        <Form.Item label="Select users">
          <Select 
          style={{width:"100%"}}
          onChange={handleTeacherChange}
          options={teachers?.map((user)=>({
            label:user.name,
            value:user.name}))}/>
        </Form.Item>

        <Form.Item label="Email:">
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
        <Button type="primary" style={{ width:"55%", alignSelf:"center"}} htmlType="submit">Assign</Button>
    </Form>
    <Space size={'large'}>
    <Button type="primary" onClick={handleToCreate}>
    Add account
    </Button>
    <Button type="dashed" onClick={handleToEdit}>
      Edit Account
      </Button>
      </Space>
    </Card>
    </>
    )
}
export {AssignPage}