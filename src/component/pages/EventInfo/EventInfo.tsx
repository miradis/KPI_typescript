import {Typography, Card,Space, Divider, Descriptions, Button, Row, Modal, Col, Select} from'antd'
import { useLocation, useNavigate, useParams} from 'react-router-dom';
import {LeftOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react';
// import { IEvent } from '../../../common/IEvent';
import { getRole } from '../../../services/authServies';
import { downloadFile, getEvent, getSubmissions, giveGrade } from '../../../services/userService';

import { PDFIcon } from '../../../assets/icon/PDFIcon';
import { IEvent, ISubmission } from '../../../common/IEvent';
import { BackButton } from '../../BackButton/BackBUtton';
import { ITeacher } from '../../../common/ITeacher';

const {Title, Text}= Typography;

//For submissions Info from request.
interface ISubmissionInfo extends IEvent{
    submissions:ISubmission[];

}
const EventsInfo =()=>{

    //Получение данных от предыдущей страницы при помощи useLocation
    const location = useLocation();
    const searchParams =new URLSearchParams(location.search)
    const eventURL = searchParams.get("event");
    const event = eventURL ? JSON.parse(decodeURIComponent(eventURL)): null
    const { eventId} = useParams();
    const {teacherId} =useParams();
//   const eventId = eventParam ? eventParam.split('=')[1] : null;
//   const teacherId = teacherParam ? teacherParam.split('=')[1] : null;
    // const profile_id =id ? JSON.parse(decodeURIComponent(id)): null
    // const {profile_id} =useParams();
    //Для кнопки назад
    const navigate =useNavigate();
    // function handleButton(){
    //     navigate(-1);
    //     setSubmissionIds(undefined)
    // }

    //Для измененеи состояние роли 
    const [role, setRole] =useState("")
    
    const [selectedGrade, setSelectedGrade] = useState('');
    
    const [isModalOpen, setIsModalOpen] =useState(false)

    // const [createCategory, setCreateCategory] =useState("")
    const [submissionIds, setSubmissionIds] = useState<ISubmissionInfo | null>(null);
    useEffect(()=>{
        const fetchRole = ()=>{
            const userRole = getRole();
            console.log("URL:",event)
            setRole(userRole.roles)
        }
        const fetchSubmissions =async()=>{
            console.log('Event:', eventId);
            console.log('Teacher:', teacherId);
            if (eventId && teacherId){
                const sub =await getSubmissions(teacherId,eventId);
                setSubmissionIds(sub)

            }
            else{
            if (event.teacher_id){
            const sub = await getSubmissions(event.teacher_id, event.event_id)
            setSubmissionIds(sub)
            }
        }
        }
        fetchRole()
        fetchSubmissions()
        submissionIds?.submissions?.map((sub)=>console.log("SUB:",sub));
    },[])
    
    const handleSubmission =() =>{
        
        return  navigate(`/submission/${event.event_id}`);
    }
   
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        if (event.teacher_id){
        giveGrade(selectedGrade, event.teacher_id, event.event_id)
    .then(() => {
      // Handle the response data here
      setIsModalOpen(false);
    })
    .catch((error) => {
      // Handle any errors that occur during the API request
      console.error(error.data);
    });
}
else {
    // Handle the case when id is undefined
    console.error("ID is undefined");
  }
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      const handleDownloadFile = async(id:string, name :string)=>{
        try{
            const file =await downloadFile(id);
            const blob =new Blob([file], {type: 'application/octet-stream'})
            const url =URL.createObjectURL(blob);
            const link =document.createElement("a")
            link.href =url;
            link.download = `${name}`;
            link.click();
            URL.revokeObjectURL(url)
        }
        catch(error){
            console.log(error)
        }
      }

      const renderSubmission=(sub:ISubmission, index:number)=>(
        <div key={index} style={{display:"flex", alignItems:"center"}}><PDFIcon/>
        <span key={index} style={{marginLeft:"10px"}}>
        <a
          key={sub.event_id}
          onClick={() => handleDownloadFile(sub.submission_id, sub.file_name)}
        >
          {sub.file_name}
        </a>
        </span>
        </div>
      )
    return(
        <>
        <BackButton/>
        <Card style={{marginTop:"20px"}}>
            <Title> {event ? event?.event_name:submissionIds?.event_name}</Title>
        </Card>
        <Space/>
        <Card style={{marginTop:"20px"}}>
        <Title>Описание</Title>
        <Text>
            
</Text>
        <Divider/>
        <Descriptions title="Submission status" column={1} bordered>
            <Descriptions.Item label="Sumbission status" labelStyle={{width:"150px"}}>{event ? (event?.submission_status ? "Submitted" :"Not Submitted"): (submissionIds?.submission_status ? "Submitted":"Not Submitted")}</Descriptions.Item>
            <Descriptions.Item label="Status" labelStyle={{width:"150px"}}>{event? (event?.approve_name ? "Submitted" :"Not Submitted"):(submissionIds?.approve_name)}</Descriptions.Item>
            <Descriptions.Item label="Last modified" labelStyle={{width:"150px"}}>{event?.modify_date}</Descriptions.Item>
            
            
                <Descriptions.Item  label="File submission" labelStyle={{width:"150px"}} >
                {submissionIds ? submissionIds.submissions.map((sub, index) => renderSubmission(sub, index)) : null}
                    </Descriptions.Item>
            
            <Descriptions.Item label="Comment" labelStyle={{width:"150px"}}>{}</Descriptions.Item>
        </Descriptions>
        <Row style={{justifyContent:"center"}}>
            <Space size={[20, 10]} style={{marginTop:"20px"}}>

                {!event?.submission_status && role.includes("ROLE_TEACHER") && <Button type='primary' onClick={handleSubmission}>Add file</Button>}

                {event?.submission_status && role.includes("ROLE_TEACHER") && <>
                <Button type='primary' onClick={handleSubmission}>Edit Sumbission</Button>
                <Button>Remove Submission</Button></>}
                {role.includes("ROLE_ADMIN") && <Button type='primary' onClick={showModal}>Grade</Button>}
                <Modal title="Scale" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                <Row style={{
                    display:"flex",
                    alignItems:'center',
                    justifyContent: "center",

                }}>
                    <Col span={8}>
                        Grade:
                    </Col>
                    <Col span={16}>
                        <Select
                        style={{width:"100%"}}
                        options={[
                            {value: "none", label: "none"},
                            {value:"Accepted", label:"Accepted"},
                            {value: "Rejected", label: "Rejected"},

                        ]}
                        onChange={(value) => setSelectedGrade(value)}
                        >
                        </Select>
                    </Col>
                </Row>
                </Modal>

                
        </Space>
        </Row>
        </Card>
        
        </>
    );
}
export {EventsInfo}