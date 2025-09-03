import React from "react";

const Button = ({
    children,
    onClick,
    className = "",
    variant = "primary",
    type = "button",
}) => {
    const base =
        "px-4 py-2 rounded-2xl font-semibold transition-shadow inline-flex items-center gap-2";
    const variants = {
        primary: "bg-indigo-600 text-white hover:shadow-lg",
        secondary:
            "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50",
        danger: "bg-red-500 text-white hover:shadow-md",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${base} ${
                variants[variant] || variants.primary
            } ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
