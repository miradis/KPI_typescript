import { Row, Col, Select, Card, Typography, Input, Space, Avatar, Dropdown, Collapse } from "antd";
import { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { TeacherCard } from "../../TeacherCard/TeacherCard";
import { getAllTeachers } from "../../../services/userService";
import { ITeacher } from "../../../common/ITeacher";
const { Title } = Typography;
const {Panel} =Collapse
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
const TeacherPageList = () => {
  
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const allTeachers = await getAllTeachers();
      setTeachers(allTeachers);
    };
    fetchTeachers()
    teachers.map(teacher=>{
      console.log(teacher.name);
    })
  }, []);
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
        
          {teachers.map((teacher) => (
            <Card key={teacher.id}>
              <TeacherCard name={teacher.name} department={teacher.category_name? teacher.category_name:"no department"} />
            </Card>
          ))}
          </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export { TeacherPageList };