import { Button } from "antd"
import {LeftOutlined} from "@ant-design/icons"
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
    onBack?:()=>void;
}

const BackButton:React.FC<BackButtonProps> =({onBack}) =>{
    const navigation =useNavigate();

    const handleBack= ()=>{
        if (onBack){
            onBack();
        }
        else{
            navigation(-1)
        }
    }
    return (<Button size='large' icon={<LeftOutlined />} onClick={handleBack}>Back</Button>)
}
export {BackButton}