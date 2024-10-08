import React, { createContext, useState } from "react";

// Create the context
export const PasswordContext = createContext();

// Create a provider component
export const PasswordProvider = ({ children }) => {
  const [emailReset, setEmailContextReset] = useState("");

  return (
    <PasswordContext.Provider value={{ emailReset, setEmailContextReset }}>
      {children}
    </PasswordContext.Provider>
  );
};
