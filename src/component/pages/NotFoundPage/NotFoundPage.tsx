import { Layout, Typography } from "antd"

const {Title,Text} =Typography
const NotFoundPage =() =>{
    return(
        <Layout style={{ minHeight: "100vh", alignItems: "center", justifyContent: "center", textAlign:"center" }}>
        <Title level={2} style={{ marginBottom: 24 }}>Not Found Page</Title>
        <Text>This page does not exist</Text>
    </Layout>
    )
}
export {NotFoundPage}