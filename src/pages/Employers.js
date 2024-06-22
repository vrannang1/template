import React from 'react';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const features = [
  {
    title: 'Find Top Candidates',
    description: 'Access a vast pool of talented professionals from various fields and find the perfect match for your job openings.',
    icon: 'users',
  },
  {
    title: 'Easy Job Posting',
    description: 'Post jobs quickly and easily, and reach a large audience of potential candidates with our user-friendly platform.',
    icon: 'briefcase',
  },
  {
    title: 'Advanced Search',
    description: 'Utilize advanced search filters to narrow down your candidate search and find the best fit for your company.',
    icon: 'search',
  },
  {
    title: 'Company Branding',
    description: 'Enhance your company’s visibility and attract top talent by showcasing your company profile and culture.',
    icon: 'building',
  },
];

const faqs = [
  {
    question: 'How do I post a job?',
    answer: 'To post a job, you need to sign up as an employer. Once registered, you can access the job posting section and fill out the required details to post a job.',
  },
  {
    question: 'How can I find candidates?',
    answer: 'You can find candidates by using our advanced search feature. Apply filters based on your requirements to narrow down the list of potential candidates.',
  },
  {
    question: 'How do I contact a candidate?',
    answer: 'After finding a suitable candidate, you can contact them through the platform’s messaging system or via the contact information provided in their profile.',
  },
  {
    question: 'Can I edit my job postings?',
    answer: 'Yes, you can edit your job postings at any time. Simply navigate to your job listings and select the job you want to edit.',
  },
  {
    question: 'Is there a fee to post jobs?',
    answer: 'Yes, there is a fee for posting jobs on our platform. Our pricing plans vary based on the type and number of job postings. Please refer to our pricing page for detailed information.',
  },
  {
    question: 'How long will my job posting be active?',
    answer: 'Job postings are active for 30 days by default. You can extend the duration or repost the job if needed.',
  },
  {
    question: 'How can I manage my company profile?',
    answer: 'You can manage your company profile by logging into your account and navigating to the profile section. Here you can update your company’s information, logo, and other details.',
  },
  {
    question: 'Can I receive applications directly to my email?',
    answer: 'Yes, you can choose to receive applications directly to your email. This option can be configured in the job posting settings.',
  },
  {
    question: 'How do I know if my job posting is performing well?',
    answer: 'We provide analytics and performance metrics for each job posting. You can view the number of views, applications, and other relevant statistics from your dashboard.',
  },
  {
    question: 'Can I search for candidates without posting a job?',
    answer: 'Yes, you can search for candidates using our advanced search feature even without posting a job. However, contacting candidates may require a subscription plan.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'We offer comprehensive support through our help center, email, and live chat. Our support team is available to assist you with any questions or issues you may have.',
  },
  {
    question: 'How secure is the platform?',
    answer: 'Our platform employs advanced security measures to ensure the safety and confidentiality of your data. We use encryption, secure servers, and regular security audits to protect your information.',
  },
];

const EmployersPage = () => {
  return (
    <div>
      <Helmet>
        <title>Employers Home - Punesi</title>
        <meta name="description" content={`Employers Home - Punesi Job portal`} />
        <meta property="og:title" content={`Employers Home - Punesi`} />
        <meta property="og:description" content={`Employers Home - Punesi Job Portal`} />
        <meta property="og:url" content={`https://punesi.com/employers/`} />
        <meta property="og:type" content="article" />
      </Helmet>
      
      {/* Hero Section */}
      <div className="hero-section text-center text-white">
					<div className="overlay">
							<Row className="d-flex justify-content-start">
								<Col md={12}>
									<h1 className="display-1">Welcome to Employers Hub</h1>
									<p className="lead">
                  Find the best talent for your company with our comprehensive job posting platform.
									</p>
									<Button as={Link} to="/job-form">Post a Job</Button>
								</Col>
							</Row>
					</div>
				</div>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col className="text-center">
              <h2>Why Choose Us</h2>
              <p>Discover the benefits of using our platform to find the best candidates for your job openings.</p>
            </Col>
          </Row>
          <Row className="mt-4">
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="h-100 text-center shadow-sm">
                  <Card.Body>
                    <i className={`bi bi-${feature.icon} display-4 mb-3`} />
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Text>{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="bg-light py-5">
        <Container>
          <Row>
            <Col className="text-center">
              <h2>Frequently Asked Questions</h2>
              <p>Find answers to common questions about using our platform.</p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={8} className="mx-auto">
              <Accordion>
                {faqs.map((faq, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>{faq.question}</Accordion.Header>
                    <Accordion.Body>{faq.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
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

export default EmployersPage;
