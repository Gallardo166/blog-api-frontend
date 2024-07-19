import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "../styles/DeleteModal.module.css";

const DeleteModal = function({ isOpen, setDeleteModalOpen, handleDelete }) {
  const deleteModal = useRef(null);

  useEffect(() => {
    if (isOpen) {
      deleteModal.current?.showModal();
    } else {
      deleteModal.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog className={styles.modal} ref={deleteModal}>
      <p>Are you sure?</p>
      <div className={styles.buttons}>
        <button className={styles.cancelButton} onClick={() => setDeleteModalOpen(false)}>Cancel</button>
        <button className={styles.deleteButton} onClick={handleDelete}>Delete</button>
      </div>
    </dialog>
  )
};

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setDeleteModalOpen: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default DeleteModal;