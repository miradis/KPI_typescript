import { Card, Typography, Upload, Row, Button,Space, message, List } from "antd";
import {InboxOutlined,DeleteOutlined} from '@ant-design/icons'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IEventSmall, ISubmission } from "../../../common/IEvent";
import { deleteSubmission, downloadFile, getSubmissions, submission } from "../../../services/userService";
import {LeftOutlined} from '@ant-design/icons'
import type { UploadProps } from 'antd';
import { RcFile } from "antd/es/upload";
import { getCurrentUser, getRole} from "../../../services/authServies";

import { PDFIcon } from "../../../assets/icon/PDFIcon";
import useSubmission from "./useSubmission";
import { BackButton } from "../../BackButton/BackBUtton";

const {Title, Text} = Typography;
const { Dragger } = Upload;
const SubmissionBox = ()=>{
  const { event, submissions, handleDownloadFile, setSubmissions } = useSubmission();
  const [teacherId, setTeacherId] =useState<string| undefined>(undefined)
  const {id} =useParams<{id?: string}>()

  const columns = [
    {
      title: "File Name",
      dataIndex: "file_name",
      key: "file_name",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (_:any, record: ISubmission) => (
        <Button onClick={() => handleDownloadFile(record.submission_id, record.file_name)}>
          Download
        </Button>
      ),
    },
  ];


  if (!id) {
    return null; // Handle the case when id is undefined
  }

  const handleUpload = async (file: RcFile): Promise<void> => {
    const response = await submission(id, file as File);
    console.log("Response:"+response); // Do something with the response if needed
    message.success(`${file.name} file uploaded successfully.`);
    getCurrentUser()
  };

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    customRequest: async (options: any): Promise<void> => {
      const { file } = options;
      await handleUpload(file as RcFile);
    },
    onChange: (info) => {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: React.DragEvent<HTMLElement>) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const handleDeleteItem =async(id:string)=>{
    try{
      await deleteSubmission(id);
      setSubmissions((prevSubmissions) => prevSubmissions?.filter((submission) => submission.submission_id !== id));
    }
    catch(error){
      console.log("ERROR"+error);
      throw error;
    }
  }
  const renderSubmission = (sub: ISubmission, ) => (
    <List.Item actions={[<Button icon={<DeleteOutlined/>} type="link" onClick={()=>handleDeleteItem(sub.submission_id)}></Button>]}>
      <div style={{ display: "flex", alignItems: "center" }}>
      <PDFIcon />
      <span style={{ marginLeft: "10px" }}>
        <a onClick={() => handleDownloadFile(sub.submission_id, sub.file_name)}>{sub.file_name}</a><br />
      </span>
      </div>
    </List.Item>
  );

    return(
        <>
        <BackButton/>
        <Card style={{marginTop:"20px"}}>
            <Title level={2}>research work</Title>
        </Card>
        <Card style={{marginTop:"20px", alignItems:"center", alignContent:"center"}} >
        <Dragger style={{width:"80%", alignSelf:"flex-"}} {...props}>
            <>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
              </p>
            </>
  </Dragger >
  {submissions && Array.isArray(submissions) && (
      <>
      <List dataSource={submissions} renderItem={renderSubmission} style={{width:"80%"}}/>
      </>
    )}
  {/* <Row style={{justifyContent:"center"}}>
            <Space size={[20, 10]} style={{marginTop:"20px"}}>
        <Button type='primary'>Edit Sumbission</Button>
        <Button>Remove Submission</Button>
        </Space>
        </Row> */}
        </Card>
        </>
    );
}
export {SubmissionBox}