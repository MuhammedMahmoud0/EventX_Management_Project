import React, { useState } from "react";
import Page from "../components/common/Page";
import Button from "../components/common/Button";
import api from "../services/api";

const Support = () => {
    const [form, setForm] = useState({ subject: "", message: "" });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/support", form);
            setSuccess("Support request submitted successfully!");
            setForm({ subject: "", message: "" });
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
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Support</h1>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
                <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Subject
                        </label>
                        <input
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Enter subject"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Message
                        </label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            className="w-full p-2 border rounded h-32"
                            placeholder="Describe your issue"
                            required
                        />
                    </div>
                    <Button type="submit">Submit Request</Button>
                </form>
            </div>
        </Page>
    );
};

export default Support;
