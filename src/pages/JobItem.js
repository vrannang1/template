// JobItem.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useAuth } from '../context/AuthContext';
import { BOOKMARK_JOB, DELETE_BOOKMARK } from '../graphql/queries';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

const buttonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  display: 'flex',
  alignItems: 'center'
};

const JobItem = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookmarkJob] = useMutation(BOOKMARK_JOB, {
    update(cache, { data: { createBookmark } }) {
      cache.modify({
        id: cache.identify(job),
        fields: {
          bookmarked() {
            return true;
          },
          bookmarkId() {
            return createBookmark.id;
          }
        }
      });
    }
  });
  const [deleteBookmark] = useMutation(DELETE_BOOKMARK, {
    update(cache, { data: { deleteBookmark } }) {
      cache.modify({
        id: cache.identify(job),
        fields: {
          bookmarked() {
            return false;
          },
          bookmarkId() {
            return null;
          }
        }
      });
    }
  });

  const handleBookmark = () => {
    if (!user) {
      navigate('/sign-in');
    } else {
      bookmarkJob({ variables: { input: { userId: user.id, jobId: job.id } } });
    }
  };

  const handleRemoveBookmark = () => {
    if (!user) {
      navigate('/sign-in');
    } else {
      deleteBookmark({ variables: { id: job.bookmarkId } });
    }
  };

  return (
    <div className="job-item">
      {job.bookmarked ? (
        <button style={buttonStyle} onClick={handleRemoveBookmark}><FaBookmark size="20" /></button>
      ) : (
        <button style={buttonStyle} onClick={handleBookmark}><FaRegBookmark size="20" /></button>
      )}
    </div>
  );
};

export default JobItem;
