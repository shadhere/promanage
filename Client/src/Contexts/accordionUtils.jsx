import { useContext } from "react";
import { AccordionContext } from "./accordion"; // Assuming AccordionContext is exported from the AccordionProvider file

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "useAccordionContext must be used within an AccordionProvider"
    );
  }
  return context;
};
