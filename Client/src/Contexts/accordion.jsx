import React, { createContext, useContext, useState } from "react";

// Create a context for managing accordion state
const AccordionContext = createContext();

// Custom hook to use the accordion context
export const useAccordionContext = () => useContext(AccordionContext);

// Accordion context provider component
// Accordion context provider component
// Accordion context provider component
export const AccordionProvider = ({ children }) => {
  const [accordionStates, setAccordionStates] = useState({});

  const toggleAccordion = (accordionId) => {
    setAccordionStates((prevStates) => ({
      ...prevStates,
      [accordionId]: !prevStates[accordionId],
    }));
  };

  const collapseAll = (board) => {
    setAccordionStates((prevStates) => ({
      ...prevStates,
      [board]: {},
    }));
  };

  return (
    <AccordionContext.Provider
      value={{ accordionStates, toggleAccordion, collapseAll }}
    >
      {children}
    </AccordionContext.Provider>
  );
};
