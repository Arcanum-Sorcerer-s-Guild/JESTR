import React from "react";

export default function ButtonOpen({ name, onClick }) {
    return (
        <button
            onClick={() => onClick()}
            className="h-10 w-auto m-2 pl-2 pr-2 text=xxl text-center border rounded content-center  bg-primary"
        >
            {name}
        </button>
    );
}
