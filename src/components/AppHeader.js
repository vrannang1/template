import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CurrentUser from "./CurrentUser";
import Signout from "./Signout";

import { Button, Drawer } from 'antd';

import {
  MenuOutlined
} from '@ant-design/icons';

export default function AppHeader() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>

      <header className="header header-custom header-fixed header-one">
        <div className="container">
          <nav className="navbar navbar-expand-lg header-nav">
            <div className="navbar-header">
              <a id="mobile_btn" href="javascript:void(0);">
                <span className="bar-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </a>
              <a href="index.html" className="navbar-brand logo">
                <img src="assets/img/logo.png" className="img-fluid" alt="Logo" />
              </a>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <a href="index.html" className="menu-logo">
                  <img src="assets/img/logo.png" className="img-fluid" alt="Logo" />
                </a>
                <a id="menu_close" className="menu-close" href="javascript:void(0);">
                  <i className="fas fa-times"></i>
                </a>
              </div>
              <ul className="main-nav">
                <li className="has-submenu megamenu active">
                  <a href="javascript:void(0);">Home <i className="fas fa-chevron-down"></i></a>
                  <ul className="submenu mega-submenu">
                    <li>
                      <div className="megamenu-wrapper">
                        <div className="row">
                          <div className="col-lg-2">
                            <div className="single-demo active">
                              <div className="demo-img">
                                <a href="index.html" className="inner-demo-img"><img
                                  src="assets/img/home-11.jpg" className="img-fluid "
                                  alt="img" /></a>
                              </div>
                              <div className="demo-info">
                                <a href="index.html" className="inner-demo-img">General Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo ">
                              <div className="demo-img">
                                <a href="index-2.html" className="inner-demo-img"><img
                                  src="assets/img/home-10.jpg" className="img-fluid"
                                  alt="img" /></a>
                              </div>
                              <div className="demo-info">
                                <a href="index-2.html" className="inner-demo-img">General Home
                                  2</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-3.html" className="inner-demo-img"><img
                                  src="assets/img/home-09.jpg" className="img-fluid"
                                  alt="img" /></a>
                              </div>
                              <div className="demo-info">
                                <a href="index-3.html" className="inner-demo-img">General Home
                                  3</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-4.html" className="inner-demo-img"><img
                                  src="assets/img/home-08.jpg" className="img-fluid"
                                  alt="img" /></a>
                              </div>
                              <div className="demo-info">
                                <a href="index-4.html" className="inner-demo-img">General Home
                                  4</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-5.html" className="inner-demo-img"><img
                                  src="assets/img/home-07.jpg" className="img-fluid"
                                  alt="img" /></a>
                              </div>
                              <div className="demo-info">
                                <a href="index-5.html" className="inner-demo-img">Cardiology
                                  Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-6.html" className="inner-demo-img"><img
                                  src="assets/img/home-06.jpg" className="img-fluid"
                                  alt="img"/></a>
                              </div>
                              <div className="demo-info">
                                <a href="index-6.html" className="inner-demo-img">Eye Care
                                  Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-7.html" className="inner-demo-img"><img
                                  src="assets/img/home-05.jpg" className="img-fluid"
                                  alt="img"/></a>
                              </div>
                              <div className="demo-info">
                                <a href="index-7.html" className="inner-demo-img">Veterinary
                                  Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-8.html" className="inner-demo-img"><img
                                  src="assets/img/home-04.jpg" className="img-fluid"
                                  alt="img"/></a>
                              </div>
                              <div className="demo-info">
                                <a href="index-8.html" className="inner-demo-img">Paediatric
                                  Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-9.html" className="inner-demo-img"><img
                                  src="assets/img/home-03.jpg" className="img-fluid"
                                  alt="img"/></a>
                              </div>
                              <div className="demo-info">
                                <a href="index-9.html" className="inner-demo-img">Fertility
                                  Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-10.html" className="inner-demo-img"><img
                                  src="assets/img/home-02.jpg" className="img-fluid"
                                  alt="img"/></a>
                              </div>
                              <div className="demo-info">
                                <a href="index-10.html" className="inner-demo-img">ENT Hospital
                                  Home</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="single-demo">
                              <div className="demo-img">
                                <a href="index-11.html" className="inner-demo-img"><img
                                  src="assets/img/home-01.jpg" className="img-fluid"
                                  alt="img"/></a>
                              </div>
                              <div className="demo-info">
                                <a href="index-11.html" className="inner-demo-img">Cosmetics
                                  Home</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="javascript:void(0);">Doctors <i className="fas fa-chevron-down"></i></a>
                  <ul className="submenu">
                    <li><a href="doctor-dashboard.html">Doctor Dashboard</a></li>
                    <li><a href="appointments.html">Appointments</a></li>
                    <li><a href="schedule-timings.html">Schedule Timing</a></li>
                    <li><a href="my-patients.html">Patients List</a></li>
                    <li><a href="patient-profile.html">Patients Profile</a></li>
                    <li><a href="chat-doctor.html">Chat</a></li>
                    <li><a href="invoices.html">Invoices</a></li>
                    <li><a href="doctor-profile-settings.html">Profile Settings</a></li>
                    <li><a href="reviews.html">Reviews</a></li>
                    <li><a href="doctor-register.html">Doctor Register</a></li>
                    <li className="has-submenu">
                      <a href="doctor-blog.html">Blog</a>
                      <ul className="submenu">
                        <li><a href="doctor-blog.html">Blog</a></li>
                        <li><a href="blog-details.html">Blog view</a></li>
                        <li><a href="doctor-add-blog.html">Add Blog</a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="javascript:void(0);">Patients <i className="fas fa-chevron-down"></i></a>
                  <ul className="submenu">
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Doctors</a>
                      <ul className="submenu inner-submenu">
                        <li><a href="map-grid.html">Map Grid</a></li>
                        <li><a href="map-list.html">Map List</a></li>
                      </ul>
                    </li>
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Search Doctor</a>
                      <ul className="submenu inner-submenu">
                        <li><a href="search.html">Search Doctor 1</a></li>
                        <li><a href="search-2.html">Search Doctor 2</a></li>
                      </ul>
                    </li>
                    <li><a href="doctor-profile.html">Doctor Profile</a></li>
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Booking</a>
                      <ul className="submenu inner-submenu">
                        <li><a href="booking.html">Booking 1</a></li>
                        <li><a href="booking-2.html">Booking 2</a></li>
                      </ul>
                    </li>
                    <li><a href="checkout.html">Checkout</a></li>
                    <li><a href="booking-success.html">Booking Success</a></li>
                    <li><a href="patient-dashboard.html">Patient Dashboard</a></li>
                    <li><a href="favourites.html">Favourites</a></li>
                    <li><a href="chat.html">Chat</a></li>
                    <li><a href="profile-settings.html">Profile Settings</a></li>
                    <li><a href="change-password.html">Change Password</a></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="javascript:void(0);">Pharmacy <i className="fas fa-chevron-down"></i></a>
                  <ul className="submenu">
                    <li><a href="pharmacy-index.html">Pharmacy</a></li>
                    <li><a href="pharmacy-details.html">Pharmacy Details</a></li>
                    <li><a href="pharmacy-search.html">Pharmacy Search</a></li>
                    <li><a href="product-all.html">Product</a></li>
                    <li><a href="product-description.html">Product Description</a></li>
                    <li><a href="cart.html">Cart</a></li>
                    <li><a href="product-checkout.html">Product Checkout</a></li>
                    <li><a href="payment-success.html">Payment Success</a></li>
                    <li><a href="pharmacy-register.html">Pharmacy Register</a></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="javascript:void(0);">Pages <i className="fas fa-chevron-down"></i></a>
                  <ul className="submenu">
                    <li><a href="about-us.html">About Us</a></li>
                    <li><a href="contact-us.html">Contact Us</a></li>
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Call</a>
                      <ul className="submenu inner-submenu">
                        <li><a href="voice-call.html">Voice Call</a></li>
                        <li><a href="video-call.html">Video Call</a></li>
                      </ul>
                    </li>
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Invoices</a>
                      <ul className="submenu inner-submenu">
                        <li><a href="invoices.html">Invoices</a></li>
                        <li><a href="invoice-view.html">Invoice View</a></li>
                      </ul>
                    </li>
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Authentication</a>
                      <ul className="submenu inner-submenu">
                        <li><a href="login-email.html">Login Email</a></li>
                        <li><a href="login-phone.html">Login Phone</a></li>
                        <li><a href="doctor-signup.html">Doctor Signup</a></li>
                        <li><a href="patient-signup.html">Patient Signup</a></li>
                        <li><a href="forgot-password.html">Forgot Password 1</a></li>
                        <li><a href="forgot-password2.html">Forgot Password 2</a></li>
                        <li><a href="login-email-otp.html">Email OTP</a></li>
                        <li><a href="login-phone-otp.html">Phone OTP</a></li>
                      </ul>
                    </li>
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Error Pages</a>
                      <ul className="submenu inner-submenu">
                        <li><a href="error-404.html">404 Error</a></li>
                        <li><a href="error-500.html">500 Error</a></li>
                      </ul>
                    </li>
                    <li><a href="blank-page.html">Starter Page</a></li>
                    <li><a href="pricing.html">Pricing Plan</a></li>
                    <li><a href="faq.html">FAQ</a></li>
                    <li><a href="maintenance.html">Maintenance</a></li>
                    <li><a href="coming-soon.html">Coming Soon</a></li>
                    <li><a href="terms-condition.html">Terms & Condition</a></li>
                    <li><a href="privacy-policy.html">Privacy Policy</a></li>
                    <li><a href="components.html">Components</a></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="#">Blog <i className="fas fa-chevron-down"></i></a>
                  <ul className="submenu">
                    <li><a href="blog-list.html">Blog List</a></li>
                    <li><a href="blog-grid.html">Blog Grid</a></li>
                    <li><a href="blog-details.html">Blog Details</a></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="#">Admin <i className="fas fa-chevron-down"></i></a>
                  <ul className="submenu">
                    <li><a href="admin/index.html" target="_blank">Admin</a></li>
                    <li><a href="pharmacy/index.html" target="_blank">Pharmacy Admin</a></li>
                  </ul>
                </li>
                <li className="searchbar">
                  <a href="javascript:void(0);"><i className="feather-search"></i></a>
                  <div className="togglesearch">
                    <form action="search.html">
                      <div className="input-group">
                        <input type="text" className="form-control"/>
                          <button type="submit" className="btn">Search</button>
                      </div>
                    </form>
                  </div>
                </li>
                <li className="login-link"><a href="login.html">Login / Signup</a></li>
                <li className="register-btn">
                  <a href="register.html" className="btn reg-btn"><i className="feather-user"></i>Register</a>
                </li>
                <li className="register-btn">
                  <a href="login.html" className="btn btn-primary log-btn"><i
                    className="feather-lock"></i>Login</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <div className='container'>
        {/* header */}
        <div className='header separator'>
          <div className="logo">
            <NavLink to="/">Findoctors.</NavLink>
          </div>
          <div className="mobileVisible">
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <Drawer placement="right" onClose={onClose} visible={visible}>
              <nav>
                <ul>
                  <li><NavLink onClick={onClose} to="/demo/react/antdesign/grocery/">Home</NavLink></li>
                  <li><NavLink onClick={onClose} to="/demo/react/antdesign/grocery/about">About</NavLink></li>
                  <li><NavLink onClick={onClose} to="/demo/react/antdesign/grocery/faq">FAQ</NavLink></li>
                  <li><NavLink onClick={onClose} to="/demo/react/antdesign/grocery/contact">Contact</NavLink></li>
                  <CurrentUser>
                    {currentUser => (
                      <>
                        {currentUser && (
                          <>
                            <li>{currentUser.firstName}</li>
                            <li><Signout /></li>
                          </>
                        )}
                        {!currentUser && (
                          <>
                            <li><NavLink onClick={onClose} to="/sign-in">SignIn</NavLink></li>
                            <li><NavLink onClick={onClose} to="/sign-up">SignUp</NavLink></li>
                          </>
                        )}
                      </>
                    )}
                  </CurrentUser>
                </ul>
              </nav>
            </Drawer>
          </div>
          <nav className="mobileHidden">
            <ul>
              <li><NavLink to="/demo/react/antdesign/grocery/">Home</NavLink></li>
              <li><NavLink to="/demo/react/antdesign/grocery/about">About</NavLink></li>
              <li><NavLink to="/demo/react/antdesign/grocery/faq">FAQ</NavLink></li>
              <li><NavLink to="/demo/react/antdesign/grocery/contact">Contact</NavLink></li>
              <CurrentUser>
                {currentUser => (
                  <>
                    {currentUser && (
                      <>
                        <li className="">{currentUser.firstName}</li>
                        <li><Signout /></li>
                      </>
                    )}
                    {!currentUser && (
                      <>
                        <li><NavLink onClick={onClose} to="/sign-in">SignIn</NavLink></li>
                        <li><NavLink onClick={onClose} to="/sign-up">SignUp</NavLink></li>
                      </>
                    )}
                  </>
                )}
              </CurrentUser>
            </ul>
          </nav>
        </div>
      </div>
    </>

  );
}
