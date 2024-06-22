import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useAuth } from '../context/AuthContext';

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      id
    }
  }
`;

const LOCK_ACCOUNT_MUTATION = gql`
  mutation LockAccount($input: LockAccountInput!) {
    lockAccount(input: $input) {
      id
    }
  }
`;

const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;

const Settings = () => {
  const [passwordInput, setPasswordInput] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const [lockInput, setLockInput] = useState({
    reason: ''
  });

  const { logout } = useAuth();
  const navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  const [changePassword, { loading: changePasswordLoading, error: changePasswordError }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    onCompleted: () => {
      setPasswordChanged(true);
      setTimeout(() => {
        logout();
        navigate('/sign-in');
      }, 3000);
    }
  });
  const [lockAccount, { loading: lockAccountLoading, error: lockAccountError }] = useMutation(LOCK_ACCOUNT_MUTATION);
  const [requestPasswordReset, { loading: requestPasswordResetLoading, error: requestPasswordResetError }] = useMutation(REQUEST_PASSWORD_RESET_MUTATION);

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordInput({
      ...passwordInput,
      [name]: value
    });
  };

  const handleLockChange = (event) => {
    const { name, value } = event.target;
    setLockInput({
      ...lockInput,
      [name]: value
    });
  };

  const handleResetChange = (event) => {
    setResetEmail(event.target.value);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    changePassword({ variables: { input: passwordInput } });
  };

  const handleLockSubmit = (event) => {
    event.preventDefault();
    lockAccount({ variables: { input: lockInput } });
  };

  const handleResetSubmit = (event) => {
    event.preventDefault();
    requestPasswordReset({ variables: { email: resetEmail } });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Settings</h2>

          <h3>Change Password</h3>
          {passwordChanged && <Alert variant="success">Password changed successfully. Please sign in with your new password.</Alert>}
          {changePasswordLoading && <Loading />}
          {changePasswordError && <Error error={changePasswordError} />}
          <Form onSubmit={handlePasswordSubmit}>
            <Form.Group controlId="currentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={passwordInput.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={passwordInput.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>
            <Button type="submit">Change Password</Button>
          </Form>

          <h3>Lock Account</h3>
          {lockAccountLoading && <Loading />}
          {lockAccountError && <Error error={lockAccountError} />}
          <Form onSubmit={handleLockSubmit}>
            <Form.Group controlId="reason">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                type="text"
                name="reason"
                value={lockInput.reason}
                onChange={handleLockChange}
                required
              />
            </Form.Group>
            <Button type="submit">Lock Account</Button>
          </Form>

          <h3>Forgot Password</h3>
          {requestPasswordResetLoading && <Loading />}
          {requestPasswordResetError && <Error error={requestPasswordResetError} />}
          <Form onSubmit={handleResetSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={resetEmail}
                onChange={handleResetChange}
                required
              />
            </Form.Group>
            <Button type="submit">Request Password Reset</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
