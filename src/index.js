import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// GraphQL-specific
import { ApolloProvider } from "@apollo/client";
import client from "./client";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import "uikit/dist/css/uikit.min.css";
import "./assets/tabler.min.css";
import "./assets/main.scss";
import UIKitInitializer from "./utils/uikit";


// ApolloProvider wraps the React app and places the Apollo client
// on the React context so the client can be conveniently accessed
// from anywhere in the component tree.

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <Helmet>
        <title>Punesi - Your Job Portal</title>
        <meta name="description" content="Find jobs and career opportunities on Punesi" />
        <meta name="keywords" content="jobs, career, employment, job portal" />
        <meta name="author" content="Punesi" />
        <meta property="og:title" content="Punesi - Your Job Portal" />
        <meta property="og:description" content="Find jobs and career opportunities on Punesi" />
        <meta property="og:url" content="https://punesi.com" />
        <meta property="og:type" content="website" />
      </Helmet>
      <UIKitInitializer>
        <App />
      </UIKitInitializer>
    </HelmetProvider>
  </ApolloProvider>
);
