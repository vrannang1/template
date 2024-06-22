import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useAuth } from "../context/AuthContext";
import Gravatar from "react-gravatar";
import Recommendations from './Recommendations';

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <Container>
            <Row className="mt-4">
                <Col md={4}>
                    <Card>
                        <Card.Header className="text-center">
                            <Gravatar
                                email={user?.email}
                                md5={user?.gravatarMd5}
                                className="rounded-circle"
                                size={100}
                            />
                            <Card.Title className="mt-2">{user.firstName} {user.lastName}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{user.role}</Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
                            <Card.Text><strong>Location:</strong> {user.userProfile?.location}</Card.Text>
                            <Card.Text><strong>Bio:</strong> {user.userProfile?.bio}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card>
                        <Card.Header><Card.Title>Skills</Card.Title></Card.Header>
                        <Card.Body>
                            {console.log(user)}
                            {user?.tags?.map((skill, index) => (
                                <Badge variant="primary" className="m-1">{skill}</Badge>
                            ))}
                        </Card.Body>
                    </Card>
                    <Card className="mt-3">
                        <Card.Header><Card.Title>Jobs found based on your skills</Card.Title></Card.Header>
                        <Card.Body>
                            <Recommendations userId={user.id} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
