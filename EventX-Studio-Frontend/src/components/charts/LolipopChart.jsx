import React from "react";
import { ResponsiveBar } from "@nivo/bar";

// const data = [
//     { date: "01", "18-24": 19, "25-34": 28, "35-44": 39, "45+": 51 },
//     { date: "02", "18-24": 20, "25-34": 31, "35-44": 39, "45+": 49 },
//     { date: "03", "18-24": 23, "25-34": 25, "35-44": 39, "45+": 48 },
//     { date: "04", "18-24": 21, "25-34": 28, "35-44": 43, "45+": 49 },
//     { date: "05", "18-24": 22, "25-34": 29, "35-44": 43, "45+": 49 },
//     { date: "06", "18-24": 18, "25-34": 31, "35-44": 44, "45+": 49 },
//     { date: "07", "18-24": 24, "25-34": 33, "35-44": 41, "45+": 52 },
// ];

const colors = {
    "18-24": "#3b82f6", // blue
    "25-34": "#f59e0b", // amber
    "35-44": "#ef4444", // red
    "45+": "#10b981", // green
};

const LolipopChart = ({ data = [], colors = {} }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-[1100px]">
            <h2 className="text-lg font-semibold text-gray-700 mb-6 tracking-wider">
                ATTENDEE AGE
            </h2>
            <div className="h-[350px] bg-white rounded-lg p-6">
                <ResponsiveBar
                    data={data}
                    keys={Object.keys(colors)}
                    indexBy="date"
                    margin={{ top: 50, right: 20, bottom: 50, left: 50 }}
                    padding={0.6}
                    layout="vertical"
                    colors={({ id }) => colors[id]}
                    borderRadius={999}
                    enableGridY={false}
                    enableGridX={true}
                    axisBottom={{ tickSize: 0, tickPadding: 12 }}
                    axisLeft={{ tickSize: 0, tickPadding: 8 }}
                    label={(d) => d.value}
                    labelSkipWidth={0}
                    labelSkipHeight={0}
                    labelTextColor="#fff"
                    legends={[
                        {
                            dataFrom: "keys",
                            anchor: "top-right",
                            direction: "row",
                            justify: false,
                            translateX: -20,
                            translateY: -40,
                            itemsSpacing: 20,
                            itemWidth: 80,
                            itemHeight: 20,
                            itemDirection: "left-to-right",
                            symbolSize: 14,
                            symbolShape: "circle",
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default LolipopChart;
