import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useState } from 'react';

//icons
import { AiFillCloseCircle } from 'react-icons/ai';

const Modal = ({ isvisible, onClose, children }) => {
  if (!isvisible) return null;
  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };
  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-blue-darker bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="relative overflow-hidden bg-blue-darker rounded">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green via-blue to-pink" />
        <div className="flex justify-around text-xs text-gray-light/50 bg-gray-dark p-3">
          <div className="justify-center rounded">{children}</div>
          <button
            className="text-gray text=xl place-self-end absolute right-2 top-2"
            onClick={() => onClose()}
          >
            <AiFillCloseCircle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
