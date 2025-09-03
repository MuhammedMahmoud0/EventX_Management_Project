import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLoginSuccess = (role) => {
        navigate(role === "admin" ? "/admin/dashboard" : "/events");
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center ">
            <div className="card w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                    Sign in to EventX Studio
                </h2>
                <LoginForm onSuccess={handleLoginSuccess} onError={setError} />
                {error && <div className="mt-3 text-red-500">{error}</div>}

                {/* 👇 Add this */}
                <p className="mt-4 text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
