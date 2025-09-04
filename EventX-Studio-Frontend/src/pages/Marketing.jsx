import React, { useState } from "react";
import Page from "../components/common/Page";
import Button from "../components/common/Button";
import api from "../services/api";

const Marketing = () => {
    const [form, setForm] = useState({
        campaignName: "",
        targetAudience: "",
        budget: 0,
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/marketing", form);
            setSuccess("Campaign created successfully!");
            setForm({ campaignName: "", targetAudience: "", budget: 0 });
            setError(null);
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    return (
        <Page
            classname="flex bg-black min-h-screen"
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Marketing</h1>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
                <h2 className="text-lg font-semibold mb-4">
                    Create Marketing Campaign
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Campaign Name
                        </label>
                        <input
                            name="campaignName"
                            value={form.campaignName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Enter campaign name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Target Audience
                        </label>
                        <input
                            name="targetAudience"
                            value={form.targetAudience}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="e.g., 18-34, music fans"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Budget (LKR)
                        </label>
                        <input
                            name="budget"
                            type="number"
                            value={form.budget}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Enter budget"
                            required
                        />
                    </div>
                    <Button type="submit">Create Campaign</Button>
                </form>
            </div>
        </Page>
    );
};

export default Marketing;
