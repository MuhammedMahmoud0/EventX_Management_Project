import React, { useMemo } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const DashLineChart = ({
    data = [],
    timeFrame = "Daily",
    currency = "LKR",
}) => {
    if (!data.length) return <p>No sales data</p>;

    const totalSales = data.reduce((acc, curr) => acc + curr.amount, 0);
    const processedData = data.map((item) => ({
        ...item,
        percentageShare: Number(((item.amount / totalSales) * 100).toFixed(1)),
    }));

    // Configuration object approach
    const chartConfig = {
        currency: currency,
        timeFrame: timeFrame,
        colorScheme: {
            primary: "#ef4444",
            background: "#ffffff",
            text: "#374151",
            muted: "#9ca3af",
        },
    };

    // Business metrics calculator
    const businessMetrics = useMemo(
        () => ({
            revenue: processedData.reduce((sum, week) => sum + week.amount, 0),
            ticketsSold: 2438,
            eventsHosted: 32,
        }),
        [processedData]
    );

    // Tooltip content generator
    const generateTooltipContent = ({ active, payload, label }) => {
        if (!active || !payload?.[0]) return null;

        const currentData = payload[0];
        return (
            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                <p className="text-gray-600">{label}</p>
                <p className="text-red-500 font-semibold">
                    {currentData.value.toLocaleString()} {}
                </p>
                <p className="text-gray-500 text-sm">
                    {currentData.payload.percentageShare}%
                </p>
            </div>
        );
    };

    // Data point visualization
    const createDataPoint = ({ cx, cy, payload }) => {
        const displayAmount = (payload.amount / 1000).toFixed(0);

        return (
            <g>
                <circle
                    cx={cx}
                    cy={cy}
                    r={3}
                    fill={chartConfig.colorScheme.primary}
                    stroke={chartConfig.colorScheme.background}
                    strokeWidth={1}
                />
                <text
                    x={cx}
                    y={cy - 30}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-gray-700"
                >
                    {displayAmount}k
                </text>
                <text
                    x={cx}
                    y={cy - 12}
                    textAnchor="middle"
                    className="text-xs fill-gray-500"
                >
                    {payload.percentageShare}%
                </text>
            </g>
        );
    };

    // Y-axis formatter function
    const formatAxisValue = (value) => `${Math.floor(value / 1000)}k`;

    // Header section renderer
    const HeaderSection = () => {
        const DropdownIcon = () => (
            <svg
                width="10"
                height="6"
                viewBox="0 0 12 8"
                fill="none"
                className="text-gray-400"
            >
                <path
                    d="M1 1L6 6L11 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );

        return (
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">
                        NET SALES
                    </h2>
                    <DropdownIcon />
                </div>

                <div className="flex items-center bg-black text-white px-3 py-1 rounded-full">
                    <img
                        src="/assets/LineChart/Filter.svg"
                        alt="Filter"
                        className="w-3 h-3 mr-1"
                    />
                    <span className="text-xs font-medium">
                        Filter: {chartConfig.timeFrame}
                    </span>
                </div>
            </div>
        );
    };

    // Metrics display component
    const MetricsDisplay = () => {
        const metricItems = [
            {
                label: "Total Revenue",
                value: `${businessMetrics.revenue.toLocaleString()} ${
                    chartConfig.currency
                }`,
            },
            {
                label: "Total Tickets",
                value: `${businessMetrics.ticketsSold} Tickets`,
            },
            {
                label: "Total Events",
                value: `${businessMetrics.eventsHosted} Events`,
            },
        ];

        return (
            <div className="grid grid-cols-3 gap-4 mb-4">
                {metricItems.map((metric, idx) => (
                    <div key={idx}>
                        <p className="text-gray-500 text-xs">{metric.label}</p>
                        <p className="text-red-500 text-sm font-bold">
                            {metric.value}
                        </p>
                    </div>
                ))}
            </div>
        );
    };

    // Chart configuration
    const chartSettings = {
        margins: { top: 30, right: 30, left: 0, bottom: 0 },
        gridStyle: { strokeDasharray: "3 3", stroke: "#f0f0f0" },
        axisStyle: {
            axisLine: false,
            tickLine: false,
            tick: { fontSize: 12, fill: "#9ca3af" },
        },
        lineStyle: {
            type: "linear",
            stroke: chartConfig.colorScheme.primary,
            strokeWidth: 3,
            activeDot: {
                r: 6,
                fill: "#ef4444",
                stroke: "#ffffff",
                strokeWidth: 2,
            },
        },
    };

    return (
        <div
            className="bg-white rounded-lg border border-blue-200 p-4 w-full"
            style={{ height: "370px" }}
        >
            <HeaderSection />
            <MetricsDisplay />

            <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={processedData}
                        margin={chartSettings.margins}
                    >
                        <CartesianGrid {...chartSettings.gridStyle} />
                        <XAxis dataKey="week" {...chartSettings.axisStyle} />
                        <YAxis
                            {...chartSettings.axisStyle}
                            tickFormatter={formatAxisValue}
                        />
                        <Tooltip content={generateTooltipContent} />
                        <Line
                            {...chartSettings.lineStyle}
                            dataKey="amount"
                            dot={createDataPoint}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashLineChart;
