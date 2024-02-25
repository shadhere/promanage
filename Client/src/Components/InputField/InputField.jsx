import styles from "./InputField.module.css";

const InputField = (props) => {
  const { type, name, value, onChange, icon, placeholder, ...rest } = props;

  return (
    <div className={styles.inputContainer}>
      <img src={icon} alt={name} className={styles.inputIcon} />
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.inputField}
        {...rest} // Spread any additional props
      />
    </div>
  );
};

export default InputField;
