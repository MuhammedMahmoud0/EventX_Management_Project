import React, { useState } from "react";
import { register } from "../../services/authService";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        age: "",
        gender: "",
        location: "",
        interests: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await register({
                ...form,
                age: Number(form.age),
                interests: form.interests
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
            });
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            {error && <div className="text-sm text-red-500">{error}</div>}
            <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
            />
            <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
            />
            <div className="grid grid-cols-2 gap-2">
                <input
                    name="age"
                    placeholder="Age"
                    value={form.age}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="p-2 border rounded"
                >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
            />
            <input
                name="interests"
                placeholder="Interests (comma separated)"
                value={form.interests}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
            />
            <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="p-2 border rounded w-full"
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <Button type="submit" variant="primary" className="w-full">
                Register
            </Button>
        </form>
    );
};

export default RegisterForm;
