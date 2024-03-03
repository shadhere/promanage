import Modal from "../Modal/Modal";
import styles from "./LogoutModal.module.css";

const DeleteModal = (props) => {
  const { isOpen, onClose, handleLogout } = props;

  const handleLogoutbyCaardId = () => {
    handleLogout();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.deleteModal}>
        <h2>Are you sure you want to Logout?</h2>
        <div className={styles.deleteModalButtons}>
          <button
            onClick={handleLogoutbyCaardId}
            className={styles.deleteButton}
          >
            Yes, Logout
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
