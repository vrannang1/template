import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { CompanyLogoPlaceholder } from '../lib/helpers';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';

const GET_JOB_QUERY = gql`
  query GetJob($slug: String!) {
    jobBySlug(slug: $slug) {
      id
      title
      description
      category
      jobType
      companyName
      companyLocation
      jobLocation
      tags
      status
      source
      isExternal
      externalUrl
    }
    me {
      id
      applications {
        id
        job {
          id
        }
      }
    }
  }
`;

const JobDetails = () => {
  const { slug } = useParams();
  const { loading, error, data } = useQuery(GET_JOB_QUERY, {
    variables: { slug },
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  const { jobBySlug: job, me } = data;

  const hasApplied = me?.applications.some(app => app.job.id === job.id);

  const sanitizedHTML = DOMPurify.sanitize(job.description);

  return (
    <> 
     <Helmet>
        <title>{job.title} - Job Portal</title>
        <meta name="description" content={job.description} />
        <meta name="keywords" content={job.tags.join(', ')} />
        <link rel="canonical" href={job.url} />

        <meta property="og:title" content={job.title + " - Punesi"} />
        <meta property="og:description" content={job.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={job.url} />
        <meta property="og:image" content={job.imageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={job.title + " - Punesi"} />
        <meta name="twitter:description" content={job.description} />
        <meta name="twitter:image" content={job.imageUrl} />
      </Helmet>
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="card">
            <Card.Body>
              <Row>
                <Col md="auto">
                  <CompanyLogoPlaceholder companyName={job.companyName} />
                </Col>
                <Col>
                  <h2 className="card-title">{job.title} {job.isExternal && <h6><Badge bg="warning">External</Badge></h6>}</h2>
                  <div className="text-muted">
                    {job.companyName}
                  </div>
                  <div className="mt-3">
                    {job?.tags?.map((tag, index) => (
                      <Badge key={index} className="badge badge-outline border fw-normal badge-pill me-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Col>
                <Col md="auto">
                  {job.isExternal ? (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id={`tooltip-external-${job.id}`}>
                          Click to apply on {job.source}
                        </Tooltip>
                      }
                    >
                      <Button href={job.externalUrl} target="_blank" className="btn btn-warning mt-3">
                        Apply on External Site
                      </Button>
                    </OverlayTrigger>
                  ) : (
                    <Button as={Link} to={`/apply-job/${job.id}`} className={hasApplied ? "btn btn-secondary mt-3" : "btn btn-primary mt-3"} disabled={hasApplied}>
                      {hasApplied ? "Already Applied" : "Apply Now"}
                    </Button>
                  )}
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <h4 className="card-title">Job Description</h4>
                  <p className="card-text"><div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} /></p>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <p className="text-muted small">
                    Disclaimer: This job is hosted on an external site. Clicking the apply button will redirect you to {job.source}. Punēsi is not responsible for the content or availability of external sites.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
   
  );
};

export default JobDetails;
