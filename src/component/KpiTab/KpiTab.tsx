import jsPDF from "jspdf";
import  autoTable from 'jspdf-autotable';
import { ITeacher } from "../../common/ITeacher";
import { Button, Table, Typography } from "antd";
import {DownloadOutlined} from '@ant-design/icons'


const KpiTab = ({ currentUser, columns }: { currentUser: ITeacher | undefined; columns: any[] }) => {
  
  const DownloadPDF = () => {
      const pdf = new jsPDF();
  
      // Set the custom font
      pdf.text(
        "Annual progress report on the teaching staff of `Astana IT University LLP`"+`${currentUser?.name}`
      ,10,10)
      pdf.text("Provided to Software Engineering and Computer Science Department", 10,20)
      pdf.text(`
      For the period from August 10, 2021 to August 14, 2022`,10,30)
      pdf.text(`During this period, the following tasks were completed:`,10,40)
      pdf.save("report.pdf");
    };
  
    return (
      <>
        <Table columns={columns} dataSource={currentUser?.teacher_events || []}/>
        
        <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
          
          <Button type="primary" icon={<DownloadOutlined />} onClick={DownloadPDF}>
            Download PDF
          </Button>
          
        </div>
      </>
    );
  };

  export {KpiTab}