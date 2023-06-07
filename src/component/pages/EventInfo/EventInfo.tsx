import {Typography, Card,Space, Divider, Descriptions, Button, Row, Modal, Col, Select, Input, Collapse, List, message} from'antd'
import { useLocation, useNavigate, useParams} from 'react-router-dom';
import {LeftOutlined,DeleteOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react';
// import { IEvent } from '../../../common/IEvent';
import { getRole } from '../../../services/authServies';
import { downloadFile, getEvent, getSubmissions, getSubmissionsInfo, giveGrade } from '../../../services/userService';

import { PDFIcon } from '../../../assets/icon/PDFIcon';
import { IEvent, ISubmission } from '../../../common/IEvent';
import { BackButton } from '../../BackButton/BackBUtton';
import { ITeacher } from '../../../common/ITeacher';
import { addComment, deleteComment } from '../../../services/comment';
import { error } from 'console';

const {Title, Text}= Typography;

//For submissions Info from request.
interface ISubmissionInfo extends IEvent{
    submissions:ISubmission[];

}
const {Panel} =Collapse
const EventsInfo =()=>{

    //Получение данных от предыдущей страницы при помощи useLocation
    const location = useLocation();
    const searchParams =new URLSearchParams(location.search)
    const eventURL = searchParams.get("event");
    const [commentValue, setCommentValue] = useState("");
    const [resultComment, setResultComment] =useState<string | undefined>(undefined);
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
            setRole(userRole.roles)
        }
        const fetchSubmissions =async()=>{
            if (eventId && teacherId){
                const sub =await getSubmissionsInfo(teacherId,eventId);
                setSubmissionIds(sub)
                setResultComment(sub.comment)
                

            }
            else{
            if (event.teacher_id){
            const sub = await getSubmissionsInfo(event.teacher_id, event.event_id)
            setSubmissionIds(sub)
            setResultComment(sub.comment);

            }
        }
        }
        fetchRole()
        fetchSubmissions()
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
      const handleAddComment= async(comment:string,)=>{
        console.log(comment)
        if (comment)
        await addComment(event.event_id,comment).then(()=>{
            setResultComment(comment);
            message.success("You uploaded a comment")
        })
        .catch((error)=>{
            throw error
        })
        else if (comment===""){
            message.info("Comment is 0")
        }
      }
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
      const handleDeleteComment =async()=>{
        if (submissionIds)
        await deleteComment(submissionIds?.event_id).catch((error)=>{
            throw error
        })
        setResultComment(undefined)
      }
      const renderComments =(comment:string)=>(
            <>
            <Collapse style={{width:"40%", height:"10%", background:"FFFFF"}} size='small' bordered={false}>
            <Panel style={{background:"FFFFF"}} key="1" header={<Text type='secondary'>Comments({resultComment? "1": "0"})</Text>}>
                {resultComment && 
                <List>
                <List.Item actions={[role.includes("ROLE_ADMIN") ?
                <Button icon={<DeleteOutlined/>} onClick={handleDeleteComment} type='link'/>:
                <Button type='link'/>]}>
                    {resultComment}
                    </List.Item></List>}
                
                <><Input placeholder='Enter a commment' required
                onChange={(e)=>setCommentValue(e.target.value)}
                />
                {resultComment ? (role.includes('ROLE_TEACHER') && (
                    <Space wrap style={{marginTop:"1%"}}>
                <Button  size="small" style={{ cursor: "pointer"}} 
                onClick={() => handleAddComment(commentValue)}>
                Update 
                </Button>
                </Space>)):(
                    role.includes('ROLE_TEACHER') && (
                        <Space wrap style={{marginTop:"1%"}}>
                    <Button  size="small" style={{ cursor: "pointer"}}
                    onClick={() => handleAddComment(commentValue)}>
                    Add 
                    </Button>
                    </Space>)
                )}
                </>
                </Panel>
            </Collapse>
            </>
        );
        const eventText = event ? event?.event_name : submissionIds?.event_name;
        const firstSentence = eventText?.split('. ')[0];
    return(
        <>
        <BackButton/>
        <Space/>
        <Card style={{marginTop:"1%"}}>
            <Title>{eventText}</Title>
        </Card>
        <Card style={{marginTop:"20px"}}>
        <Text>{event?.event_description}
</Text>
        <Divider/>
        <Descriptions title="Submission status" column={1} bordered>
            <Descriptions.Item label="Sumbission status" labelStyle={{width:"150px"}}>{event ? (event?.submission_status ? "Submitted" :"Not Submitted"): (submissionIds?.submission_status ? "Submitted":"Not Submitted")}</Descriptions.Item>
            <Descriptions.Item label="Status" labelStyle={{width:"150px"}}>{event? (event?.approve_name ):(submissionIds?.approve_name)}</Descriptions.Item>
            <Descriptions.Item label="Last modified" labelStyle={{width:"150px"}}>{event?.modify_date}</Descriptions.Item>
            
                <Descriptions.Item  label="File submission" labelStyle={{width:"150px"}} >
                {submissionIds ? submissionIds.submissions.map((sub, index) => renderSubmission(sub, index)) : null}
                    </Descriptions.Item>
            
            <Descriptions.Item label="Comment" labelStyle={{width:"150px"}}>{renderComments(event?.comment)}</Descriptions.Item>
        </Descriptions>
        <Row style={{justifyContent:"center"}}>
            <Space size={[20, 10]} style={{marginTop:"20px"}}>

                {!event?.submission_status && role.includes("ROLE_TEACHER") && <Button type='primary' onClick={handleSubmission}>Add file</Button>}

                {event?.submission_status && role.includes("ROLE_TEACHER") && <>
                <Button type='primary' onClick={handleSubmission}>Edit Sumbission</Button>
                </>}
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