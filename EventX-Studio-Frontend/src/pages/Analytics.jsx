import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import DashLineChart from "../components/charts/LineChart";
import { getReports } from "../services/analyticsService";

const Analytics = () => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getReports({ type: "sales" })
            .then((data) =>
                setSalesData(
                    data.map((item) => ({ week: item._id, amount: item.count }))
                )
            ) // Adapt to chart format
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading analytics...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Page
            classname="flex bg-black min-h-screen"
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <h1>Analytics & Reports</h1>
            <DashLineChart data={salesData} />
            {/* Add more reports/charts as needed */}
        </Page>
    );
};

export default Analytics;
