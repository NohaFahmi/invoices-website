import { Layout } from "antd";
import Header from "./header";

const AppContainer = () => {
  const { Sider, Content } = Layout;
  return (
    <Layout>
      <Sider>
        <Header />
      </Sider>
      <Layout>
        <Content></Content>
      </Layout>
    </Layout>
  );
};
export default AppContainer;
