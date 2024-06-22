// EmployerDashboard.js
import React, { useState } from 'react';
import JobApplications from './JobApplications';
import EmployerJobs from './EmployerJobs';
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EmployerDashboard = () => {
  const { user, loading, error } = useAuth();
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleJobSelect = (jobId) => {
    setSelectedJobId(jobId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employerId = user?.id;
  console.log("selectedJobId ", selectedJobId, employerId);

  return (
    <Container className="page page-center">
      <Row className="page-wrapper">
        <Col>
          <div className="page-header d-print-none">
            <Container>
              <Row className="g-2 align-items-center">
                <Col>
                  <Breadcrumb className="mb-3">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                  </Breadcrumb>
                  <h2>Dashboard</h2>
                </Col>
                <Col className="d-flex justify-content-end" xs="auto">
                  <Button as={Link} variant="primary" to="/job-form">
                    <span className="d-none d-md-inline ms-1">Post a job</span>
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>

      <Row className="page-body">
        <Col>
          <Container>
            <Row className="row-deck row-cards">
              <Col xs={12}>
                <EmployerJobs onJobSelect={handleJobSelect} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      {selectedJobId && <JobApplications jobId={selectedJobId} />}
    </Container>
  );
};

export default EmployerDashboard;
