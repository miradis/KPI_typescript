import React from "react";
import { Tabs } from "antd";
import EventTable from "../EventTable/EventTable";

import {EditOutlined} from "@ant-design/icons"
import { ITask } from "../../common/IEvent";
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
interface CategoryTabsProps {
  categories: ITask[];
  handleDelete: (eventId: number) => void;
  handleEditTab: (targetKey: TargetKey, action:"add"| "remove")=>void;
  handleEdit: (targetKey: TargetKey, action: "add" | "remove")=>void;
  handleCurrentCategory: (category_id: number)=>void
  
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, handleDelete ,handleEdit, handleEditTab, handleCurrentCategory}) => {

    
  return (
    <Tabs 
     size="large" type="editable-card" onEdit={handleEditTab}
    >
      {categories.map((category: ITask) => (
        <Tabs.TabPane closeIcon={<EditOutlined />}
        key={category.category_id} 
        tab={<span
            onClick={() => handleCurrentCategory(category.category_id)}
          >
            {category.category_name}
          </span>}
        >
          <Tabs type="editable-card" onEdit={handleEdit}>
            {category.statuses.map((status: any) => (
              <Tabs.TabPane key={status.status_id} tab={status.status_name}>
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