import { Card, Col, Collapse, Form, Input, List, Pagination, Row, Select, Space, Tabs, Typography } from "antd"
import TabPane from "antd/es/tabs/TabPane";
import { useEffect, useState } from "react";
import { BackButton } from "../../BackButton/BackBUtton";
import { Link, useParams } from "react-router-dom";
import { TeacherCard } from "../../TeacherCard/TeacherCard";
import { IDepartment, ITeacher } from "../../../common/ITeacher";
import { getAllDepartaments, getTeacherByEventId, submission } from "../../../services/userService";
import { IEvent } from "../../../common/IEvent";

const {Panel} =Collapse
const {Title, Text} =Typography
const { Option } = Select;
const EventProgressPage =()=>{
    
    const [currentPage, setCurrentPage] = useState(1);
    const {id} =useParams();
    const [departaments, setDepartaments] =useState<IDepartment[] | undefined>(undefined);
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [originalTeachers, setOriginalTeachers] = useState<IEvent[]>([]);
    const [displayedTeachers, setDisplayedTeachers] = useState<IEvent[]>([]);
  
  const pageSize = 10; // Number of teachers per page
  useEffect(()=>{
    const fetchDepartaments =async()=>{
      const departaments =await getAllDepartaments();
      setDepartaments(departaments);
    }
    fetchDepartaments();
  },[])
  useEffect(() => {
    const fetchTeacherById = async () => {
      if (id) {
        const filteredTeachers = await getTeacherByEventId(id);
        setOriginalTeachers(filteredTeachers);
        setDisplayedTeachers(filteredTeachers);
      }
    };
    fetchTeacherById();
  }, [id]);

  const handleFilter = (value: string[]) => {
    setSelectedDepartments(value);

    if (value.length === 0) {
      setDisplayedTeachers(originalTeachers);
    } else {
      const filteredTeachers = originalTeachers.filter((teacher) =>
        value.includes(teacher.department_name)
      );
      setDisplayedTeachers(filteredTeachers);
    }

    setCurrentPage(1); // Reset pagination when filtering
  };
  const handlePaginationChange = (page:number) => {
    setCurrentPage(page);
  };
  const startIndex: number = (currentPage - 1) * pageSize;
  const endIndex: number = startIndex + pageSize;
  
    return (
        <>
        <Row>
        <BackButton/>
        </Row>
        <Row>
           <Col span={5}>
           <Card>
            <Collapse ghost>
              <Panel header={<Title level={3}>Filter</Title>} key="1">
              <Title level={4}>Departaments:</Title>
                <Select
        mode="multiple"
        style={{ width: "100%", marginBottom: "16px" }}
        placeholder="Select departments"
        value={selectedDepartments}
        onChange={handleFilter}
      >
        {departaments?.map((department) => (
          <Option key={department.department_name} value={department.department_name}>
            {department.department_name}
          </Option>
        ))}
      </Select>
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
            <List
                dataSource={displayedTeachers}
                renderItem={(teacher: IEvent) => (
                  <Link to={`/events/${teacher.teacher_id}/${teacher.event_id}`}>
                    <Card key={teacher.teacher_id}>
                      <TeacherCard name={teacher?.teacher_name} department={teacher.department_name ? teacher.department_name : "no department"} />
                    </Card>
                  </Link>
                )}
              />
              {displayedTeachers.length > pageSize && (
                <Pagination
                  current={currentPage}
                  total={displayedTeachers.length}
                  pageSize={pageSize}
                  onChange={handlePaginationChange}
                />
              )}
          </Space>
            </Card>
            </Col> 
        </Row>
        </>
    )
}
export {EventProgressPage}