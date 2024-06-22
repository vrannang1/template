import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { errorHash } from "../lib/errors";
import { Form, Button, Card } from 'react-bootstrap';

const SIGNUP_MUTATION = gql`
  mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
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


const Signup = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useErrors();
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    termsAccepted: false
  });

  const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: credentials,
    onCompleted: (data) => {
      navigate("/verify", { state: { email: data.signup.email } });
    },
    onError: (error) => [setErrors(errorHash(error))]
  });

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setCredentials((credentials) => ({
      ...credentials,
      [name]: type === "checkbox" ? checked : value,
    }));
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
              <h2 className="h2 text-center mb-4">Create new account</h2>

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
    // <form className="signup" onSubmit={handleSubmit}>
    //   <h2>Sign Up</h2>
    //   <h3>
    //     <Link to="/sign-in">Have an account?</Link>
    //   </h3>
    //   <Error error={error} />
    //   <fieldset>
    //     <label htmlFor="firstName">First Name</label>
    //     <input
    //       type="text"
    //       name="firstName"
    //       id="firstName"
    //       required
    //       value={credentials.firstName}
    //       onChange={handleChange}
    //     />
    //     <label htmlFor="lastName">Last Name</label>
    //     <input
    //       type="text"
    //       name="lastName"
    //       id="lastName"
    //       required
    //       value={credentials.lastName}
    //       onChange={handleChange}
    //     />
    //     <label htmlFor="email">Email</label>
    //     <input
    //       type="email"
    //       name="email"
    //       id="email"
    //       required
    //       value={credentials.email}
    //       onChange={handleChange}
    //     />
    //     <label htmlFor="password">Password</label>
    //     <input
    //       type="password"
    //       name="password"
    //       id="password"
    //       required
    //       value={credentials.password}
    //       onChange={handleChange}
    //     />
    //     <button type="submit" disabled={!isFormValid()}>
    //       Sign Up
    //     </button>
    //   </fieldset>
    // </form>
  );
};

export default Signup;
