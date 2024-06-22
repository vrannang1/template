// EmployerJobs.js
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useAuth } from '../context/AuthContext';
import ChangeJobStatus from './ChangeJobStatus';
import { Link } from 'react-router-dom';

export const GET_JOBS_BY_EMPLOYER = gql`
  query GetJobsByEmployer($employerId: String!, $limit: Int, $offset: Int) {
    jobsByEmployer(employerId: $employerId, limit: $limit, offset: $offset) {
    jobs {
    id
      title
      slug
      status
      insertedAt
    }
      totalCount
    }
  }
`;

const LIMIT = 6;

const EmployerJobs = () => {
  const { user } = useAuth();
  const employerId = user?.id;

  const [offset, setOffset] = useState(0);

  const { loading, error, data } = useQuery(GET_JOBS_BY_EMPLOYER, {
    variables: { employerId, limit: LIMIT, offset: 0 },
  });

  const openJobApplications = (jobId) => {
    window.open(`/job-applications/${jobId}`, '_blank', 'noopener,noreferrer');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const totalPages = Math.ceil(data.jobsByEmployer.totalCount / LIMIT);
  const currentPage = offset / LIMIT + 1;

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h3>Jobs List</h3>
        </div>
        <div className="table-responsive">
          <table className="table card-table table-vcenter text-nowrap datatable">
            <thead>
              <tr>
                <th className="w-1"><input className="form-check-input m-0 align-middle" type="checkbox" aria-label="Select all invoices" /></th>
                <th>Title</th>
                <th>Created</th>
                <th>Status</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {data.jobsByEmployer.jobs.map(job => (
                <tr key={job.id}>
                  <td><input className="form-check-input m-0 align-middle" type="checkbox" aria-label="Select invoice" /></td>
                  <td><Link to={`/jobs/${job.slug}`} className="text-reset" tabIndex="-1">{job.title}</Link></td>
                  <td>{job.insertedAt}</td>
                  <td>{job.status}</td>
                  <td className="text-end">
                    <span className="dropdown">
                      <button className="btn align-text-top" onClick={() => openJobApplications(job.id)}>View Applications</button>
                    </span>
                  </td>
                  <td className="text-end">
                    <span className="dropdown">
                      <ChangeJobStatus job={job} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

      </div>
    </div>
  );
};

export default EmployerJobs;
