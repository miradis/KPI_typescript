import {Typography, Card,Space, Divider, Descriptions, Button, Row} from'antd'
import { useNavigate } from 'react-router-dom';
import {LeftOutlined} from '@ant-design/icons'

const {Title, Text}= Typography;
const EventsInfo =()=>{
    const navigate =useNavigate();
    function handleButton(){
        navigate(-1);
    }
    return(
        <>
        <Button size='large' icon={<LeftOutlined />} onClick={handleButton}>Back</Button>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card>
            <Title> Научно исследовательская работа</Title>
        </Card>
        <Space/>
        <Card>
        <Title>Описание</Title>
        <Text>-Разработка
прототипа инновационного продукта.
Регистрация данного продукта
Департаменте науки и
инновации,
 привлечение инвестиции в объеме не менее 500000 тенге в год (через участие в хакатонах, конкурсах инновационных проектов,или прямого привлечения инвестиций);
 <br/>
-Привлечение финансирования в AITU в объеме не менее 3 млн. тенге в год на научную или инновационную работу через подачу заявки научных или инновационных проектов на конкурсы грантового финансирования (ГФ), программно-целевого финансирования (ПЦФ).научного конкурса молодых ученых по линии МОН РК. МИРИАП РК и др. министерств (ведомств), или привлечение аналогичного финансирования через участие
B конкурсах зарубежных научных грантов:
<br/>
-Получение патентов пред патентов, авторских изобретений (свидетельств) через государственную регистрации объектов интеллектуальной собственников
</Text>
        <Divider/>
        <Descriptions title="Submission status" column={1} bordered>
            <Descriptions.Item label="Sumbission status" labelStyle={{width:"150px"}}>Submitted</Descriptions.Item>
            <Descriptions.Item label="Status" labelStyle={{width:"150px"}}>Rejected</Descriptions.Item>
            <Descriptions.Item label="Last modified" labelStyle={{width:"150px"}}>2 March 2023</Descriptions.Item>
            <Descriptions.Item label="File submission" labelStyle={{width:"150px"}}>Finance Report.pdf</Descriptions.Item>
            <Descriptions.Item label="Comment" labelStyle={{width:"150px"}}>{}</Descriptions.Item>
        </Descriptions>
        <Row style={{justifyContent:"center"}}>
            <Space size={[20, 10]}>
        <Button type='primary'>Edit Sumbission</Button>
        <Button>Remove Submission</Button>
        </Space>
        </Row>
        </Card>
        </Space>
        </>
    );
}
export {EventsInfo}