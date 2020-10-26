import React from "react";
import logo from "./logo.svg";
import { Layout, Row, Col } from "antd";
import SignIn from "./components/sign_in/sign_in";
import "./App.css";

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Header className="header">
            <Row gutter={30}>
              <Col span={3}>
                <img
                  src={`http://inkubator.ks.ua/testing/react/redux/static/media/wezom-logo.324b96ae.svg`}
                  alt=""
                />
              </Col>
              <Col span={18} align="start">
                Home
              </Col>
              <Col span={3}>
                <SignIn />
              </Col>
            </Row>
          </Header>
          <Content>
            <img src={logo} className="App-logo" alt="logo" />
          </Content>
          <Footer>footer</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
