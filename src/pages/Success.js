import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import Loading from "../components/Loading";
import Error from "../components/Error";

const CONFIRM_PAYMENT_MUTATION = gql`
  mutation ConfirmPayment($sessionId: String!, $jobId: String!) {
    confirmPayment(sessionId: $sessionId, jobId: $jobId) {
      id
      paymentStatus
    }
  }
`;

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [confirmPayment, { loading }] = useMutation(CONFIRM_PAYMENT_MUTATION, {
    onCompleted: (data) => {
      if (data.confirmPayment.paymentStatus === "paid") {
        navigate(`/jobs/${data.confirmPayment.id}`);
      } else {
        setError("Payment not confirmed. Please contact support.");
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  console.log("error is ", error);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");
    const jobId = query.get("job_id");

    console.log(sessionId, jobId);

    if (sessionId && jobId) {
      confirmPayment({ variables: { sessionId, jobId } });
    } else {
      setError("Invalid payment confirmation.");
    }
  }, [location.search, confirmPayment]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return <div>Payment Successful. Redirecting...</div>;
};

export default Success;
