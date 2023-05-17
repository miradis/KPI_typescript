import { Calendar, Typography,Row, Col, Card, Collapse } from "antd"
import type { Dayjs } from 'dayjs'
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import { useState } from "react";
import {MailOutlined,PhoneOutlined,HomeOutlined} from '@ant-design/icons'
const {Title,Text}=Typography
const {Panel}= Collapse

const items =[
    {
        key:"Tech Support",
        label: "DU Tech Support",
        email: <MailOutlined/>+ "Mail: support_du@astanait.edu.kz",
    },
    {
        key:"Millitary departament", 
        label: "Military department",
        email: <MailOutlined/> +"Mail: alexei.peresipkin@astanait.edu.kz",
        phone: <PhoneOutlined/> +"Phone:  +7 (701) 412-87-58",
        room: <HomeOutlined/> +"Room: C1.3.336",
    },
    {
        key:"Transcript",
        label:"Request for Transcript",
        email: <MailOutlined/> + "transcript@astanait.edu.kz",
    },
    {
        key:"Медпункт",
        label:"Медпункт",
        phone: <PhoneOutlined/>+"Phone: 8 (7172) 64-57-33"
    },
    {
        key:"Students' affairs",
        label:"Department of the students' affairs (Clubs, Volunteers, Dormitory, Lockers)",
        email: <MailOutlined/>+"Mail:arman.kenzhebekov@astanait.edu.kz",
        room: <HomeOutlined/>+"Room: C1.1.323"
    }
]
function MainPage() {
    const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
      };
    return (
        <>
        <Row gutter={[16, 16]}>
        <Col span={19}>
        <Title level={2}>Calendar</Title>
        <Calendar onPanelChange={onPanelChange}/>
        </Col>
        <Col span={5}>
            <Card >
                <Collapse bordered ghost expandIconPosition="end">
                    {/* <Panel header="Contacts" key={1} style={{
                        fontSize:"24px",
                    }}
                    {...items.map((item)=>(
                        <>
                        <Title>{item.label}</Title>
                        <Text>{item.email}</Text>
                        <Text>{item.phone}</Text>
                        <Text>{item.room}</Text>
                        </>
                    ))}
                    >
                    </Panel> */}
                </Collapse>
            </Card>
        </Col>
        </Row>
        </>
    )
}
export {MainPage}
