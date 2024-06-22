import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';

export const GET_APPLICATIONS_BY_JOB = gql`
  query GetApplicationsByJob($jobId: String!, $limit: Int, $offset: Int) {
    applicationsByJob(jobId: $jobId, limit: $limit, offset: $offset) {
      applications {
        id
        user {
          firstName
        }
        resume
        status
        insertedAt
        job {
          title
        }
      }
      totalCount
    }
  }
`;

const LIMIT = 5;

const JobApplications = () => {
  const { jobId } = useParams();

  const [offset, setOffset] = useState(0);

  const { loading, error, data } = useQuery(GET_APPLICATIONS_BY_JOB, {
    variables: { jobId, limit: LIMIT, offset },
  });

  const handleGoBack = () => {
    window.close();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const totalPages = Math.ceil(data.applicationsByJob.totalCount / LIMIT);
  const currentPage = offset / LIMIT + 1;
  const jobTitle = data.applicationsByJob.applications[0]?.job.title;

  return (
    <div className="card">
      <div className="card-header">
        <h3>
          Job Applications for <span className="text-primary fw-bold">{jobTitle}</span>
        </h3>
        <button className="btn btn-secondary mt-3" onClick={handleGoBack}>Go Back</button>
      </div>
      <div className="table-responsive">
        <table className="table card-table table-vcenter text-nowrap datatable">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Resume</th>
              <th>Status</th>
              <th>Applied On</th>
            </tr>
          </thead>
          <tbody>
            {data.applicationsByJob.applications.map(application => (
              <tr key={application.id}>
                <td>{application.user.firstName}</td>
                {}
                <td><a href={application.resume} target="_blank" rel="noopener noreferrer">View Resume</a></td>
                <td>{application.status}</td>
                <td>{application.insertedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <button
          className="btn btn-secondary"
          onClick={() => setOffset(prev => Math.max(prev - LIMIT, 0))}
          disabled={offset === 0}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="btn btn-secondary"
          onClick={() => setOffset(prev => Math.min(prev + LIMIT, (totalPages - 1) * LIMIT))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobApplications;
