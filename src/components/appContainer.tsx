import { Layout } from "antd";

const AppContainer = () => {
  const { Sider, Content } = Layout;
  return (
    <Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Content></Content>
      </Layout>
    </Layout>
  );
};
export default AppContainer;
