import { Calendar, Typography,Row, Col, Card, Collapse, Divider } from "antd"
import type { Dayjs } from 'dayjs'
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import { useState } from "react";
import {MailOutlined,PhoneOutlined,HomeOutlined} from '@ant-design/icons'
const {Title,Text}=Typography
const {Panel}= Collapse

const items = [
    {
      key: "Tech Support",
      label: "DU Tech Support",
      email: "support_du@astanait.edu.kz",
    },
    {
      key: "Millitary departament",
      label: "Military department",
      email: "alexei.peresipkin@astanait.edu.kz",
      phone: "+7 (701) 412-87-58",
      room: "C1.3.336",
    },
    {
      key: "Transcript",
      label: "Request for Transcript",
      email: "transcript@astanait.edu.kz",
    },
    {
      key: "Медпункт",
      label: "Медпункт",
      phone: "8 (7172) 64-57-33",
    },
    {
      key: "Students' affairs",
      label:
        "Department of the students' affairs (Clubs, Volunteers, Dormitory, Lockers)",
      email: "arman.kenzhebekov@astanait.edu.kz",
      room: "C1.1.323",
    },
  ];
function MainPage() {
    const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
      };
    return (
        <>
        <Row gutter={[16, 16]}>
        <Col span={18}>
        <Title level={2}>Calendar</Title>
        <Calendar onPanelChange={onPanelChange}/>
        </Col>
        <Col span={6}>
            <Card >
                <Collapse bordered ghost expandIconPosition="end" style={{backgroundColor:"fafafa"}} defaultActiveKey="contacts" >
                <Panel header={<Title level={2}>Contacts</Title>} key="contacts" style={{}} >
                {items.map((item) => (
                  <div key={item.key}>
                    <Title level={4}>{item.label}</Title>
                    {item.email && (
                      <Title level={5}>
                        <MailOutlined/> Mail: {item.email}<br/>
                      </Title>
                      
                    )}
                    {item.phone && (
                      <Title level={5}>
                        <PhoneOutlined /> Phone: {item.phone}<br/>
                      </Title>
                    )}
                    {item.room && (
                      <Title level={5}>
                        <HomeOutlined />Room: {item.room}<br/>
                      </Title>
                    )}
                    <Divider/>
                  </div>
                ))}
              </Panel>
                </Collapse>
            </Card>
        </Col>
        </Row>
        </>
    )
}
export {MainPage}
