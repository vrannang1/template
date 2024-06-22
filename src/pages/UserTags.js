// UserTags.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Button, Form } from "react-bootstrap";
import { UPDATE_USER_TAGS } from '../graphql/queries';

const UserTags = ({ user }) => {
  const [tags, setTags] = useState(user.tags || []);
  const [updateUserTags] = useMutation(UPDATE_USER_TAGS);

  const handleTagsChange = (selected) => {
    setTags(selected.map(tag => tag.label));
  };

  const handleSaveTags = () => {
    updateUserTags({
      variables: {
        input: {
          userId: user.id,
          tags
        }
      }
    });
  };

  return (
    <div className="mb-3 mt-3">
      <Form.Group controlId="Skills">
        <Form.Label className="fw-bold">Skills</Form.Label>
        <Typeahead
          id="user-tags"
          multiple
          allowNew
          newSelectionPrefix="Add a new tag: "
          options={tags.map(tag => ({ label: tag }))}
          selected={tags.map(tag => ({ label: tag }))}
          onChange={handleTagsChange}
          placeholder="Enter tags..."
        />
      </Form.Group>
      <Button 
        type="submit"
        variant="primary" 
        onClick={handleSaveTags} 
        className="mt-2" // Add margin-top for spacing
      >
        Save Skills
      </Button>
    </div>
  );
};

export default UserTags;
