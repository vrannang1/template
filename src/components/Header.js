import React, { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown, Offcanvas, Image } from 'react-bootstrap';
import Gravatar from "react-gravatar";
import renderIf from "render-if";
import logoImg from "../assets/images/logo.png";

export default function Header() {
  const { user, logout } = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <header className="navbar navbar-expand-lg d-print-none" >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow} />
        <Navbar.Brand as={Link} to="/" className="d-none-navbar-horizontal pe-0 pe-md-3">
          <Image src={logoImg} alt="Punesi" width={100} height={100} />
        </Navbar.Brand>
        <Nav className="flex-row order-md-last">
          {!user && (
            <Nav.Item className="d-none d-md-flex me-3">
              <div className="btn-list">
                <Link to="/sign-in" className="btn btn-default">
                  Login
                </Link>
                <Link to="/employers" className="btn btn-primary">
                  Employers
                </Link>
              </div>
            </Nav.Item>
          )}
          {user && (
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="dropdown-basic">
                {user && <Gravatar
                  email={user?.email}
                  md5={user?.gravatarMd5}
                  className="rounded-circle"
                  size={30}
                />}
                <span className="d-none d-xl-inline ps-2">{user?.firstName}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {renderIf(user?.role === "employer") (
                  <Dropdown.Item as={Link} to="employers-dashboard">Dashboard</Dropdown.Item>
                )}
                {renderIf(user?.role === "job_seeker") (
                  <Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item>
                )}
                {renderIf(user?.role === "employer") (
                  <Dropdown.Item as={Link} to="/company-Profile">Profile</Dropdown.Item>
                )}
                {renderIf(user?.role === "job_seeker") (
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                )}
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Nav>
      </Container>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {!user && (
              <>
                <Nav.Link as={Link} to="/sign-in" onClick={handleClose}>Login</Nav.Link>
                <Nav.Link as={Link} to="/sign-up" onClick={handleClose}>Register</Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="#0" onClick={handleClose}>Status</Nav.Link>
                <Nav.Link as={Link} to="/profile" onClick={handleClose}>Profile</Nav.Link>
                <Nav.Link as={Link} to="#0" onClick={handleClose}>Feedback</Nav.Link>
                <Nav.Link as={Link} to="/settings" onClick={handleClose}>Settings</Nav.Link>
                <Nav.Link onClick={() => { logout(); handleClose(); }}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

    </header>

  );
}
