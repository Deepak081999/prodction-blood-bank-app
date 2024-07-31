import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Analytics = () => {
    const [data, setData] = useState([]);
    const [inventoryData, setInventoryData] = useState([]);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
    const colors = [
        "#884A39",
        "#C38154",
        "#FFC26F",
        "#4F709C",
        "#4942E4",
        "#0079FF",
        "#FF0060",
        "#22A699",
    ];

    const getBloodGroupData = async () => {
        try {
            const { data } = await API.get("/analytics/bloodGroups-data");
            if (data?.success) {
                setData(data?.bloodGroupData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBloodGroupData();
    }, []);

    const getBloodRecords = async () => {
        try {
            const { data } = await API.get("/inventory/get-recent-inventory");
            if (data?.success) {
                setInventoryData(data?.inventory);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBloodRecords();
    }, []);

    const handleBloodGroupSelect = (bloodGroup) => {
        setSelectedBloodGroup(bloodGroup);
    };

    const pieData = {
        labels: data.map(record => record.bloodGroup),
        datasets: [{
            data: data.map(record => record.availabeBlood),
            backgroundColor: colors,
        }]
    };

    const filteredInventoryData = selectedBloodGroup
        ? inventoryData.filter(record => record.bloodGroup === selectedBloodGroup)
        : [];

    const selectedData = data.find(record => record.bloodGroup === selectedBloodGroup) || {};

    const pieChartData = selectedBloodGroup
        ? {
            labels: ['Available Blood', 'Total In', 'Total Out'],
            datasets: [{
                data: [
                    selectedData.availabeBlood || 0,
                    selectedData.totalIn || 0,
                    selectedData.totalOut || 0
                ],
                backgroundColor: ['#4F709C', '#FFC26F', '#FF0060'],
            }]
        }
        : {
            labels: [],
            datasets: []
        };

    const barData = {
        labels: data.map(record => record.bloodGroup),
        datasets: [
            {
                label: 'Total In (ML)',
                data: data.map(record => record.totalIn),
                backgroundColor: '#4F709C',
            },
            {
                label: 'Total Out (ML)',
                data: data.map(record => record.totalOut),
                backgroundColor: '#FFC26F',
            }
        ]
    };

    const barChartData = {
        labels: filteredInventoryData.length > 0
            ? filteredInventoryData.map(record => moment(record.createdAt).format("DD/MM/YYYY"))
            : ['No Data Available'],
        datasets: [
            {
                label: `Quantity (ML) of ${selectedBloodGroup}`,
                data: filteredInventoryData.length > 0
                    ? filteredInventoryData.map(record => record.quantity)
                    : [0],
                backgroundColor: '#4F709C',
            },
            {
                label: `Total In (ML) of ${selectedBloodGroup}`,
                data: [selectedData.totalIn || 0],
                backgroundColor: '#FFC26F',
            },
            {
                label: `Total Out (ML) of ${selectedBloodGroup}`,
                data: [selectedData.totalOut || 0],
                backgroundColor: '#FF0060',
            }
        ]
    };

    return (
        <>
            <Header />
            <div className="container my-3">
                <h1 className="my-3">Overall Blood Group Distribution</h1>
                <div className="chart-row" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <Pie data={pieData} />
                    </div>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <Bar data={barData} />
                    </div>
                </div>

                <h1 className="my-3">Blood Group Analysis: Detailed View</h1>
                <p className="my-3">
                    Select a specific blood group from the buttons above to view detailed analytics and transaction data for that blood type. This section provides insights into the distribution, recent transactions, and changes in inventory related to the selected blood group.
                </p>
                <div style={{ marginBottom: '20px' }}>
                    {data.map(record => (
                        <button
                            key={record.bloodGroup}
                            className="btn btn-primary m-2"
                            onClick={() => handleBloodGroupSelect(record.bloodGroup)}
                        >
                            {record.bloodGroup}
                        </button>
                    ))}
                </div>

                {selectedBloodGroup && (
                    <>
                        <h2 className="my-3">Details for {selectedBloodGroup}</h2>
                        <div className="chart-row" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                            {/* <div style={{ flex: '1', minWidth: '300px' }}>
                                <Pie data={pieChartData} />
                            </div> */}
                            <div style={{ flex: '1', minWidth: '300px' }}>
                                <Bar data={barChartData} />
                            </div>
                        </div>

                        <h2 className="my-3">Recent Blood Transactions</h2>
                        <div className="container my-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Blood Group</th>
                                        <th scope="col">Inventory Type</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Donor Email</th>
                                        <th scope="col">Time & Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInventoryData.map(record => (
                                        <tr key={record._id}>
                                            <td>{record.bloodGroup}</td>
                                            <td>{record.inventoryType}</td>
                                            <td>{record.quantity} (ML)</td>
                                            <td>{record.email}</td>
                                            <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Analytics;
