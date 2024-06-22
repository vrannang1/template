import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Loading from '../components/Loading';
import Error from '../components/Error';
// import { Typeahead } from 'react-bootstrap-typeahead';
// import 'react-bootstrap-typeahead/css/Typeahead.css';
import ResumeUpload from '../components/ResumeUpload';
// import PdfPreview from '../components/PdfPreview';
// import DocPreview from '../components/DocPreview';
import UserTags from './UserTags';

const GET_USER_PROFILE = gql`
  query GetUserProfile {
    me {
      id
      firstName
      lastName
      email
      tags
      userProfile {
        bio
        location
        resume
        education {
          degree
          college
          start_date
          end_date
          currently_studying
        }
        experience {
          title
          company
          start_date
          end_date
          responsibilities
          current
        }
      }
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UserProfileInput!) {
    updateUserProfile(input: $input) {
      id
      firstName
      lastName
      tags
      userProfile {
        bio
        location
        education {
          degree
          college
          start_date
          end_date
          currently_studying
        }
        experience {
          title
          company
          start_date
          end_date
          responsibilities
          current
        }
      }
    }
  }
`;

const UserProfile = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE);
  const [updateUserProfile, { error: updateError, data: updateData }] = useMutation(UPDATE_USER_PROFILE);

  const [profile, setProfile] = useState({
    bio: '',
    // skills: [],
    location: '',
    education: [{ degree: '', college: '', start_date: '', end_date: '', currently_studying: false }],
    experience: [{ title: '', company: '', start_date: '', end_date: '', responsibilities: '', current: false }]
  });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (data) {
      const userProfile = data.me.userProfile || {};
      setProfile({
        bio: userProfile.bio || '',
        // skills: userProfile.skills || [],
        resume: userProfile.resume || '',
        location: userProfile.location || '',
        education: (userProfile.education || [{ degree: '', college: '', start_date: '', end_date: '', currently_studying: false }])
          .map(edu => ({
            ...edu,
            start_date: edu.start_date ? edu.start_date.slice(0, 7) : '',
            end_date: edu.end_date ? edu.end_date.slice(0, 7) : ''
          })),
        experience: (userProfile.experience || [{ title: '', company: '', start_date: '', end_date: '', responsibilities: '', current: false }])
          .map(exp => ({
            ...exp,
            start_date: exp.start_date ? exp.start_date.slice(0, 7) : '',
            end_date: exp.end_date ? exp.end_date.slice(0, 7) : ''
          }))
      });
    }
  }, [data]);

  useEffect(() => {
    if (updateData) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3 seconds
    }
  }, [updateData]);

  const handleChange = (event, index, field, subField) => {
    const { name, value } = event.target;
    if (profile[field]) {
      const updatedArray = profile[field].map((item, idx) =>
        idx === index ? { ...item, [subField || name]: value } : item
      );
      setProfile({ ...profile, [field]: updatedArray });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  // const handleSkillsChange = (selected) => {
  //   setProfile({ ...profile, skills: selected.map(skill => skill.label) });
  // };

  const handleAddField = (field) => {
    setProfile({
      ...profile,
      [field]: [...profile[field], field === 'education' ? { degree: '', college: '', start_date: '', end_date: '', currently_studying: false } : { title: '', company: '', start_date: '', end_date: '', responsibilities: '', current: false }]
    });
  };

  const handleRemoveField = (index, field) => {
    const updatedArray = profile[field].filter((_, idx) => idx !== index);
    setProfile({ ...profile, [field]: updatedArray });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate date fields
    const isValidDate = date => /^\d{4}-\d{2}$/.test(date);

    const educationIsValid = profile.education.every(edu =>
      isValidDate(edu.start_date) && (edu.end_date === '' || isValidDate(edu.end_date))
    );
    const experienceIsValid = profile.experience.every(exp =>
      isValidDate(exp.start_date) && (exp.end_date === '' || isValidDate(exp.end_date))
    );

    if (!educationIsValid || !experienceIsValid) {
      alert("Please ensure all date fields are in the format YYYY-MM.");
      return;
    }

    updateUserProfile({
      variables: {
        input: {
          bio: profile.bio,
          // skills: profile.skills || [],
          location: profile.location,
          education: profile.education.map(edu => ({
            degree: edu.degree,
            college: edu.college,
            start_date: `${edu.start_date}-01`,
            end_date: edu.end_date ? `${edu.end_date}-01` : null,
            currently_studying: edu.currently_studying
          })),
          experience: profile.experience.map(exp => ({
            title: exp.title,
            company: exp.company,
            start_date: `${exp.start_date}-01`,
            end_date: exp.end_date ? `${exp.end_date}-01` : null,
            responsibilities: exp.responsibilities,
            current: exp.current
          }))
        }
      }
    });
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>User Profile</h2>
          {showSuccess && <Alert variant="success">Profile updated successfully!</Alert>}
          {updateError && <Alert variant="danger">Error updating profile: {updateError.message}</Alert>}
          {data.me.userProfile && <ResumeUpload user={data.me} />}
          <UserTags user={data.me} />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="bio"
                value={profile.bio}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            {/* <Form.Group controlId="skills" className="mt-3">
              <Form.Label>Skills</Form.Label>
              <Typeahead
                id="skills"
                multiple
                allowNew
                newSelectionPrefix="Add a new skill: "
                options={profile.skills.map(skill => ({ label: skill }))}
                selected={profile.skills.map(skill => ({ label: skill }))}
                onChange={handleSkillsChange}
                placeholder="Enter skills..."
              />
            </Form.Group> */}
            <Form.Group controlId="location" className="mt-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={profile.location}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="education" className="mt-3">
              <Form.Label>Education</Form.Label>
              {profile.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleChange(e, index, 'education', 'degree')}
                    className="mt-2"
                  />
                  <Form.Control
                    type="text"
                    placeholder="College"
                    value={edu.college}
                    onChange={(e) => handleChange(e, index, 'education', 'college')}
                    className="mt-2"
                  />
                  <Form.Control
                    type="month"
                    placeholder="Start Date"
                    value={edu.start_date}
                    onChange={(e) => handleChange(e, index, 'education', 'start_date')}
                    className="mt-2"
                  />
                  <Form.Control
                    type="month"
                    placeholder="End Date"
                    value={edu.end_date}
                    onChange={(e) => handleChange(e, index, 'education', 'end_date')}
                    className="mt-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Currently Studying"
                    checked={edu.currently_studying}
                    onChange={(e) => handleChange({ target: { name: 'currently_studying', value: e.target.checked } }, index, 'education')}
                    className="mt-2"
                  />
                  <Button
                    type="button"
                    variant="danger"
                    className="mt-2"
                    onClick={() => handleRemoveField(index, 'education')}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                className="mt-2"
                onClick={() => handleAddField('education')}
              >
                <FaPlus /> Add Education
              </Button>
            </Form.Group>
            <Form.Group controlId="experience" className="mt-3">
              <Form.Label>Experience</Form.Label>
              {profile.experience.map((exp, index) => (
                <div key={index} className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    value={exp.title}
                    onChange={(e) => handleChange(e, index, 'experience', 'title')}
                    className="mt-2"
                  />
                  <Form.Control
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleChange(e, index, 'experience', 'company')}
                    className="mt-2"
                  />
                  <Row className="mt-2">
                    <Col>
                      <Form.Control
                        type="month"
                        placeholder="Start Date"
                        value={exp.start_date}
                        onChange={(e) => handleChange(e, index, 'experience', 'start_date')}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="month"
                        placeholder="End Date"
                        value={exp.end_date}
                        onChange={(e) => handleChange(e, index, 'experience', 'end_date')}
                      />
                    </Col>
                  </Row>
                  <Form.Control
                    type="text"
                    placeholder="Responsibilities"
                    value={exp.responsibilities}
                    onChange={(e) => handleChange(e, index, 'experience', 'responsibilities')}
                    className="mt-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Current Job"
                    checked={exp.current}
                    onChange={(e) => handleChange({ target: { name: 'current', value: e.target.checked } }, index, 'experience')}
                    className="mt-2"
                  />
                  <Button
                    type="button"
                    variant="danger"
                    className="mt-2"
                    onClick={() => handleRemoveField(index, 'experience')}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                className="mt-2"
                onClick={() => handleAddField('experience')}
              >
                <FaPlus /> Add Experience
              </Button>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
