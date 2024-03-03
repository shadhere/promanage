import Modal from "../Modal/Modal";
import styles from "./DeleteModal.module.css";

const DeleteModal = (props) => {
  const { isOpen, onClose, handleDelete } = props;

  const handleDeletebyCaardId = () => {
    handleDelete();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.deleteModal}>
        <h2>Are you sure you want to Delete?</h2>
        <div className={styles.deleteModalButtons}>
          <button
            onClick={handleDeletebyCaardId}
            className={styles.deleteButton}
          >
            Yes, Delete
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
