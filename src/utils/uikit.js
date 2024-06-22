// src/UIKitInitializer.js
import React, { useEffect } from 'react';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons.min';

const UIKitInitializer = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      UIkit.use(Icons);
      UIkit.update();
    }

    // Suppress ResizeObserver loop limit exceeded errors
    const resizeObserverErrLoop = () => {
      const resizeObserverErr = window.console.error;
      window.console.error = (...args) => {
        if (args[0] && typeof args[0] === "string" && args[0].includes("ResizeObserver loop limit exceeded")) {
          return;
        }
        resizeObserverErr(...args);
      };
    };
    resizeObserverErrLoop();

  }, []);

  return <>{children}</>;
};

export default UIKitInitializer;
