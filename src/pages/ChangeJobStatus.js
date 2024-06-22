// ChangeJobStatus.js
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { GET_JOB_OPTIONS_QUERY } from "../graphql/queries";
import Loading from '../components/Loading';

export const UPDATE_JOB_STATUS = gql`
  mutation UpdateJobStatus($id: ID!, $status: String!) {
    updateJobStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;


const ChangeJobStatus = ({ job }) => {
  const [status, setStatus] = useState('');

  const { data: optionsData, loading: optionsLoading } = useQuery(GET_JOB_OPTIONS_QUERY);


  const [updateJobStatus] = useMutation(UPDATE_JOB_STATUS);

  const handleStatusChange = () => {
    updateJobStatus({ variables: { id: job.id, status } });
  };

  if (optionsLoading) return <Loading />;
  const { statuses } = optionsData.jobOptions;

  return (
    <div className="input-group">
      <select defaultValue={job.status} onChange={(e) => setStatus(e.target.value)} className="form-select">
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <button className="btn" onClick={handleStatusChange}>Update</button>
    </div>
  );
};

export default ChangeJobStatus;
