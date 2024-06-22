import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import Error from '../components/Error';

const UPDATE_COMPANY_PROFILE = gql`
  mutation UpdateCompanyProfile($input: CompanyProfileInput!) {
    updateCompanyProfile(input: $input) {
      id
      companyProfile {
        companyName
        companyDescription
        website
        location
      }
    }
  }
`;

const CompanyProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user.companyProfile || {});
  const [updateCompanyProfile, { loading, error }] = useMutation(UPDATE_COMPANY_PROFILE, {
    onCompleted: data => {
      // Handle completion logic
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCompanyProfile({ variables: { input: profile } });
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="companyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={profile.companyName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="companyDescription">
              <Form.Label>Company Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="companyDescription"
                value={profile.companyDescription}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="website">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={profile.website}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit">Save</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyProfile;
