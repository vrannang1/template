import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { errorHash } from "../lib/errors";
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';

const SIGNIN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

const useErrors = () => {
  const [errors, setErrors] = useState({});

  const clearError = (field) =>
    setErrors(Object.assign(errors, { [field]: null }));

  return [errors, setErrors, clearError];
};


const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errors, setErrors] = useErrors();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const isFormValid = () => {
    return credentials.email.length > 0 && credentials.password.length > 0;
  };

  const [signin, { loading }] = useMutation(SIGNIN_MUTATION, {
    variables: credentials,
    onCompleted: (data) => {
      login({ user: data.signin });
      navigate("/verify", { state: { email: data.signin.email } });
    },
    onError: (error) => [setErrors(errorHash(error))]
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      signin();
    }
  };

  return (
    <Container className="page page-center">
      <Row className="justify-content-center py-4">
        <Col md={5}>
          <Card className="card-md">  {/* Use Card here */}
            <Card.Body>
              <h2 className="h2 text-center mb-4">Login to your account</h2>
              <Form className="signin" onSubmit={handleSubmit}>
                {errors.general && <Alert variant="danger" className="mt-3">{errors.general}</Alert>}
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    autoComplete="off"
                    isInvalid={Boolean(errors.email)} />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-2" controlId="password">
                  <Form.Label>
                    Password
                    <span className="form-label-description">
                      <Link to="/forgot-password">I forgot password</Link>
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Your password"
                    autoComplete="off"
                    isInvalid={Boolean(errors.email)}
                  />
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

export default Signin;
