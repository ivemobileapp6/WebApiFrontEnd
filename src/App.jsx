import React, { useState } from 'react';
import { Card, Button, DatePicker, Col, Row} from 'antd';
import 'antd/dist/reset.css';
// import DetailArticle from './components/DetailArticles'
// import Hello from './components/Hello';
// import Goodbye from './components/Goodbye';
// import CardColumn from './components/Card'

import Home from './components/Home';
import CatInfo from './components/CatInfo';
import AddCat from './components/AddCat';
import About from './components/About'
import Register from './components/Register';
import Login from './components/Login';


// import NewArticle from './components/NewArticle'
import {Layout, Space} from 'antd';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
const {Header, Content, Footer} = Layout;
import 'antd/dist/reset.css'
// let counter = 0;

// const onChange: DatePickerProps['onChange']=(date, datestring) => {
//   console.log(date, datestring)
// }

// const onClick = (event: any) => {
//   console.log(counter++)
// }
export default function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [userType, setUserType] = useState(localStorage.getItem('userType'));
    return (
    <Router>
      <Layout>
      <Header>
        <Row>
          <Col span={18} >
            <nav>
              <Space>
                <Link to="/"> Home </Link>
                {/*<Link to="/dashboard"> Dashboard </Link>*/}
                <Link to="/catinfo"> CatInfo </Link>
                <Link to="/about"> About </Link>
                <Link to="/addcat"> AddCat </Link>
                {/*<Link to="/newarticle"> NewArticle </Link>*/}
              </Space>
          </nav>
        </Col>
        <Col span={6}>
          <nav>
              <Space>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
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
              {/*<Route path="/a/:id" element={<DetailArticle />} />
              <Route path="/newarticle" element={<NewArticle />} />*/}
              <Route path="/addcat" element={<AddCat authToken={authToken} />} />
               {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
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

