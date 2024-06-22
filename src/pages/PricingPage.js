import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const plans = [
  {
    title: 'Standard Job Posting',
    price: '$149',
    duration: 'per job / 30 days',
    features: [
      'Standard visibility',
      'Basic support',
      'Featured in newsletter',
    ],
  },
  {
    title: 'Monthly Subscription',
    price: '$299',
    duration: 'per month',
    features: [
      'Unlimited job postings',
      'Enhanced visibility for all postings',
      'Priority support',
      'Access to candidate assessment tools',
    ],
  },
];

const PricingPage = () => {
  return (
    <div>
      <Helmet>
        <title>Pricing - Punesi</title>
        <meta name="description" content={`Pricing plans for posting jobs on Punesi`} />
        <meta property="og:title" content={`Pricing - Punesi`} />
        <meta property="og:description" content={`Pricing plans for posting jobs on Punesi`} />
        <meta property="og:url" content={`https://punesi.com/pricing/`} />
        <meta property="og:type" content="article" />
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-primary text-white text-center py-5">
        <Container>
          <h1 className="display-4">Job Posting Pricing Plans</h1>
          <p className="lead">Choose the best plan that fits your hiring needs and budget.</p>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center">
            {plans.map((plan, index) => (
              <Col md={6} key={index} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{plan.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{plan.duration}</Card.Subtitle>
                    <h2 className="display-4">{plan.price}</h2>
                    <ul className="list-unstyled mt-3 mb-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                    <Button variant="primary" as={Link} to="/job-form">Choose Plan</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Pay-Per-Click Section */}
      <section className="bg-light py-5">
        <Container>
          <h2 className="text-center">Pay-Per-Click Add-On</h2>
          <p className="text-center">Add additional visibility to your job postings with our pay-per-click option.</p>
          <p className="text-center text-muted">Cost: $0.10 per click by job seekers. Set your own budget.</p>
          <div className="text-center">
            <Button variant="primary" as={Link} to="/contact">Contact Us for More Info</Button>
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary text-white text-center py-5">
        <Container>
          <h2>Ready to Get Started?</h2>
          <p>Select the plan that best suits your needs and start posting jobs today!</p>
          <Button variant="secondary" as={Link} to="/job-form" className="mr-3">Post a Job</Button>
          <Button variant="light" as={Link} to="/contact">Contact Us</Button>
        </Container>
      </section>
    </div>
  );
};

export default PricingPage;
