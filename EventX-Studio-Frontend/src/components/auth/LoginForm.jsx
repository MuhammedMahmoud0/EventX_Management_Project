import React, { useState } from "react";
import { login } from "../../services/authService";
import Button from "../common/Button";
import { jwtDecode } from "jwt-decode";

const LoginForm = ({ onSuccess, onError }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await login({ email, password });
            if (data?.token) {
                localStorage.setItem("token", data.token);
                const role =
                    data?.user?.role ||
                    jwtDecode(data.token)?.user?.role ||
                    "user";
                onSuccess(role);
            } else {
                onError("No token received");
            }
        } catch (err) {
            console.error(err);
            onError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                className="block w-full p-2 border rounded"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="block w-full p-2 border rounded"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="primary" className="w-full">
                {loading ? "Signing in..." : "Login"}
            </Button>
        </form>
    );
};

export default LoginForm;
