import { Row, Col, Select, Card, Typography, Input, Space, Avatar, Dropdown, Collapse, Spin } from "antd";
import { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { TeacherCard } from "../../TeacherCard/TeacherCard";
import { getAllTeachers } from "../../../services/userService";
import { Link } from "react-router-dom";
import { ITeacher } from "../../../common/ITeacher";
import {Spinner} from "../../Spinner/Spinner";
const { Title } = Typography;
const {Panel} =Collapse
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
const TeacherPageList = () => {
  
  const [teachers, setTeachers] =useState<ITeacher[] | undefined>(undefined)
  const [isLoading, setIsLoading] =useState(false)

  useEffect (()=>{
    
    const fetchTeachers = async() =>{
      setIsLoading(true)
      const response = await getAllTeachers();
      setTeachers(response)
    }
    fetchTeachers()
    setIsLoading(false)
  },[])

  if (isLoading) {
    return <Spinner/>; // Render the Spinner component when the application is loading
  }
  return (
    <>
      <Title level={1}>All teachers</Title>
      <Row gutter={[16, 16]}>
        <Col span={5}>
          <Card>
            <Collapse ghost style={{}}>
              <Panel header="Filter" key="1" 
              style={{
              fontSize:"24px",
              display:"flex",
              flexDirection:"column"}}>
                <Title level={3}>Department</Title>
                <Select
                size="large"
                style={{ width: '100%',
                borderRadius:"0px !important" }}
                onChange={handleChange}
                options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
      ]}
    />
              </Panel>
            </Collapse>
          </Card>
        </Col>
        <Col span={19}>
          <Card>
        <Space direction="vertical" 
          style={{
            display:"flex",
            justifyContent:"center"
          }}>

        <Input placeholder="Поиск по ФИО"></Input>
        
          {teachers?.map((teacher) => (
            
            <Link to={`/teachers/${teacher.teacher_id}`}>
            <Card key={teacher.teacher_id}>
              <TeacherCard name={teacher?.name} department={teacher.category_name? teacher.category_name:"no department"}/>
            </Card>
            </Link>
          ))}
          </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export { TeacherPageList };