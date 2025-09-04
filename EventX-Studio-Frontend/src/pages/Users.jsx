import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import { getAllUsers, deleteUser } from "../services/userService";
import Button from "../components/common/Button";

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUsers()
            .then((data) => setUsers(data.users))
            .catch(console.error);
    }, []);

    const handleDelete = (id) => {
        deleteUser(id)
            .then(() => setUsers(users.filter((u) => u._id !== id)))
            .catch(console.error);
    };

    return (
        <Page
            classname="flex bg-black min-h-screen"
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <h1>User Management</h1>
            {users.map((user) => (
                <div
                    key={user._id}
                    className="bg-white p-4 rounded shadow mb-4 flex justify-between"
                >
                    <p>
                        {user.name} ({user.email}) - Role: {user.role}
                    </p>
                    <Button
                        variant="danger"
                        onClick={() => handleDelete(user._id)}
                    >
                        Delete
                    </Button>
                </div>
            ))}
        </Page>
    );
};

export default Users;
