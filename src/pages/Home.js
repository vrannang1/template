import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import sectionImage1 from "../assets/images/illustrations/marketing-1.svg";
import sectionImage8 from "../assets/images/illustrations/marketing-8.svg";
import sectionImage9 from "../assets/images/illustrations/marketing-9.svg";

import sectionImage3 from "../assets/images/illustrations/marketing-3.svg";
import sectionImage4 from "../assets/images/illustrations/marketing-4.svg";
import sectionImage5 from "../assets/images/illustrations/marketing-5.svg";


const Home = () => {
	return (
		<>
			{/* <div className="top-wrap uk-position-relative uk-light uk-background-secondary">

				<div className="nav" data-uk-sticky="cls-active: uk-background-secondary uk-box-shadow-medium; top: 100vh; animation: uk-animation-slide-top">
					<div className="uk-container">
						<nav className="uk-navbar uk-navbar-container uk-navbar-transparent" data-uk-navbar>
							<div className="uk-navbar-left">
								<div className="uk-navbar-item uk-padding-remove-horizontal">
									<a className="uk-logo" title="Logo" href=""><img src="img/marketing-logo.svg" alt="Logo" /></a>
								</div>
							</div>
							<div className="uk-navbar-right">
								<ul className="uk-navbar-nav uk-visible@s">
									<li className="uk-active uk-visible@m"><a href="" data-uk-icon="home"></a></li>
									<li><a href="">Features</a></li>
									<li>
										<a href="#" data-uk-icon="chevron-down">Products</a>
										<div className="uk-navbar-dropdown">
											<ul className="uk-nav uk-navbar-dropdown-nav">
												<li><a href="#">Big Data</a></li>
												<li><a href="#">Marketing</a></li>
												<li><a href="#">Analytics</a></li>
												<li><a href="#">AI Lab</a></li>
											</ul>
										</div>
									</li>
									<li><a href="">Testimonials</a></li>
								</ul>
								<a className="uk-navbar-toggle uk-navbar-item uk-hidden@s" data-uk-toggle data-uk-navbar-toggle-icon href="#offcanvas-nav"></a>
							</div>
						</nav>
					</div>
				</div>

				<div className="uk-cover-container uk-light uk-flex uk-flex-middle top-wrap-height">

					<div className="uk-container uk-flex-auto top-container uk-position-relative uk-margin-medium-top" data-uk-parallax="y: 0,50; easing:0; opacity:0.2">
						<div className="uk-width-1-2@s" data-uk-scrollspy="cls: uk-animation-slide-right-medium; target: > *; delay: 150">
							<h6 className="uk-text-primary uk-margin-small-bottom">RESEARCH</h6>
							<h1 className="uk-margin-remove-top">Innovation in your hands.</h1>
							<p className="subtitle-text uk-visible@s">Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco </p>
							<a href="#" title="Learn More" className="uk-button uk-button-primary uk-border-pill" data-uk-scrollspy-className="uk-animation-fade">LEARN MORE</a>
						</div>
					</div>
					<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-srcset="https://picsum.photos/640/700/?image=816 640w,
				https://picsum.photos/960/700/?image=816 960w,
				https://picsum.photos/1200/900/?image=816 1200w,
				https://picsum.photos/2000/1000/?image=816 2000w"
						data-sizes="100vw"
						data-src="https://picsum.photos/1200/900/?image=816" alt="" data-uk-cover data-uk-img data-uk-parallax="opacity: 1,0.1; easing:0"
					/>
				</div>
				<div className="uk-position-bottom-center uk-position-medium uk-position-z-index uk-text-center">
					<a href="#content" data-uk-scroll="duration: 500" data-uk-icon="icon: arrow-down; ratio: 2"></a>
				</div>
			</div> */}
			<Container fluid className="p-0">
				<Helmet>
					<title>Home - Punesi</title>
					<meta name="description" content={`Home - Punesi Job portal`} />
					<meta property="og:title" content={`Home - Punesi`} />
					<meta property="og:description" content={`Home - Punesi Job Portal`} />
					<meta property="og:url" content={`https://punesi.com/jobs/`} />
					<meta property="og:type" content="article" />
				</Helmet>

				{/* Hero Section */}
				<div className="hero-section text-center text-white">
					<div className="overlay">
							<Row className="justify-content-center">
								<Col md={12}>
									<h1 className="display-2">Welcome to Punesi</h1>
									<p className="lead">
										Your one-stop portal for job search and career opportunities.
									</p>
									<Button as={Link} to="/job-list">Search for jobs</Button>
								</Col>
							</Row>
					</div>
				</div>

				<section id="content" className="uk-section uk-section-default">
					<div className="uk-container">
						<div className="uk-section uk-section-small uk-padding-remove-top">
							<ul className="uk-subnav uk-subnav-pill uk-flex uk-flex-center" data-uk-switcher="connect: .uk-switcher; animation: uk-animation-fade">
								<li><a className="uk-border-pill" href="#0">Discover</a></li>
								<li><a className="uk-border-pill" href="#0">Benefits</a></li>
								<li><a className="uk-border-pill" href="#0">Features</a></li>
							</ul>
						</div>

						<ul className="uk-switcher uk-margin">
							<li>
								<div className="uk-grid uk-child-width-1-2@l uk-flex-middle" data-uk-grid data-uk-scrollspy="target: > div; cls: uk-animation-slide-left-medium">
									<div>
										<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src={sectionImage1} alt="" data-uk-img />
									</div>
									<div data-uk-scrollspy-className="uk-animation-slide-right-medium">
										<h6 className="uk-text-primary">MAIN REASONS</h6>
										<h2 className="uk-margin-small-top">Take decisions with real time data based on users interaction.</h2>
										<p className="subtitle-text">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
											tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
											quis nostrud exercitation.
										</p>
										<div className="uk-grid uk-child-width-1-2@s" data-uk-grid>
											<div>
												<h4>Great stuff</h4>
												<p>Ut enim ad minim veniam, quis nostrud magna aliqua exercitation. <a href="#0">Learn more.</a></p>
											</div>
											<div>
												<h4>Data analysis</h4>
												<p>Ut enim ad minim veniam, quis nostrud magna aliqua exercitation. <a href="#0">Learn more.</a></p>
											</div>
										</div>
									</div>
								</div>
							</li>
							<li>
								<div className="uk-grid uk-child-width-1-2@l uk-flex-middle" data-uk-grid data-uk-scrollspy="target: > div; cls: uk-animation-slide-left-medium">
									<div>
										<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src={sectionImage8} alt="" data-uk-img />
									</div>
									<div data-uk-scrollspy-className="uk-animation-slide-right-medium">
										<h6 className="uk-text-primary">MAIN REASONS</h6>
										<h2 className="uk-margin-small-top">Take decisions with real time data based on users interaction.</h2>
										<p className="subtitle-text">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
											tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
											quis nostrud exercitation.
										</p>
										<div className="uk-grid uk-child-width-1-2@s" data-uk-grid>
											<div>
												<h4>Great stuff</h4>
												<p>Ut enim ad minim veniam, quis nostrud magna aliqua exercitation. <a href="#0">Learn more.</a></p>
											</div>
											<div>
												<h4>Data analysis</h4>
												<p>Ut enim ad minim veniam, quis nostrud magna aliqua exercitation. <a href="#0">Learn more.</a></p>
											</div>
										</div>
									</div>
								</div>
							</li>
							<li>
								<div className="uk-grid uk-child-width-1-2@l uk-flex-middle" data-uk-grid data-uk-scrollspy="target: > div; cls: uk-animation-slide-left-medium">
									<div>
										<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src={sectionImage9} alt="" data-uk-img />
									</div>
									<div data-uk-scrollspy-className="uk-animation-slide-right-medium">
										<h6 className="uk-text-primary">MAIN REASONS</h6>
										<h2 className="uk-margin-small-top">Take decisions with real time data based on users interaction.</h2>
										<p className="subtitle-text">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
											tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
											quis nostrud exercitation.
										</p>
										<div className="uk-grid uk-child-width-1-2@s" data-uk-grid>
											<div>
												<h4>Great stuff</h4>
												<p>Ut enim ad minim veniam, quis nostrud magna aliqua exercitation. <a href="#0">Learn more.</a></p>
											</div>
											<div>
												<h4>Data analysis</h4>
												<p>Ut enim ad minim veniam, quis nostrud magna aliqua exercitation. <a href="#0">Learn more.</a></p>
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>


					</div>
				</section>

				<section className="uk-section uk-section-secondary uk-section-large">
					<div className="uk-container">
						<div className="uk-grid uk-child-width-1-2@l uk-flex-middle">
							<div>
								<h6>SIMPLIFY THINGS</h6>
								<h2 className="uk-margin-small-top uk-h1">Manage all your data from one place only.</h2>
								<p className="subtitle-text">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
									tempor incididunt ut labore et dolore magna aliqua.
								</p>
								<a href="#0" className="uk-button uk-button-primary uk-border-pill" data-uk-icon="arrow-right">LEARN MORE</a>
							</div>
							<div data-uk-scrollspy="cls: uk-animation-fade">
								<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="img/marketing-2.svg" data-uk-img alt="" />
							</div>
						</div>
					</div>
				</section>
				<section className="uk-section uk-section-default">

					<div className="uk-container uk-container-xsmall uk-text-center uk-section uk-padding-remove-top">
						<h5 className="uk-text-primary">ANALYTICS</h5>
						<h2 className="uk-margin-remove uk-h1">Know the behavior of your potential customers.</h2>
					</div>
					<div className="uk-container">
						<div className="uk-grid uk-grid-large uk-child-width-1-3@m" data-uk-grid data-uk-scrollspy="target: > div; delay: 150; cls: uk-animation-slide-bottom-medium">
							<div className="uk-text-center">
								<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src={sectionImage3} data-uk-img alt="" />
								<h4 className="uk-margin-small-bottom uk-margin-top uk-margin-remove-adjacent">Lorem ipsum dolor sit amet</h4>
								<p>24/7 support. We’re always here for you no matter what time of day.</p>
							</div>
							<div className="uk-text-center">
								<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src={sectionImage4} data-uk-img alt="" />
								<h4 className="uk-margin-small-bottom uk-margin-top uk-margin-remove-adjacent">Lorem ipsum dolor sit amet</h4>
								<p>24/7 support. We’re always here for you no matter what time of day.</p>
							</div>
							<div className="uk-text-center">
								<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src={sectionImage5} data-uk-img alt="" />
								<h4 className="uk-margin-small-bottom uk-margin-top uk-margin-remove-adjacent">Lorem ipsum dolor sit amet</h4>
								<p>24/7 support. We’re always here for you no matter what time of day.</p>
							</div>
							<div className="uk-text-center">
								<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src={sectionImage5} data-uk-img alt="" />
								<h4 className="uk-margin-small-bottom uk-margin-top uk-margin-remove-adjacent">Lorem ipsum dolor sit amet</h4>
								<p>24/7 support. We’re always here for you no matter what time of day.</p>
							</div>
							<div className="uk-text-center">
								<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src={sectionImage4} data-uk-img alt="" />
								<h4 className="uk-margin-small-bottom uk-margin-top uk-margin-remove-adjacent">Lorem ipsum dolor sit amet</h4>
								<p>24/7 support. We’re always here for you no matter what time of day.</p>
							</div>
							<div className="uk-text-center">
								<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src={sectionImage3} data-uk-img alt="" />
								<h4 className="uk-margin-small-bottom uk-margin-top uk-margin-remove-adjacent">Lorem ipsum dolor sit amet</h4>
								<p>24/7 support. We’re always here for you no matter what time of day.</p>
							</div>

						</div>
					</div>
				</section>

				{/* Features Section */}
				<Container className="mt-5">
					<Row className="text-center">
						<Col md={4}>
							<Card className="mb-4">
								<Card.Body>
									<Card.Title>Find the Best Jobs</Card.Title>
									<Card.Text>
										Explore top job listings across various industries and
										locations.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="mb-4">
								<Card.Body>
									<Card.Title>Create Your Profile</Card.Title>
									<Card.Text>
										Build a comprehensive profile to attract potential employers.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="mb-4">
								<Card.Body>
									<Card.Title>Apply with Ease</Card.Title>
									<Card.Text>
										Use our streamlined application process to apply for jobs
										quickly.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>

				{/* Additional Section */}
				<Container className="my-5">
					<Row className="text-center">
						<Col md={4}>
							<Card className="mb-4">
								<Card.Body>
									<Card.Title>Job Alerts</Card.Title>
									<Card.Text>
										Sign up for job alerts and never miss an opportunity.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="mb-4">
								<Card.Body>
									<Card.Title>Company Reviews</Card.Title>
									<Card.Text>
										Read reviews and ratings from employees at top companies.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="mb-4">
								<Card.Body>
									<Card.Title>Career Advice</Card.Title>
									<Card.Text>
										Get expert career advice and tips to advance your career.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</Container>
		</>
	);
};

export default Home;
