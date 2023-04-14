import {AiOutlineCloseCircle} from 'react-icons/ai';
import { useState } from 'react';

const Modal = ({isvisible, onClose, children}) => {
    if(!isvisible) return null;
    const handleClose = (e) => {
        if(e.target.id === 'wrapper') onClose();
    }
    return ( 
        <div id='wrapper' className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" onClick={handleClose}>
            <div className="relative md:w-[60%] w-[90%] flex flex-col">
            <button className="text-black text=xl place-self-end absolute right-2 top-2" onClick={() => onClose()}>x</button>
            <div className='bg-text p-2 h-[70%] justify-center rounded'>
                     {children}
                 </div>
            </div>
        </div>
     );
}
 
export default Modal;
// if(!visable) return null;
// const handleClose = (e) => {
//     if(e.target.id === 'wrapper') onClose();
// }
// return ( 
//     <>
//         <div id='wrapper' className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" onClick={handleClose}>
//             <div className="relative md:w-[60%] w-[90%] flex flex-col">
//                 <button className="text-black text=xl place-self-end absolute right-2 top-2" onClick={() => onClose()}><AiOutlineCloseCircle className='text-xl text-gray-light'/></button>
//                 <div className='bg-text p-2 h-[70%] justify-center rounded'>
//                     {children}
//                 </div>
//             </div>

//         </div>
//     </>
//  );
// }