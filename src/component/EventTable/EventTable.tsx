import React from "react";
import { Button, Empty, Modal, Space, Table } from "antd";

import { DeleteOutlined, HighlightOutlined, PlusOutlined } from "@ant-design/icons";
import { Event, Status } from "../../common/IEvent";
import { Link, useNavigate } from "react-router-dom";

interface EventTableProps {
  status: Status;
  handleDelete: (eventId: number) => void;
}

const EventTable: React.FC<EventTableProps> = ({ status, handleDelete }) => {

  const navigation =useNavigate()

  const handleEdit =(event: Event) =>{
    navigation(`/events/tasks/edit/${event.event_id}`);
  }
  const handleAddByFooter = ()=>{
    navigation(`/events/tasks/create/${status.status_id}`)
  }
  const getTotalPercentage =()=>{
    return status.events?.reduce((total, event)=>total+event.event_percentage,0)
  }
  
  const columns = [
    {
      title: "Task",
      dataIndex: "event_name",
      key: "Task",
      ellipsis: true, // Enable ellipsis for long text
      width: 600, // Set a fixed width for the table cell
      render:(_:any,record:any)=>(
        <Link to={`/events/tasks/${record.event_id}`}>
          {record.event_name}
          </Link>
      )
    },
    {
      title:"Rate",
      dataIndex: "event_rates",
      key:"rates"
    },
    {
      title: "Percentage",
      dataIndex: "event_persentage",
      key: "eventPercentage",
      width:200,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      width: 100,
      render: (_: string, record: any) => {
        return(
        <Space size="small">
          <Button size="small" type="link" onClick={() => handleDeleteRow(record.event_id)}>
            <DeleteOutlined />
          </Button>
          <Button size="small" type="link" onClick={() => handleEdit(record)}>
            <HighlightOutlined />
          </Button>
        </Space>
      );
    }
  }
  ];
  const footer = () => (
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <span style={{ marginLeft: 8 }}>
        Total Percentage: {getTotalPercentage()}%
      </span>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddByFooter}>
        Add Task
      </Button>
    </div>
      

  );
  const data = status.events.map((event: Event) => ({
    event_id: event.event_id,
    event_name: event.event_name,
    event_persentage: event.event_percentage,
    event_rates:event.event_rates
  }
  )
  );
  const emptyContent = (
    <div style={{ textAlign: "center", padding: "16px" }}>
      <Empty description="No tasks" />
      <Button type="link" onClick={()=>{navigation(`/events/tasks/create/${status?.status_id}`)}}>Add</Button>
    </div>
  );

  const handleDeleteRow = (eventId: number) => {
    Modal.confirm({
      title: "Delete Event",
      content: "Are you sure you want to delete this event?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        handleDelete(eventId);
      },
    });
  };
  return <><Table columns={columns} dataSource={data.length > 0 ? data : undefined}
  locale={{
    emptyText: data.length > 0 ? "" : emptyContent,
  }} 
  footer={footer}/>
  </>;
};

export default EventTable;