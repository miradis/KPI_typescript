import jsPDF from "jspdf";
import  autoTable from 'jspdf-autotable';
import { ITeacher } from "../../common/ITeacher";
import { Button, Table } from "antd";
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
  
      // const tableColumns = ["Task", "Percentage", "Submission", "Status"];
      // const tableData =
      //   currentUser?.teacher_events.map((event) => [
          
      //     event.event_name,
      //     event.event_percentage,
      //     event.submission_status ? "Submitted" : "Not Submitted",
      //     event.approve_name,
      //   ]) || [];
  
      // const tableStyles = {
      //   fontSize: 10,
      //   color: "plain",
      //   lineColor: [0, 0, 0], // black color for table borders
      //   fontStyle: "normal", // remove bold style from header cells
      //   lineWidth: 0.1, // thin border lines
      //   cellPadding: 5, // padding for cell content
      //   headerStyle: {
      //     fillCollor: [200, 200, 200],
      //   },
      // };
  
      // autoTable(pdf, {
      //   head: [tableColumns],
      //   body: tableData,
      //   startY: 30,
      //   styles: tableStyles as any,
      // });
  
      pdf.save("report.pdf");
    };
  
    return (
      <>
        <Table columns={columns} dataSource={currentUser?.teacher_events || []} />
        <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
          <Button type="primary" icon={<DownloadOutlined />} onClick={DownloadPDF}>
            Download PDF
          </Button>
        </div>
      </>
    );
  };

  export {KpiTab}