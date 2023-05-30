/**
 * Home component
 * Used antdesign materials 
 * Used CSS skills
 */

import React from 'react';
import { Typography, Button, Row, Col, Card } from 'antd';
import { HeartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home = () => {
  const catsData = [
    {
      name: 'Whiskers',
      imageUrl:
        'https://images.unsplash.com/photo-1561948955-570b270e7c36?fit=crop&w=500&h=500',
    },
    {
      name: 'Fluffy',
      imageUrl:
        'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?fit=crop&w=500&h=500',
    },
    {
      name: 'Mittens',
      imageUrl:
        'https://images.unsplash.com/photo-1574158622682-e40e69881006?fit=crop&w=500&h=500',
    },
  ];

  const navigate = useNavigate();

  return (
    <div>
      <Row justify="center" style={{ marginBottom: 50 }}>
        <Col>
          <Title level={1}>Welcome to CatAdoption</Title>
          <Paragraph>
            At CatAdoption, we're dedicated to helping cats find their forever homes.
            Explore our adorable cats and find your new best friend today.
          </Paragraph>
          <Button type="primary" size="large" style={{ marginRight: 20 }} onClick={() => navigate("/catinfo")}>
            <HeartOutlined />
            View Our Cats
          </Button>
          <Button type="default" size="large" onClick={() => navigate("/about")}>
            <InfoCircleOutlined />
            Learn More
          </Button>
        </Col>
      </Row>
      <Row gutter={[32, 32]} justify="center">
        {catsData.map((cat, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={cat.name}
                  src={cat.imageUrl}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
              }
            >
              <Card.Meta title={cat.name} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;