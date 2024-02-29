import React, { createContext, useContext, useState } from "react";

// Create a context for managing accordion states
const AccordionContext = createContext();

export const useAccordionContext = () => useContext(AccordionContext);

export const AccordionProvider = ({ children }) => {
  // State to manage accordion states for all cards
  const [accordionStates, setAccordionStates] = useState({});

  // Function to toggle accordion states for a specific card
  const toggleAccordion = (cardId) => {
    setAccordionStates((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };

  // Function to collapse all accordions for a specific board
  const collapseAllForBoard = (boardName) => {
    const updatedStates = { ...accordionStates };
    Object.keys(updatedStates).forEach((cardId) => {
      if (cardId.startsWith(boardName)) {
        updatedStates[cardId] = false;
      }
    });
    setAccordionStates(updatedStates);
  };

  // Function to check if accordion is expanded or not
  const isAccordionExpanded = (cardId) => {
    return accordionStates[cardId] || false;
  };

  return (
    <AccordionContext.Provider
      value={{
        accordionStates,
        toggleAccordion,
        collapseAllForBoard,
        isAccordionExpanded,
      }}
    >
      {children}
    </AccordionContext.Provider>
  );
};
