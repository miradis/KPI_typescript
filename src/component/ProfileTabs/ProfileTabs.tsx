import { Tabs, Space,} from "antd";

// import { TableComponents } from "./TableComponents";

interface Idata{
    title: string
    observer: string
    status: string
}

interface IDatas {
    data: Idata
    tab:string
    key:string
    }

const ProfileTabs=({data}:IDatas)=>{
//     const items=[
// {
//     key:"1",
//     label: "Circulum",
//     children: `Content of Tab Pane 1`,
// },
// {
//     key:"2",
//     label: "Details",
//     children: `Content of Tab Pane 2`,
// },
// {
//     key:"3",
//     label: "Orders",
//     children: `Content of Tab Pane 3`,
// },
// {
//     key:"4",
//     label:"KPI",
//     children: <TableComponents data={data}/>,
// }];
    return(
        <Space
        direction="vertical"
        size="middle"
        style={{
        display: 'flex',
    }}>
        {/* <Tabs size="large" items={items} /> */}
        
        
        </Space>
    );
}
export {ProfileTabs}