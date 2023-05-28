import React, { useState, useEffect } from 'react';
import { Card, Button, DatePicker, Col, Row } from 'antd';
import 'antd/dist/reset.css';

import Home from './components/Home';
import CatInfo from './components/CatInfo';
import AddCat from './components/AddCat';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import EditCat from './components/EditCat';
import FavouriteCats from './components/Favourite';
import Google from './components/Google';
import Cat from './components/Cat';
import Chat from './components/Chat';


import { Layout, Space } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;
import 'antd/dist/reset.css';

export default function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [userName, setUsername] = useState(localStorage.getItem('name'));
  const [userType, setUserType] = useState(localStorage.getItem('userType'));
const [loggedIn, setLoggedIn] = useState(false);



  console.log('Auth Token:', authToken);
  console.log('User name:', userName);
  console.log('Auth Token:', userType);
  

  const isLoggedIn = authToken !== null;

  const handleLogout = () => {
    setAuthToken(null);
    setUsername(null);
    setUserType(null);
   localStorage.clear();

  };
useEffect(() => {
}, [authToken, userName, userType]);
  
  return (
    <Router>
      <Layout>
        <Header>
          <Row>
            <Col span={18}>
              <nav>
                <Space>
                  <Link to="/">Home</Link>
                  <Link to="/catinfo">CatInfo</Link>
                  <Link to="/about">About</Link>
                  <Link to="/addcat">AddCat</Link>
                  <Link to="/editcat">EditCat</Link>
                  <Link to="/favourites">Favourites</Link>
                  <Link to="/google">Google</Link>
                  <Link to="/cat">Cat</Link>
                  <Link to="/chat">Chat</Link>


                </Space>
              </nav>
            </Col>
            <Col span={6}>
              <nav>
                <Space>
                  {isLoggedIn ? (
                    <>
                      <Button onClick={handleLogout}>Logout</Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">Login</Link>
                      <Link to="/register">Register</Link>

                    </>
                  )}
                </Space>
              </nav>
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', minHeight: 600 }}>
            <Routes>
              <Route path="/" element={<Home authToken={authToken} />} />
              <Route path="/about" element={<About />} />
              <Route path="/catinfo" element={<CatInfo />} />
              <Route path="/addcat" element={<AddCat authToken={authToken} />} />
              <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/editcat" element={<EditCat />} />
              <Route path="/favourites" element={<FavouriteCats />} />
              <Route path="/google" element={<Google />} />
              <Route path="/cat" element={<Cat />} />
              <Route path="/chat" element={<Chat />} /> 

            </Routes>
          </Layout>
        </Content>
        <Footer style={{ padding: '0 0 0 10px' }}>
          <p>VT6003CEM Demo</p>
        </Footer>
      </Layout>
    </Router>
  );
}