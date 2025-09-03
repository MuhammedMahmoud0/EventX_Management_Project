import React from "react";
import Sidebar from "../../global/Sidebar";

function Page({ children, header, classname, sparse }) {
    return (
        <div className={`${classname}`}>
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Main Content in the sparse area */}
            <div className={`${sparse}`}>
                {header && <div className="-mt-8">{header}</div>}
                {children}
            </div>
        </div>
    );
}

export default Page;
