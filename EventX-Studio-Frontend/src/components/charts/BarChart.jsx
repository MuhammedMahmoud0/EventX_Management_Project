import React from "react";

export default function BarChart({ data, style }) {
    const maxValue = Math.max(...data.map((d) => d.value));

    return (
        <div className={style}>
            <h2 className="text-lg font-bold text-gray-800 mb-4 tracking-wide">
                ALL ATTENDEE LOCATIONS
            </h2>

            <div className="flex">
                {/* Y-axis labels and grid lines */}
                <div
                    className="flex flex-col justify-between"
                    style={{ height: "250px" }}
                >
                    {[1000, 800, 600, 400, 200, 0].map((tick) => (
                        <div key={tick} className="flex items-center">
                            <span className="text-xs text-gray-400 w-8 text-right">
                                {tick}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Chart area */}
                <div className="flex-1 relative ml-4">
                    {/* Grid lines behind bars */}
                    <div
                        className="absolute inset-0 flex flex-col justify-between"
                        style={{ height: "250px" }}
                    >
                        {[1000, 800, 600, 400, 200, 0].map((tick) => (
                            <div key={tick} className="h-px bg-gray-200"></div>
                        ))}
                    </div>

                    {/* Bars */}
                    <div className="relative px-2" style={{ height: "250px" }}>
                        <div className="flex justify-between h-full">
                            {data.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex-1 mx-1 relative"
                                >
                                    {/* Bar */}
                                    <div
                                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 max-w-12 w-full ${item.color} rounded-t-full transition-all duration-500 ease-out`}
                                        style={{
                                            height: `${
                                                (item.value / maxValue) * 100
                                            }%`,
                                            minHeight: "3px",
                                        }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Value and percentage labels */}
                    <div className="flex justify-between px-2 mt-4">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className="flex-1 mx-1 text-center"
                            >
                                <div className="text-xs font-semibold text-gray-800 mb-1">
                                    {item.value}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {item.percentage}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
