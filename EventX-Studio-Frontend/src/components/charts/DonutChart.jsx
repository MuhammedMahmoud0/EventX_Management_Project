import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const DonutChart = ({ classname, inner, outter, data, title, titleStyle }) => {
    const total = data.reduce((sum, entry) => sum + entry.value, 0);

    return (
        <div className={classname}>
            {/* Title */}
            <h2 className={titleStyle}>{title}</h2>

            {/* Chart */}
            <div className="flex-1">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={inner}
                            outerRadius={outter}
                            dataKey="value"
                            nameKey="label"
                            label={({ value }) =>
                                `${((value / total) * 100).toFixed(1)}%`
                            }
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value, name) => [
                                `${value} (${((value / total) * 100).toFixed(
                                    1
                                )}%)`,
                                name,
                            ]}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4">
                {data.map((entry, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center space-x-2"
                    >
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        ></span>
                        <span className="text-sm">{entry.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonutChart;
