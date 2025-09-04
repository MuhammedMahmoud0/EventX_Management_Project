import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import SingleHeader from "../components/insights/SingleHeader";
import LolipopChart from "../components/charts/LolipopChart";
import SocialMediaCard from "../components/insights/SocialMediaCard";
import AttendeeLocationsCard from "../components/insights/AttendeeLocationsCard";
import DonutChart from "../components/charts/DonutChart";
import BarChart from "../components/charts/BarChart";
import { useParams } from "react-router-dom";
import { getEventInsights } from "../services/analyticsService";

const SingleEventAttendeeInsights = () => {
    const { id } = useParams();
    const [insights, setInsights] = useState({});
    const [loliData, setLoliData] = useState([]);
    const [interestsData, setInterestsData] = useState([]);
    const [barData, setBarData] = useState([]);

    useEffect(() => {
        getEventInsights(id)
            .then((data) => {
                setInsights(data);
                // Aggregate for lollipop (ages by date, assume createdAt in tickets)
                // For simplicity, group ages into buckets per "date" (mocked)
                const ageData = data.ageGroups.reduce((acc, age, idx) => {
                    const date = `Day ${(idx % 7) + 1}`;
                    if (!acc[date])
                        acc[date] = {
                            date,
                            "18-24": 0,
                            "25-34": 0,
                            "35-44": 0,
                            "45+": 0,
                        };
                    if (age < 25) acc[date]["18-24"]++;
                    // ... other buckets
                    return acc;
                }, {});
                setLoliData(Object.values(ageData));
                // Interests and bar similar to above
                // ...
            })
            .catch(console.error);
    }, [id]);

    return (
        <Page
            header={<SingleHeader />}
            classname="flex bg-black min-h-screen"
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 overflow-y-auto"
        >
            <div className="grid grid-cols-6 p-6 overflow-x-hidden">
                <div className="col-start-1 col-end-6">
                    <LolipopChart
                        data={loliData}
                        colors={{ "18-24": "#3b82f6" /* ... */ }}
                    />
                </div>
                <div className="col-start-1 col-end-3 mt-6">
                    <DonutChart /* ... */ data={interestsData} />
                </div>
                <div className="col-start-3 col-end-6 mt-6 mx-13">
                    <BarChart
                        data={barData}
                        style="bg-white p-4 rounded-xl shadow-lg w-135 h-[23rem]"
                    />
                </div>
                <div className="flex flex-col space-y-6 -mt-115">
                    <div className="-mx-30">
                        <SocialMediaCard data={insights.socialMedia} />
                    </div>
                    <div className="-mx-35 -mt-5">
                        <AttendeeLocationsCard locations={insights.locations} />
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default SingleEventAttendeeInsights;
