import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Form, Button } from 'react-bootstrap';
import JobCard from '../components/JobCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { GET_JOB_OPTIONS_QUERY, CREATE_SEARCH } from "../graphql/queries";
import noDataFoundImage from "../assets/images/undraw_empty_re_opql.svg";
import { useAuth } from '../context/AuthContext';

const GET_JOBS_QUERY = gql`
  query GetJobs($filter: JobFilter, $limit: Int, $offset: Int) {
    jobsCount(filter: $filter)
    jobs(filter: $filter, limit: $limit, offset: $offset) {
      id
      title
      slug
      bookmarked
      bookmarkId
      description
      category
      jobType
      isExternal
      companyName
      jobLocation
      tags
    }
  }
`;

const JobList = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    title: '',
    category: '',
    jobType: '',
    jobLocation: '',
    isRemote: false,
    status: ''
  });

  const [searchFilters, setSearchFilters] = useState({
    title: '',
    category: '',
    jobType: '',
    jobLocation: '',
    isRemote: false,
    status: ''
  });

  const isFilterApplied = (filters) => {
    return filters.title.trim() !== '' ||
      filters.category.trim() !== '' ||
      filters.jobType.trim() !== '' ||
      filters.jobLocation.trim() !== '' ||
      filters.isRemote ||
      filters.status.trim() !== '';
  };

  const [currentPage, setCurrentPage] = useState(0);
  const limit = 6;

  const { data: optionsData, loading: optionsLoading } = useQuery(GET_JOB_OPTIONS_QUERY);

  const { loading, error, data, refetch } = useQuery(GET_JOBS_QUERY, {
    variables: { filter: searchFilters, limit, offset: currentPage * limit },
  });

  const [createSearch] = useMutation(CREATE_SEARCH);

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!isFilterApplied(filters)) {
      // Skip saving an empty search query
      return;
    }

    setSearchFilters(filters);
    setCurrentPage(0); // Reset to the first page
    if (user) {
      await createSearch({
        variables: {
          input: {
            userId: user.id, query: filters.title,
            category: filters.category, jobType: filters.jobType,
            isRemote: filters.isRemote, jobLocation: filters.jobLocation
          }
        }
      });
    }
    refetch();
  };

  const handleNext = () => {
    if ((currentPage + 1) * limit < data.jobsCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading || optionsLoading) return <Loading />;
  if (error) return <Error error={error} />;

  const { jobTypes, categories, statuses } = optionsData.jobOptions;
  return (
    <div className="page-wrapper">
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <h2 className="page-title">
                Search for Jobs
              </h2>
            </div>
            <div className="col-auto ms-auto d-print-none">
              <h4>{data.jobsCount} jobs found</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="row g-4">
            <div className="col-md-3">
              <Form onSubmit={handleSearch}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={filters.title}
                    onChange={handleChange}
                    placeholder="search by title"
                    autoComplete="off" />
                </Form.Group>
                <Form.Group controlId="category" className="mt-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
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
                    value={filters.jobType}
                    onChange={handleChange}
                  >
                    <option value="">Select Job Type</option>
                    {jobTypes.map((jobType) => (
                      <option key={jobType} value={jobType}>
                        {jobType}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="jobLocation" className="mt-3">
                  <Form.Label>Job Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="jobLocation"
                    value={filters.jobLocation}
                    onChange={handleChange}
                    placeholder="search by location"
                    autoComplete="off" />
                </Form.Group>
                <Form.Group controlId="isRemote" className="mt-3">
                  <Form.Check
                    type="checkbox"
                    name="isRemote"
                    label="Remote"
                    checked={filters.isRemote}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="status" className="mt-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    {statuses.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">
                  Search
                </Button>
              </Form>
            </div>
            <div className="col-md-9">
              <div className="row row-cards">
                <div className="space-y">
                  {console.log(data.jobs)}
                  {data.jobs.length > 0 ? (
                    <>
                      {data.jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </>
                  ) : (
                    <div className="text-center mt-4">
                      <img src={noDataFoundImage} alt="No jobs found" style={{ width: '400px', height: '500px' }} />
                      <h3>No jobs found</h3>
                    </div>
                  )}
                </div>

                {data.jobs.length > 0 && (<div className="pagination-buttons mt-4 text-center">
                  <Button
                    variant="secondary"
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    disabled={(currentPage + 1) * limit >= data.jobsCount}
                    className="ms-2"
                  >
                    Next
                  </Button>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;
