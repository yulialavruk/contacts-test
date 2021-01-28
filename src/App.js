import { useState, useEffect } from "react";
import logo from "./logo.svg";
import { Layout, Row, Col, Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import { fetchData } from "./api/api";
import { SignInModal } from "./components/SignInModal";
import { openNotification } from "./components/notification";
import { UserProfile } from "./pages/UserProfile";
import { UserMenu } from "./components/UserMenu";
import { Contacts } from "./pages/Contacts";
import { ContactProfile } from "./pages/ContactProfile";
import { ErrorPage } from "./pages/Eror404";
import "./App.css";

const { Header, Content, Footer } = Layout;

const App = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const seedKey = localStorage.getItem("seed_key");

  useEffect(() => {
    if (seedKey) {
      const getUser = async () => {
        try {
          setIsLoadingUser(true);
          const response = await fetch(
            `https://randomuser.me/api/?seed=${seedKey}&results=1`
          );

          const { results } = await response.json();
          setUser(results[0]);
        } catch (e) {
          openNotification("error");
        } finally {
          setIsLoadingUser(false);
          setIsShowModal(false);
        }
      };
      getUser();
    }
  }, [seedKey]);

  return (
    <BrowserRouter>
      <div className="App">
        <Layout className="layout">
          <Header className="layout__header">
            <Row gutter={30}>
              <Col span={12} align="start">
                <Link to="/">Home</Link>
                {user && (
                  <Link to="/contacts" className="p-15">
                    Contacts
                  </Link>
                )}
              </Col>
              <Col span={12} align="end">
                {user ? (
                  <UserMenu user={user} setUser={setUser} />
                ) : (
                  <Button type="link" onClick={() => setIsShowModal(true)}>
                    <LoginOutlined /> Sign In
                  </Button>
                )}
                <SignInModal
                  isShowModal={isShowModal}
                  setIsShowModal={setIsShowModal}
                  setUser={setUser}
                />
              </Col>
            </Row>
          </Header>
          <Content className="layout__main">
            <Switch>
              <Route exact path="/">
                <img src={logo} className="App-logo" alt="logo" />
              </Route>
              <Route
                exact
                path="/contacts"
                render={() => (user ? <Contacts /> : <ErrorPage />)}
              />
              <Route
                path="/contacts/:id"
                render={() => (user ? <ContactProfile /> : <ErrorPage />)}
              />
              <Route
                path="/profile"
                render={() =>
                  user ? <UserProfile user={user} /> : <ErrorPage />
                }
              />
              <Route path="*" component={ErrorPage} />
            </Switch>
          </Content>
          <Footer className="layout__footer">2021 © Contacts App</Footer>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
