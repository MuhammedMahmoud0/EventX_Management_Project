import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => (
    <div className="min-h-[80vh] flex items-center justify-center">
        <div className="card w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create an account</h2>
            <RegisterForm />

            {/* 👇 Add this */}
            <p className="mt-4 text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-indigo-600 font-medium hover:underline"
                >
                    Login here
                </Link>
            </p>
        </div>
    </div>
);

export default Register;
