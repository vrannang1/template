import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      message
    }
  }
`;

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await resetPassword({ variables: { token, password } });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="page page-center">
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>Reset Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
