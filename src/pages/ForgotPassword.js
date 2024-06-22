import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
      success
    }
  }
`;

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD_MUTATION, {
        onCompleted: (data) => {
            setMessage(data.forgotPassword.message);

            console.log(data.forgotPassword);

            if (data.forgotPassword.success) {
                navigate("/verify-reset", { state: { email: email } });
            }
        },
        onError: (error) => {
            console.error(error);
            setError('An error occurred. Please try again.');
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await forgotPassword({ variables: { email } });
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
      <Container className="page page-center">
      <Row className="justify-content-center py-4">
        <Col md={4}>
          <Card className="card-md">  {/* Use Card here */}
            <Card.Body>
              <h2 className="h2 text-center mb-4">Forgot Password</h2>
              {message ? <Alert variant="info" className="mt-3">{message}</Alert>
              : <Form className="signin" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="off" />
              </Form.Group>
              <Button type="submit" variant="primary" disabled={loading} className="w-100">
                {loading ? "Sending..." : "Send Reset Instructions"}
              </Button>
            </Form>
              }
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Card.Body>
          </Card>
          <div className="text-center text-secondary mt-0">
            Remember your account? <Link to="/sign-in">Sign in</Link>
          </div>
        </Col>
      </Row>
    </Container>
    );
};

export default ForgotPassword;
