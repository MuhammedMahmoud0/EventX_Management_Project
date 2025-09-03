import React from "react";

const Card = ({ icon, name, value, valueColor }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-8 flex items-center space-x-4 w-90">
            {/* Icon Section */}
            <div className="flex items-center justify-center w-20 h-12">
                <img src={icon} alt="" className="w-20 h-20" />
            </div>

            {/* Text Section */}
            <div className="flex flex-col">
                <span className="text-black text-sm font-semibold">{name}</span>
                <span className={`${valueColor} font-bold text-2xl`}>
                    {value}
                </span>
            </div>
        </div>
    );
};

export default Card;
