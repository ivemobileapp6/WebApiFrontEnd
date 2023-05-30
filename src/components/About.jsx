/**
 * About Us component
 * Used antdesign materials 
 * Used CSS skills
 */
import React from 'react';
import { Typography, Row, Col, Image } from 'antd';
import { EnvironmentOutlined, TeamOutlined, HeartOutlined } from '@ant-design/icons';


const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div>
      <Title level={1}>About Us</Title>
      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Title level={3}>
            <EnvironmentOutlined /> Our Mission
          </Title>
          <Paragraph>
            Our mission is to rescue, rehabilitate, and rehome cats in need. We are committed to providing a safe and nurturing environment for abandoned, abused, and homeless cats until they find their forever homes.
          </Paragraph>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Title level={3}>
            <TeamOutlined /> Our Team
          </Title>
          <Paragraph>
            Our dedicated team of volunteers and staff work tirelessly to help cats find their forever homes. We are a passionate group of animal lovers who believe every cat deserves love and care.
          </Paragraph>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Title level={3}>
            <HeartOutlined /> How You Can Help
          </Title>
          <Paragraph>
            You can make a difference in a cat's life by adopting, volunteering, or donating. Your support helps us provide medical care, food, and shelter for cats in need. Together, we can create a world where every cat has a loving home.
          </Paragraph>
        </Col>
      </Row>
      <Title level={2} style={{ marginTop: 40 }}>Our Story</Title>
      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Image
            src="https://static.wixstatic.com/media/1117be_567595e0c9c24b779a445311fe41bb8c~mv2.jpg/v1/crop/x_15,y_46,w_1103,h_434/fill/w_702,h_278,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1117be_567595e0c9c24b779a445311fe41bb8c~mv2.jpg=crop&w=800&h=800"
            alt="Our Story"
            width="100%"
            height="auto"
          />
        </Col>
        <Col xs={24} sm={12} md={16}>
          <Paragraph>
            CatAdoption was founded in 2010 by a group of cat lovers who were deeply concerned about the plight of homeless cats in the community. Over the years, we have grown into a dedicated team of volunteers and staff who work tirelessly to rescue, rehabilitate, and rehome cats in need.
          </Paragraph>
          <Paragraph>
            Since our founding, we have helped thousands of cats find their forever homes. We believe in the transformative power of love and care, and we are committed to making a lasting impact on the lives of the cats we serve.
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
};

export default About;