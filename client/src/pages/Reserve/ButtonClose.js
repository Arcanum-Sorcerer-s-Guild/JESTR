import React from 'react';

export default function ButtonClose({ name, onClick }) {
  return (
    <button
      className="m-2 text-sm text-center rounded-full w-5 content-center bg-gray-dark text-gray-light"
      onClick={() => onClick()}
    >
      {name}
    </button>
  );
}
