import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import Button from "../components/common/Button";
import api from "../services/api";

const EventCategories = () => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/tags")
            .then((res) => {
                setTags(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleAddTag = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/tags", { name: newTag });
            setTags([...tags, res.data]);
            setNewTag("");
            setSuccess("Tag added successfully!");
            setError(null);
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    const handleDeleteTag = async (id) => {
        try {
            await api.delete(`/tags/${id}`);
            setTags(tags.filter((tag) => tag._id !== id));
            setSuccess("Tag deleted successfully!");
            setError(null);
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    if (loading) return <p>Loading tags...</p>;

    return (
        <Page
            classname="flex bg-black min-h-screen"
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Event Categories
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
                <h2 className="text-lg font-semibold mb-4">Manage Tags</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleAddTag} className="mb-6">
                    <div className="flex space-x-4">
                        <input
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter new tag"
                            required
                        />
                        <Button type="submit">Add Tag</Button>
                    </div>
                </form>
                <div className="space-y-2">
                    {tags.map((tag) => (
                        <div
                            key={tag._id}
                            className="flex justify-between items-center p-2 bg-gray-100 rounded"
                        >
                            <span>{tag.name}</span>
                            <Button
                                variant="danger"
                                onClick={() => handleDeleteTag(tag._id)}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </Page>
    );
};

export default EventCategories;
