import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import Button from "../components/common/Button";
import { getMyProfile, updateMyProfile } from "../services/userService";

const Settings = () => {
    const [form, setForm] = useState({ name: "", email: "" });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyProfile()
            .then((data) => {
                setForm({ name: data.name, email: data.email });
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateMyProfile(form);
            setSuccess("Profile updated successfully!");
            setError(null);
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    if (loading) return <p>Loading profile...</p>;

    return (
        <Page
            classname="flex bg-black min-h-screen"
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
                <h2 className="text-lg font-semibold mb-4">Update Profile</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <Button type="submit">Save Changes</Button>
                </form>
            </div>
        </Page>
    );
};

export default Settings;
