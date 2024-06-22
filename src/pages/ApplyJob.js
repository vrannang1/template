import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Loading from "../components/Loading";
import Error from "../components/Error";

const APPLY_JOB_MUTATION = gql`
  mutation ApplyJob($jobId: String!, $resume: Upload!, $coverLetter: String) {
    applyForJob(jobId: $jobId, resume: $resume, coverLetter: $coverLetter) {
      id
      status
    }
  }
`;

const ApplyJob = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const [applyForJob, { loading, data, error }] = useMutation(APPLY_JOB_MUTATION, {
    onCompleted: () => navigate("/job-list"),
    onError: (error) => console.log("error ", error)
  });

  console.log("data ", data , " error ", error);

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    setResume(file);
  };

  const handleCoverLetterChange = (event) => {
    setCoverLetter(event.target.value);
  };
  console.log(resume)

  const handleSubmit = (event) => {
    event.preventDefault();
    applyForJob({
      variables: {
        jobId,
        resume,
        coverLetter
      }
    });
  };


  console.log("error ", error);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2>Apply for Job</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="resume">
              <Form.Label>Resume</Form.Label>
              <Form.Control
                type="file"
                name="resume"
                onChange={handleResumeChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="coverLetter" className="mt-3">
              <Form.Label>Cover Letter</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="coverLetter"
                value={coverLetter}
                onChange={handleCoverLetterChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-4">
              Apply
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplyJob;
