import React, { useCallback, useState } from 'react';
import { Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useMutation, gql } from '@apollo/client';
import { useDropzone } from 'react-dropzone';
import { FaFileAlt } from 'react-icons/fa';
// import DocPreview from "./DocPreview";

const UPLOAD_RESUME = gql`
  mutation UploadResume($resume: Upload!) {
    uploadResumeUserProfile(resume: $resume) {
      id
      userProfile {
        resume
      }
    }
  }
`;


function ResumeUpload({ user }) {
  const [file, setFile] = useState(null);
  const [uploadResume, { data, loading, error }] = useMutation(UPLOAD_RESUME);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (file) {
      try {
        await uploadResume({ variables: { resume: file } });
        setUploadSuccess(true); // Show success message
        setFile(null);          // Clear the file
      } catch (err) {
        console.error("Error uploading resume:", err);
        // Handle the error appropriately (e.g., show error message)
      }
    }
  };

  return (
    <Row> {/* Use Row to create a horizontal layout */}
      <Col md={4}> {/* 4 columns for the resume card */}
        <Card className="mb-3">
          {/* {user.userProfile?.resume && (
            <DocPreview fileUrl={user.userProfile?.resume} />
          )} */}
          <Card.Body>
            <a href={user?.userProfile.resume} style={{ color: 'inherit', textDecoration: 'none' }}>
              <FaFileAlt className="me-2" size={56} /> {/* Larger icon */}
              Resume
            </a>
          </Card.Body>
        </Card>
        {file && (
          <Card className="mb-3">
            <Card.Body>
              <FaFileAlt className="me-2" /> {/* Add the file icon */}
              {file.name}
            </Card.Body>
          </Card>
        )}
      </Col>
      <Col md={8}>
        <Card {...getRootProps()} className={`mb-3 ${isDragActive ? 'border-primary' : ''}`}>
          <Card.Body className="text-center">
            <input {...getInputProps()} />
            {file ? (
              <p>{file.name}</p>
            ) : (
              <p>Drag & drop a resume here, or click to select a file</p>
            )}
            <small className="text-muted">Accepted formats: PDF, DOC, DOCX, TXT</small>
          </Card.Body>
        </Card>

        <Button onClick={handleUpload} disabled={loading || !file}>
          {loading ? 'Uploading...' : 'Upload Resume'}
        </Button>

        {error && (
          <Alert variant="danger" className="mt-2">
            Error uploading resume: {error.message}
          </Alert>
        )}

        {data && uploadSuccess && (
          <Alert variant="success" className="mt-2">
            Resume uploaded successfully!
          </Alert>
        )}
      </Col>

    </Row>
  );
}

export default ResumeUpload;
