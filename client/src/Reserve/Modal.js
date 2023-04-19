import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useState } from 'react';
import CloseButton from './ButtonClose';
const Modal = ({ isvisible, onClose, children }) => {
  if (!isvisible) return null;
  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };
  return (
    <div
      id="wrapper"
      className="fixed h-full overflow-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm  justify-center items-center text-center p-5"
      onClick={handleClose}
    >
      <div className="relative h-full  mt-12 flex flex-col">
        <div className="place-self-end absolute right-2 top-2">
          <CloseButton name={'✖️'} onClick={() => onClose()} />
        </div>
        <div className="bg-text p-2 h-[70%] justify-center rounded">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
