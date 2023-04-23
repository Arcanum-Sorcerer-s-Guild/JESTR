import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBarLink({ key, to, children }) {
    <Link
        key={key}
        to={to}
        className={`duration-300 flex md:inline-flex p-4 items-center bg-gunmetal hover:text-text text-blue`}
    >
        {children}
    </Link>
}