import React from "react";
import logo from "./logo.svg";
import { Layout, Row, Col } from "antd";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { fetchData } from "./api/api";
import SignIn from "./components/sign_in/sign_in";
import Profile from "./components/profile";
import Contacts from "./components/contacts";
import "./App.css";

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  state = {
    loading: false,
    show_modal: false,
    user: false,
  };

  setShowModal = (show_modal) => {
    this.setState({ show_modal });
  };

  handleSubmit = async () => {
    this.setState({ loading: true });
    const fetchedData = await fetchData();
    setTimeout(() => {
      this.setState({
        loading: false,
        show_modal: false,
        user: fetchedData,
      });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ show_modal: false });
  };

  onLogout = () => {
    this.setState({ user: false });
  };

  render() {
    const { loading, show_modal, user } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Layout className="layout">
            <Header className="header">
              <Row gutter={30}>
                <Col span={3}>
                  <img
                    src={`http://inkubator.ks.ua/testing/react/redux/static/media/wezom-logo.324b96ae.svg`}
                    alt=""
                  />
                </Col>
                <Col span={11} align="start">
                  <Link to="/">Home</Link>
                  {user ? <Link to="/contacts"> Contacts</Link> : ""}
                </Col>
                <Col span={10} align="end">
                  <SignIn
                    loading={loading}
                    show_modal={show_modal}
                    user={user}
                    setShowModal={this.setShowModal}
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                    onLogout={this.onLogout}
                  />
                </Col>
              </Row>
            </Header>
            <Content>
              <Route exact path="/">
                <img src={logo} className="App-logo" alt="logo" />
              </Route>
              <Route path="/contacts">
                <Contacts />
              </Route>
              <Route path="/profile">
                <Profile user={user} />
              </Route>
            </Content>
            <Footer>2020 © Wezom React-Redux Test</Footer>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
