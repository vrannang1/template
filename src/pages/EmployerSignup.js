import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { errorHash } from "../lib/errors";
import { Form, Button, Card } from 'react-bootstrap';

const EMPLOYER_SIGNUP_MUTATION = gql`
  mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password, role: "employer") {
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

const EmployerSignup = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useErrors();
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    termsAccepted: false
  });

  const [signup, { error, loading }] = useMutation(EMPLOYER_SIGNUP_MUTATION, {
    variables: credentials,
    onCompleted: (data) => {
      navigate("/verify", { state: { email: data.signup.email } });
    },
    onError: (error) => [setErrors(errorHash(error))]
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const isFormValid = () => {
    return (
      credentials.firstName.length > 0 &&
      credentials.lastName.length > 0 &&
      credentials.email.length > 0 &&
      credentials.password.length > 0 &&
      credentials.termsAccepted
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      signup();
    }
  };

  return (
    <div>
          <Error error={error} />
          <Form
            onSubmit={handleSubmit}
            autoComplete="off"
            noValidate
            className="card card-md" // Apply Tabler's card styling
          >
            <Card.Body>
              <h2 className="h2 text-center mb-4">Create Employer account</h2>

              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstName" onChange={handleChange} placeholder="Enter name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" onChange={handleChange} placeholder="Enter name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" onChange={handleChange} placeholder="Enter email" isInvalid={Boolean(errors.emailHash)} />
                <Form.Control.Feedback type="invalid">
                  {errors.emailHash}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" onChange={handleChange} placeholder="Password" autoComplete="off" />
                {/* Remove or adjust eye icon */}
              </Form.Group>

              <Form.Group className="mb-3" name="termsAccepted" controlId="termsAgreement" >
                <Form.Check
                  type="checkbox"
                  name="termsAccepted"
                  required
                  checked={credentials.termsAccepted}
                  onChange={handleChange}
                  label={
                    <>
                      Agree to the <a href="./terms-of-service.html" tabIndex="-1">terms and policy</a>.
                    </>
                  }
                />
              </Form.Group>

              <div className="form-footer">
                <Button variant="primary" type="submit" className="w-100" disabled={!isFormValid()}>
                  {loading ? "Creating Account..." : "Create new account"}
                </Button>
              </div>
            </Card.Body>
          </Form>
          <div className="text-center text-secondary mt-3">
            Already have account? <Link to="/sign-in" tabIndex="-1">Sign in</Link>
          </div>
    </div>
  );
};

export default EmployerSignup;
