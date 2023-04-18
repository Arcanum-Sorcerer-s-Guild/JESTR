import React from "react";


export default function ButtonClose({ name, onClick }) {
    return (
        <button
            className="h-6 w-auto m-2 text=xxl text-center border rounded content-center  bg-primary"
            onClick={() => onClick()}
        >
            {name}
        </button>
    )
}