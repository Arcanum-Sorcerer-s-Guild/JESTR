import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBarLinkItem({ key, to, children }) {
  return (
    <Link
      key={key}
      to={to}
      className={`flex md:inline-flex p-4 items-center bg-gunmetal hover:text-text`}
    >
      {children}
    </Link>
  );
}
