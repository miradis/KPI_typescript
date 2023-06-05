import React from "react";
import { Tabs } from "antd";
import EventTable from "../EventTable/EventTable";

import {EditOutlined} from "@ant-design/icons"
import { ITask, Status } from "../../common/IEvent";
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
interface CategoryTabsProps {
  categories: ITask[];
  handleDelete: (eventId: number) => void;
  handleEditCategory: (targetKey: TargetKey, action:"add"| "remove")=>void;
  handleEditStatus: (targetKey: TargetKey, action: "add" | "remove")=>void;
  handleCurrentCategory: (category_id: number)=>void
  handleCurrentStatus:(status_id:number)=>void  
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  categories, handleDelete ,handleEditStatus,
  handleEditCategory, handleCurrentCategory, handleCurrentStatus}) => {

    
  return (
    <Tabs 
     size="large" type="editable-card" onEdit={handleEditCategory}
    >
      {categories.map((category: ITask) => (
        <Tabs.TabPane closeIcon={<EditOutlined />}
        key={category.category_id} 
        tab={<span
            onClick={() => handleCurrentCategory(category.category_id)}
          >
            {category.category_name?category.category_name:"Empty"}
          </span>}
        >
          <Tabs type="editable-card" onEdit={handleEditStatus}>
            {category.statuses.map((status: Status) => (
              <Tabs.TabPane key={status.status_id} tab={<span
                onClick={()=>handleCurrentStatus(status.status_id)}
                >
                {status.status_name? status.status_name:"Empty"}</span>} closeIcon={<EditOutlined/>}>
                <EventTable status={status} handleDelete={handleDelete} />
              </Tabs.TabPane>
            ))}
          </Tabs>
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};

export default CategoryTabs;