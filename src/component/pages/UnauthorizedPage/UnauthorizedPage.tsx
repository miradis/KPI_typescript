import { Layout, Typography } from "antd"

const {Title,Text} =Typography
const Unauthorized =() =>{
    return(
        <Layout style={{ minHeight: "100vh", alignItems: "center", justifyContent: "center", textAlign:"center" }}>
        <Title level={2} style={{ marginBottom: 24 }}>Unauthorized Access</Title>
        <Text>You are not authorized to view this page.</Text>
    </Layout>
    )
}
export {Unauthorized}