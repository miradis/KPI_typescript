import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IEventSmall, ISubmission } from "../../../common/IEvent";
import { downloadFile, getSubmissions } from "../../../services/userService";
import { getCurrentUser } from "../../../services/authServies";

const useSubmission = () => {
  const [event, setEvent] = useState<IEventSmall | undefined>(undefined);
  const [teacherId, setTeacherId] = useState<string | undefined>(undefined);
  const [submissions, setSubmissions] = useState<ISubmission[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const fetchTeacherId = async () => {
      try {
        const teacher_id = await getCurrentUser();
        setTeacherId(teacher_id.teacher_id);
      } catch (error) {
        console.log("ERROR:" + error);
      }
    };
    

    const fetchSubmission = async () => {
      try {
        setLoading(true)
        if (id && teacherId) {
          const submission = await getSubmissions(teacherId, id);
          console.log("Submissions:",submission)
          setSubmissions(submission);
        }
      } catch (error) {
        console.log("ERROR:" + error);
      }
      finally{
        setLoading(false)
      }
    };

    fetchTeacherId();
    fetchSubmission();
  }, [id, teacherId]);

  const handleDownloadFile = async (id: string, name: string) => {
    try {
      const file = await downloadFile(id);
      const blob = new Blob([file], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    event,
    submissions,
    handleDownloadFile,
    loading,
    setSubmissions,
  };
};

export default useSubmission;