import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { errorHash } from "../lib/errors";
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';

export const RESET_PASSWORD = gql`
  mutation ResetPassword($resetToken: String!, $newPassword: String!) {
    resetPassword(resetToken: $resetToken, newPassword: $newPassword) {
      id
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

const VerifyReset = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useErrors();
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, {
    variables: { resetToken, newPassword },
    onCompleted: (data) => {
      navigate("/login");
    },
    onError: (error) => [setErrors(errorHash(error))]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetPassword();
  };

  return (
    <Container className="page page-center">
      <Row className="justify-content-center py-4">
        <Col md={4}>
          <Card className="card-md">  {/* Use Card here */}
            <Card.Body>
              <h2 className="h2 text-center mb-4">Verify and Reset your password</h2>
              <Form className="signin" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Reset Verification Code</Form.Label>
                  {errors.general && <Alert variant="danger" className="mt-3">{errors.general}</Alert>}
                  <Form.Control type="email"
                    name="email"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    placeholder="Reset Code"
                    autoComplete="off"
                    isInvalid={Boolean(errors.resetToken)} />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-2" controlId="password">
                  <Form.Label>
                    New Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Your password"
                    autoComplete="off"
                    isInvalid={Boolean(errors.newPassword)}
                  />
                </Form.Group>

                <Button type="submit" variant="primary" disabled={loading} className="w-100">
                  {loading ? "Signing..." : "Sign in"}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>Verification Code</label>
    //     <input
    //       type="text"
    //       value={resetToken}
    //       onChange={(e) => setResetToken(e.target.value)}
    //       required
    //     />
    //   </div>
    //   <div>
    //     <label>New Password</label>
    //     <input
    //       type="password"
    //       value={newPassword}
    //       onChange={(e) => setNewPassword(e.target.value)}
    //       required
    //     />
    //   </div>
    //   <button type="submit">Reset Password</button>
    //   {loading && <p>Resetting...</p>}
    //   {error && <p>Error: {error.message}</p>}
    //   {data && <p>Password reset successfully!</p>}
    // </form>
  );
};

export default VerifyReset;
