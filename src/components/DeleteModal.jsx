import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

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
    <dialog ref={deleteModal}>
      <p>Are you sure?</p>
        <button onClick={() => setDeleteModalOpen(false)}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
    </dialog>
  )
};

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setDeleteModalOpen: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default DeleteModal;