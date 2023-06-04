import { Avatar, Row,  Space, Tabs, Spin, Button,} from 'antd'
import {UserOutlined,} from '@ant-design/icons'
import { Link, useParams } from 'react-router-dom';
import { IEvent } from '../../../common/IEvent';
import { ProfileInfo } from '../../ProfileInfo/ProfileInfo';
import { KpiTab } from '../../KpiTab/KpiTab';
import { useProfile } from './useProfile';
import { BackButton } from '../../BackButton/BackBUtton';





const ProfilePage =()=>{
    const { id } = useParams();
    const {currentUser, isOwner, loading} =useProfile(id);
  const columns = [
    {
      title: 'Task',
      dataIndex: 'event_name',
      key: 'event_name',
      render: (text:string, record:IEvent) => {
        if(record){
        const queryParams = {
          event: encodeURIComponent(JSON.stringify(record)),

        };
        const to = `/events/${record.event_id}?${new URLSearchParams(queryParams).toString()}`;
        return(
        <Link
        to={to}
        >
  {text}
</Link>
      )}}
    },
    {
      title: 'Percentage',
      dataIndex: 'event_percentage',
      key: 'event_percentage',
    },
    {
      title: 'submission',
      dataIndex: 'submission_status',
      key: 'submission_status',
      render: (submissionStatus: boolean) => (
        <span>{submissionStatus ? 'Submitted' : 'Not Submitted'}</span>
      ),
    },
    {
      title: 'status',
      dataIndex: 'approve_name',
      key: 'is_approve',
    },
  ];
    return(
       <>
        <BackButton/>
        
        <Row align='middle' justify='center'>
        <Space direction='vertical' size='large'>
        <Avatar size={384}
        icon={<UserOutlined/>}>
        </Avatar>
        </Space>
        </Row>
        <ProfileInfo currentUser={currentUser}/>
        
        {isOwner ?(<Tabs
  size="large"
  type="card"
  items={[
    {
      label: "KPI",
      key: "1",
      children: <KpiTab currentUser={currentUser} columns={columns} />,
    },
  ]}
/>) : null}
       
        </>
    );
}
export {ProfilePage}
       