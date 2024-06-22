import React, { useState, useEffect } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { errorHash } from "../lib/errors";
import { GET_JOB_OPTIONS_QUERY } from "../graphql/queries";
import { loadStripe } from '@stripe/stripe-js';
import Loading from "../components/Loading";
import Error from "../components/Error";
import RichTextEditor from "../components/RichTextEditor";

const stripePromise = loadStripe('pk_test_51Kdjt9AVBMWcodtc0sYTvNjY5VYDZBInFigZoqBduYiGx4undQ2g2KlXzIrOGSZ3HcVG4SeP4vVhmX1tLc8VSEwg00yuTVg6Vs');

const useErrors = () => {
  const [errors, setErrors] = useState({});

  const clearError = (field) =>
    setErrors(Object.assign(errors, { [field]: null }));

  return [errors, setErrors, clearError];
};


const CREATE_CHECKOUT_SESSION_MUTATION = gql`
  mutation CreateCheckoutSession($jobId: String!, $amount: Int!) {
    createCheckoutSession(jobId: $jobId, amount: $amount) {
      checkoutSessionId
    }
  }
`;

const CREATE_JOB_MUTATION = gql`
  mutation CreateJob(
    $title: String!
    $description: String!
    $tags: [String!]
    $companyName: String!
    $companyLocation: String!
    $jobLocation: [String!]
    $category: String!
    $jobType: String!
  ) {
    createJob(
      title: $title
      description: $description
      tags: $tags
      companyName: $companyName
      companyLocation: $companyLocation
      jobLocation: $jobLocation
      category: $category
      jobType: $jobType
    ) {
      id
      title
      description
      category
      jobType
      companyName
      companyLocation
      jobLocation
      tags
    }
  }
`;

const UPDATE_JOB_MUTATION = gql`
  mutation UpdateJob(
    $id: String!
    $title: String
    $description: String
    $tags: [String!]
    $companyName: String
    $companyLocation: String
    $jobLocation: [String]
    $category: String
    $jobType: String
  ) {
    updateJob(
      id: $id
      title: $title
      description: $description
      tags: $tags
      companyName: $companyName
      companyLocation: $companyLocation
      jobLocation: $jobLocation
      category: $category
      jobType: $jobType
    ) {
      id
      title
      description
      category
      jobType
      companyName
      companyLocation
      jobLocation
      tags
    }
  }
`;

const GET_JOB_QUERY = gql`
  query GetJob($id: ID!) {
    job(id: $id) {
      id
      title
      description
      category
      jobType
      companyName
      companyLocation
      jobLocation
      tags
    }
  }
`;

const JobForm = () => {
  const [errors, setErrors] = useErrors();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    jobType: "",
    companyName: "",
    companyLocation: "",
    jobLocation: [],
    tags: "",
  });

  const { data: optionsData, loading: optionsLoading } = useQuery(GET_JOB_OPTIONS_QUERY);

  const [createJob, { loading: creating }] = useMutation(CREATE_JOB_MUTATION, {
    onCompleted: async (data) => {
      const jobId = data.createJob.id;
      const amount = 1000; // Replace with the actual amount
      createCheckoutSession({ variables: { jobId, amount } });
    },
    onError: (error) => setErrors(errorHash(error)),
  });

  const [updateJob, { loading: updating }] = useMutation(UPDATE_JOB_MUTATION, {
    onCompleted: () => navigate("/job-list"),
    onError: (error) => [setErrors(errorHash(error))]
  });

  const [createCheckoutSession, { loading: creatingSession }] = useMutation(CREATE_CHECKOUT_SESSION_MUTATION, {
    onCompleted: async (data) => {
      const { checkoutSessionId } = data.createCheckoutSession;
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: checkoutSessionId });
      if (error) {
        setErrors(errorHash(error));
      }
    },
    onError: (error) => setErrors(errorHash(error)),
  });

  const { data, loading: fetching, error: fetchError } = useQuery(GET_JOB_QUERY, {
    variables: { id },
    skip: !id,
    onCompleted: (data) => {
      if (data && data.job) {
        setFormData({
          title: data.job.title || "",
          description: data.job.description || "",
          category: data.job.category || "",
          jobType: data.job.jobType || "",
          companyName: data.job.companyName || "",
          companyLocation: data.job.companyLocation || "",
          jobLocation: data.job.jobLocation || [],
          tags: data.job.tags.join(", ") || "",
        });
      }
    },
  });

  useEffect(() => {
    if (id && data) {
      setFormData({
        title: data.job.title || "",
        description: data.job.description || "",
        category: data.job.category || "",
        jobType: data.job.jobType || "",
        companyName: data.job.companyName || "",
        companyLocation: data.job.companyLocation || "",
        jobLocation: data.job.jobLocation || [],
        tags: data.job.tags.join(", ") || "",
      });
    }
  }, [id, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  const handleJobLocationChange = (selected) => {

    console.log(selected.map(jobLocation => jobLocation.label))
    setFormData((prevData) => ({
      ...prevData,
      jobLocation: selected.map(jobLocation => jobLocation.label),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };
    if (id) {
      updateJob({ variables: { id, ...input } });
    } else {
      createJob({ variables: { ...input } });
    }
  };

  if (optionsLoading || fetching || creating || updating || creatingSession) return <Loading />;
  if (fetching || creating || updating) return <Loading />;
  if (fetchError) return <Error error={fetchError} />;

  const { jobTypes, categories } = optionsData.jobOptions;

  console.log(errors, formData);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2>{id ? "Edit Job" : "Create Job"}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="description" className="mt-3 mb-3">
              <Form.Label>Description</Form.Label>
              <RichTextEditor
                value={formData.description}
                onChange={handleDescriptionChange}
              />
              {/* <Form.Control
                as="textarea"
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              /> */}
            </Form.Group>
            <Form.Group controlId="category" className="mt-6">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                isInvalid={Boolean(errors.category)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="jobType" className="mt-3">
              <Form.Label>Job Type</Form.Label>
              <Form.Control
                as="select"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                isInvalid={Boolean(errors.jobType)}
                required
              >
                <option value="">Select Job Type</option>
                {jobTypes.map((jobType) => (
                  <option key={jobType} value={jobType}>
                    {jobType}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="companyName" className="mt-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="companyLocation" className="mt-3">
              <Form.Label>Company Location</Form.Label>
              <Form.Control
                type="text"
                name="companyLocation"
                value={formData.companyLocation}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="jobLocation" className="mt-3">
              <Form.Label>Job Location</Form.Label>
              <Typeahead
                id="jobLocation"
                multiple
                options={[]} // You need to populate this with location data
                selected={formData.jobLocation}
                onChange={handleJobLocationChange}
                allowNew
                newSelectionPrefix="Add a new location: "
                placeholder="Type a location and press enter"
              />
            </Form.Group>
            <Form.Group controlId="tags" className="mt-3">
              <Form.Label>Tags (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-4">
              {id ? "Update Job" : "Create Job"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default JobForm;
