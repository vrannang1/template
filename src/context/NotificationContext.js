import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-bootstrap';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [show, setShow] = useState(false);

  const notify = (msg) => {
    setMessage(msg);
    setShow(true);
    setTimeout(() => {
      setShow(false);
      setTimeout(() => {
        setMessage(null);
      }, 300); // Wait for the transition to finish before clearing the message
    }, 3000); // Clear message after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
    {children}
    {message && <Alert className={`notification ${show ? 'show' : ''}`} variant="default">{message}</Alert>}
  </NotificationContext.Provider>
  );
};
