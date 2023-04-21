import React from 'react';

export default function ButtonOpen({ name, onClick }) {
  return (
    <button
      onClick={() => onClick()}
      className="pl-2 pr-2 text-sm text-center rounded content-center text-gray-light bg-secondary"
    >
      {name}
    </button>
  );
}
