import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import { errorHash } from "../lib/errors";
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';

const VERIFY_MUTATION = gql`
  mutation VerifyUser($email: String!, $verificationCode: String!) {
    verifyUser(email: $email, verificationCode: $verificationCode) {
      token
      user {
        id
        username
        firstName
        email
        role
        tags
        gravatarMd5
      }
    }
  }
`;

const useErrors = () => {
  const [errors, setErrors] = useState({});

  const clearError = (field) =>
    setErrors(Object.assign(errors, { [field]: null }));

  return [errors, setErrors, clearError];
};

const Verify = () => {
  const [errors, setErrors] = useErrors();
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const email = location.state?.email || "";

  const [verificationCode, setVerificationCode] = useState("");
  const [verifyUser, { loading }] = useMutation(VERIFY_MUTATION, {
    variables: { email, verificationCode },
    onCompleted: (data) => {
      login({ token: data.verifyUser.token, user: data.verifyUser.user });
      if (data.verifyUser.user.role === "employer") {
        navigate("/employers-dashboard");
      } else {
        navigate("/dashboard");
      }
    },
    onError: (error) => [setErrors(errorHash(error))]
  });

  const isFormValid = () => {
    return (
      verificationCode.length > 0
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    verifyUser();
  };

  if (loading) return <Loading />;

  return (

    <Container className="page page-center">
        <Row className="justify-content-center py-4">
          <Col md={5}>
            <Card className="card-md">  {/* Use Card here */}
              <Card.Body>
                <h2 className="h2 text-center mb-4">Verify your account</h2>
                <Form className="signin" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Verification Code</Form.Label>
                    {errors.general && <Alert variant="danger" className="mt-3">{errors.general}</Alert>}
                    <Form.Control type="text"
                      name="verificationCode"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Verification Code"
                      autoComplete="off"
                      isInvalid={Boolean(errors.verificationCode)} />
                    <Form.Control.Feedback type="invalid">
                      {errors.verificationCode}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="rememberMe">
                    <Form.Check type="checkbox" label="Remember me on this device" />
                  </Form.Group>

                  <Button type="submit" variant="primary" disabled={!isFormValid()} className="w-100">
                    {loading ? "Signing..." : "Sign in"}</Button>
                </Form>
              </Card.Body>
            </Card>
            <div className="text-center text-secondary mt-0">
              Don't have account yet? <Link to="/register">Need an account?</Link>
            </div>
          </Col>
        </Row>
      </Container>
  );
};

export default Verify;
