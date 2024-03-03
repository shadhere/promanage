import React, { useState } from "react";
import styles from "./MenuModal.module.css"; // Import CSS module for styling
import dropDownIcon from "../../assets/dropDownIcon.svg";

function MenuModal({ options, fetchTasks }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("This week");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    fetchTasks(option);
  };

  // Check if options is an array
  if (!Array.isArray(options)) {
    console.error("Options prop must be an array");
    return null; // Or return an error message, or handle it in some other way
  }

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownToggle} onClick={toggleDropdown}>
        {selectedOption}{" "}
        <img
          src={dropDownIcon}
          className={styles.dropdownIcon}
          alt="Dropdown icon"
        />
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <li key={index} onClick={() => selectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MenuModal;
