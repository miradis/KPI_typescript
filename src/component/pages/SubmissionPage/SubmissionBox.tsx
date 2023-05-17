import { Card, Typography, Upload, Row, Button,Space } from "antd";
import {InboxOutlined} from '@ant-design/icons'

const {Text,Title} = Typography;
const { Dragger } = Upload;
const SubmissionBox = ()=>{

    return(
        <>
        <Card>
            <Title>Научно исследовательская работа</Title>
        </Card>
        <Card>
            <Dragger >
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
  <Row style={{justifyContent:"center"}}>
            <Space size={[20, 10]}>
        <Button type='primary'>Edit Sumbission</Button>
        <Button>Remove Submission</Button>
        </Space>
        </Row>
        </Card>
        </>
    );
}
export {SubmissionBox}