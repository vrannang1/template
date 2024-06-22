// Recommendations.jsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECOMMENDED_JOBS } from '../graphql/queries';
import JobCard from '../components/JobCard';
import noDataFoundImage from "../assets/images/undraw_data_points_re_vkpq.svg";

const Recommendations = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_RECOMMENDED_JOBS, { variables: { userId, limit: 10, offset: 0 } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="recommendations">
      {data.recommendedJobs.length > 0 ? (
        <>
          {data.recommendedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </>
      ) : (
        <div className="text-center mt-4">
          <img src={noDataFoundImage} alt="No jobs found" style={{ width: '400px', height: '500px' }} />
          <h3>No jobs found. Please update your skills to get recommendations!</h3>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
