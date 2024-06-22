import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { CompanyLogoPlaceholder } from '../lib/helpers';
import JobItem from '../pages/JobItem';

const JobCard = ({ job }) => {
    const maxTagsToShow = 3;
    const tagsToShow = job.tags.slice(0, maxTagsToShow);
    const remainingTagsCount = job.tags.length - maxTagsToShow;
    return (
        <Card className="card">
            <Row className="g-0">
                <Col xs="auto">
                    <Card.Body>
                        <CompanyLogoPlaceholder companyName={job.companyName} />
                    </Card.Body>
                </Col>
                <Col>
                    <Card.Body className="ps-0">
                        <Row>
                            <Col className="d-flex justify-content-between">
                                <h3 className="mb-0"><Link to={`/jobs/${job.slug}`}>{job.title}</Link></h3>
                                <JobItem key={job.id} job={job} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md>
                                <div className="mt-3 list-inline list-inline-dots mb-0 text-muted d-sm-block d-none">
                                    <div className="list-inline-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-inline" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M8 9l5 5v7h-5v-4m0 4h-5v-7l5 -5m1 1v-6a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v17h-8" />
                                            <path d="M13 7l0 .01" />
                                            <path d="M17 7l0 .01" />
                                            <path d="M17 11l0 .01" />
                                            <path d="M17 15l0 .01" />
                                        </svg>
                                        {job.companyName}
                                    </div>
                                    <div className="list-inline-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-inline" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11" />
                                            <path d="M9 7l4 0" />
                                            <path d="M9 11l4 0" />
                                        </svg>
                                        {job.jobType}
                                    </div>
                                    <div className="list-inline-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-inline" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                                        </svg>
                                        {job.jobLocation}
                                    </div>

                                </div>
                                <div className="mt-3 list mb-0 text-muted d-block d-sm-none">
                                    <div className="list-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-inline" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M8 9l5 5v7h-5v-4m0 4h-5v-7l5 -5m1 1v-6a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v17h-8" />
                                            <path d="M13 7l0 .01" />
                                            <path d="M17 7l0 .01" />
                                            <path d="M17 11l0 .01" />
                                            <path d="M17 15l0 .01" />
                                        </svg>
                                        {job.companyName}
                                    </div>
                                    <div className="list-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-inline" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11" />
                                            <path d="M9 7l4 0" />
                                            <path d="M9 11l4 0" />
                                        </svg>
                                        {job.jobType}
                                    </div>
                                    <div className="list-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-inline" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                                        </svg>
                                        {job.jobLocation}
                                    </div>
                                </div>
                            </Col>
                            <Col md="auto">
                                <div className="mt-3">
                                    {tagsToShow.map((tag, index) => (
                                        <Badge key={index} className="badge badge-outline border fw-normal badge-pill me-1">
                                            {tag}
                                        </Badge>
                                    ))}
                                    {remainingTagsCount > 0 && (
                                        <a href="#0" className="badge badge-outline text-muted border fw-normal badge-pill">
                                            +{remainingTagsCount} more
                                        </a>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
        //      <div className="uk-card uk-card-default uk-card-body uk-margin-xsmall-bottom">
        //      <div className="uk-grid-small" uk-grid="true">
        //          <div className="uk-width-auto">
        //              <CompanyLogoPlaceholder companyName={job.companyName} />
        //          </div>
        //          <div className="uk-width-expand">
        //              <div className="uk-grid-small" data-uk-grid="true">
        //                  <div className="uk-width-expand uk-flex uk-flex-between">
        //                      <h3 className="uk-card-title uk-margin-remove-bottom">
        //                          <Link to={`/jobs/${job.slug}`}>{job.title}</Link>
        //                      </h3>
        //                      <JobItem key={job.id} job={job} />
        //                  </div>
        //              </div>

        //              <div className="uk-grid-small uk-margin-small-top" uk-grid="true">
        //                  <div className="uk-width-expand">
        //                      {/* UIkit doesn't have direct inline SVG support, use a separate component or embed as image */}
        //                      <div className="uk-text-meta uk-visible@m">
        //                          <span>{job.companyName}</span> &bull; <span>{job.jobType}</span> &bull; <span>{job.jobLocation}</span>
        //                      </div>
        //                      <ul className="uk-list uk-text-meta uk-hidden@m">
        //                          <li>{job.companyName}</li>
        //                          <li>{job.jobType}</li>
        //                          <li>{job.jobLocation}</li>
        //                      </ul>
        //                  </div>
        //                  <div className="uk-width-auto">
        //                      <div className="uk-badge-group">
        //                          {tagsToShow.map((tag, index) => (
        //                              <Link key={index} to="#0" className="uk-badge uk-badge-default">{tag}</Link>
        //                          ))}
        //                          {remainingTagsCount > 0 && (
        //                              <Link to="#0" className="uk-badge uk-badge-default">+{remainingTagsCount} more</Link>
        //                          )}
        //                      </div>
        //                  </div>
        //              </div>
        //          </div>
        //      </div>
        //  </div>
    )
};

export default JobCard;
