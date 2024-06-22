import React from "react";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import EmployerSignup from "./EmployerSignup";
import Signup from "./Signup";

const RegisterPage = () => {
  return (
    <Container className="page page-center">
      <Row className="justify-content-center py-4">
        <Col md={5}>
          <Tabs defaultActiveKey="jobSeeker" id="register-tabs" className="mb-3">
            <Tab eventKey="jobSeeker" title="Job Seeker">
              <Signup />
            </Tab>
            <Tab eventKey="employer" title="Employer">
              <EmployerSignup />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;