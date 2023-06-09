import { Layout,Col, Row, theme } from "antd";
import React, {ReactNode} from 'react'
import { DropDownProfile } from "../DropDown/DropDownProfile";
import { LeftPanel } from "../LeftPanel/LeftPanel";

const { Header, Content } = Layout;

type MainContent ={
    children: ReactNode;
};

function MainContent({children}:MainContent) {
// const {colorBgContainer} =theme.useToken<{
//     colorBgContainer:string;

// }>('ColorBgContainer')

return (
    <>
    <LeftPanel/>
    <Layout>
      <Header  
        style={{
          color: '001529',
          height: '80px',
          padding:"5px 15px 0px 0px"
          // background:colorBgContainer
        }}
      >
      <Row>
        <Col flex={1}></Col>
        <Col >
        <div style={{
          float: 'right',
          marginLeft:"10px"
      }}>
           <DropDownProfile/>
        </div>
        </Col>
        </Row>
      </Header>
        <Content style={{background:"f0f2f5"}}>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            // background: colorBgContainer,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
    </>
)   
}

export  {MainContent};