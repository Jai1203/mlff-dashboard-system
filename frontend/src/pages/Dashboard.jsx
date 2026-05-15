import { useEffect, useState } from "react";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {

  const [stats, setStats] = useState([]);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const res = await API.get(
        "/dashboard-stats"
      );

      setStats(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const latest = stats[0];

  if (!latest) {
    return <div className="p-10">Loading...</div>;
  }

  const chartData = [
    {
      name: "Clean",
      value: latest.clean_txn_count,
    },
    {
      name: "E-Notice",
      value: latest.enotice_txn_count,
    },
    {
      name: "Dispute",
      value: latest.dispute_txn_count,
    },
  ];

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-2">
        {latest.plaza_name}
      </h1>

      <p className="text-gray-500 mb-6">
        Dashboard Analytics
      </p>

      <div className="grid grid-cols-5 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Total</p>
          <h2 className="text-3xl font-bold">
            {latest.total_txn_count}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Clean</p>
          <h2 className="text-3xl font-bold text-green-500">
            {latest.clean_txn_count}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>E-Notice</p>
          <h2 className="text-3xl font-bold text-yellow-500">
            {latest.enotice_txn_count}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>In Progress</p>
          <h2 className="text-3xl font-bold text-blue-500">
            {latest.inprogress_txn_count}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Dispute</p>
          <h2 className="text-3xl font-bold text-red-500">
            {latest.dispute_txn_count}
          </h2>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow h-96">

          <h2 className="text-xl font-bold mb-4">
            Distribution
          </h2>

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                outerRadius={120}
                label
              >

                <Cell fill="#22c55e" />
                <Cell fill="#facc15" />
                <Cell fill="#ef4444" />

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4">
            Transaction Breakdown
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b text-left">

                <th className="pb-2">Category</th>
                <th className="pb-2">Count</th>
                <th className="pb-2">Amount</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">
                <td className="py-2">Clean</td>
                <td>{latest.clean_txn_count}</td>
                <td>{latest.clean_txn_amount}</td>
              </tr>

              <tr className="border-b">
                <td className="py-2">E-Notice</td>
                <td>{latest.enotice_txn_count}</td>
                <td>{latest.enotice_txn_amount}</td>
              </tr>

              <tr className="border-b">
                <td className="py-2">Dispute</td>
                <td>{latest.dispute_txn_count}</td>
                <td>{latest.dispute_txn_amount}</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}