import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider, useNotification } from "./context/NotificationContext";
import ProtectedRoute from './components/ProtectedRoute';
// import AdminRoute from './components/AdminRoute';
import Header from "./components/Header";
// import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import NotFound from "./pages/NotFound";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import Verify from "./pages/Verify";
import Home from "./pages/Home";
import JobForm from "./pages/JobForm";
import EmployerSignup from "./pages/EmployerSignup";
import ApplyJob from "./pages/ApplyJob";
import Employers from "./pages/Employers";
import CompanyProfile from "./pages/CompanyProfile";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyReset from "./pages/VerifyReset";
import EmployerDashboard from "./pages/EmployerDashboard";
import JobApplications from "./pages/JobApplications";
import RegisterPage from "./pages/RegisterPage";
import Success from "./pages/Success";
import ServerError from "./pages/ServerError";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";

const Notification = () => {
  const { message } = useNotification();

  if (!message) return null;

  return (
    <>
      {message}
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Notification />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/employers" element={<Employers />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/employer-sign-up" element={<EmployerSignup />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/verify-reset" element={<VerifyReset />} />
            <Route path="/job-list" element={<JobList />} />
            <Route path="/jobs/:slug" element={<JobDetail />} />
            <Route path="/company-profile" element={
              <ProtectedRoute allowedRoles={['employer']}>
                <CompanyProfile />
              </ProtectedRoute>
            } />
            <Route path="/employers-dashboard" element={
              <ProtectedRoute allowedRoles={['employer', 'admin']}>
                <EmployerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/job-applications/:jobId" element={
              <ProtectedRoute allowedRoles={['employer', 'admin']}>
                <JobApplications />
              </ProtectedRoute>
            } />
            <Route path="/job-form/:id" element={
              <ProtectedRoute allowedRoles={['employer']}>
                <JobForm />
              </ProtectedRoute>
            } />
            <Route path="/job-form" element={
              <ProtectedRoute allowedRoles={['employer']}>
                <JobForm />
              </ProtectedRoute>
            } />
            <Route path="/success" element={
              <ProtectedRoute allowedRoles={['employer']}>
                <Success />
              </ProtectedRoute>
            } />
            <Route path="/company-profile" element={
              <ProtectedRoute allowedRoles={['employer']}>
                <CompanyProfile />
              </ProtectedRoute>
            } />
            <Route path="/apply-job/:id" element={
              <ProtectedRoute allowedRoles={['job_seeker']}>
                <ApplyJob />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['job_seeker']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['job_seeker']}>
                <UserProfile />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute allowedRoles={['job_seeker', 'employer']}>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/500" element={<ServerError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
            {/* <Footer /> */}
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
