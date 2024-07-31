import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <Layout>
            <div className="container">
                <div className="d-felx flex-column mt-4">
                    <h1>
                        Welcome Admin <i className="text-success">{user?.name}</i>
                    </h1>
                    <h3>Manage Blood Bank App </h3>
                    <hr />
                    <p>
                        Welcome to the Manage Blood Bank App! This application allows you to efficiently manage blood donations, donor records, and blood inventory. Whether you're a healthcare provider or a blood bank administrator, our app offers a user-friendly interface to track donations, schedule donor appointments, and manage inventory levels.
                    </p>
                    <p>
                        Key Features:
                    </p>
                    <ul>
                        <li>Register and manage donor information.</li>
                        <li>Track blood types and inventory levels.</li>
                        <li>Schedule donation appointments.</li>
                        <li>Generate reports on blood inventory and donor activities.</li>
                        <li>Ensure compliance with health and safety standards.</li>
                    </ul>
                    <p>
                        Our app is designed to streamline your operations, enhance donor engagement, and ensure that critical blood supplies are always available when needed. Join us in making a positive impact on the community by managing your blood bank more effectively.
                    </p>

                </div>
            </div>
        </Layout>
    );
};

export default AdminHome;