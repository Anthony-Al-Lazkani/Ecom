import React, { createContext, useState } from "react";

// Create the context
export const EmailContext = createContext();

// Create a provider component
export const EmailProvider = ({ children }) => {
  const [email, setEmailContext] = useState("");

  return (
    <EmailContext.Provider value={{ email, setEmailContext }}>
      {children}
    </EmailContext.Provider>
  );
};
