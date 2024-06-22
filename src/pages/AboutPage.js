import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  return (
    <div>
      <Helmet>
        <title>About Us - Punesi</title>
        <meta name="description" content="Learn more about Punesi, our mission, and what we offer." />
      </Helmet>
      <Container className="my-5">
        <h1 className="text-center mb-4">About Punesi</h1>

        <Row className="mb-5">
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <h2 className="text-center">Our Mission</h2>
                <p className="text-center">
                  At Punesi, our mission is to connect job seekers with their dream jobs and help employers find the best talent for their companies. We believe in creating a platform that is both user-friendly and efficient, making the job search and hiring process as seamless as possible.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h3 className="text-center">For Job Seekers</h3>
                <p>
                  Explore thousands of job listings from various industries. Create a profile, upload your resume, and apply to jobs that match your skills and interests. Get personalized job recommendations and stay updated with the latest job openings.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h3 className="text-center">For Employers</h3>
                <p>
                  Post job listings and manage applications with ease. Find the best candidates using our advanced search and filtering options. Create a company profile to showcase your brand and attract top talent.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h3 className="text-center">For Everyone</h3>
                <p>
                  Our platform is designed to be accessible and easy to use for everyone. We are constantly updating and improving our features to ensure the best user experience. Join our community and start your job search or hiring process with Punesi today.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <Card className="shadow-sm bg-primary text-white">
              <Card.Body>
                <h2 className="text-center">Our Story</h2>
                <p className="text-center">
                  Punesi was founded with the vision of creating a better job portal that caters to the needs of both job seekers and employers. Our team is dedicated to providing the best possible service and continuously improving our platform to meet the evolving needs of the job market.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <h2 className="text-center">Contact Us</h2>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Your Name" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Your Email" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control as="textarea" rows={5} placeholder="Your Message" required />
                  </Form.Group>
                  <div className="text-center">
                    <Button variant="primary" type="submit">Send Message</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage;
