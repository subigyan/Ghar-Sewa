import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import { getCustomers } from "../../../api/customer";
import { getStats } from "../../../api/serviceProvider";
import { getAllReviews } from "../../../api/review";
import { BsPeopleFill } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";
import { MdOutlineRateReview } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [serviceProviderCount, setServiceProviderCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [serviceTypeCount, setServiceTypeCount] = useState([]);

  useEffect(() => {
    getCustomers()
      .then((res) => {
        setCustomerCount(res.count);
      })
      .catch((err) => console.log("No Customers"));
    getStats()
      .then((res) => {
        setServiceProviderCount(res?.data?.totalServiceProviders);
        setServiceTypeCount(res?.data?.serviceTypeCOunt);
      })
      .catch((err) => console.log("No Service Providers"));
    getAllReviews()
      .then((res) => {
        setReviewCount(res.count);
      })
      .catch((err) => console.log("No Reviews"));
  }, []);

  const pieData = [
    {
      name: "Customer",
      value: customerCount,
    },
    {
      name: "Service Provider",
      value: serviceProviderCount,
    },
  ];

  const COLORS = ["#00A19D", "#005A8D"];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    console.log(`${(percent * 100).toFixed(0)}%`);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-screen flex font-montserrat">
      <Sidebar active={"dashboard"} />
      <div className="w-full max-h-screen overflow-y-scroll overflow-x-hidden py-8 px-8  font-poppins ">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <div className="flex w-full mt-8 justify-between">
          <div className="w-[30%]  rounded-2xl border shadow-lg p-4 border-l-8 border-l-[#334257]">
            <div className="flex items-center">
              <div className=" rounded-lg p-1">
                <BsPeopleFill className="text-6xl" />
              </div>
              <div>
                <h1 className="ml-4 text-3xl font-semibold">{customerCount}</h1>
                <h1 className=" ml-4 text-xl font-semibold">Customers</h1>
              </div>
            </div>
          </div>
          <div className="w-[30%]  rounded-2xl border shadow-lg p-4 border-l-8 border-l-[#476072]">
            <div className="flex items-center">
              <div className=" rounded-lg p-1">
                <GrUserWorker className="text-6xl" />
              </div>
              <div>
                <h1 className="ml-4 text-3xl font-semibold">
                  {serviceProviderCount}
                </h1>
                <h1 className=" ml-4 text-xl font-semibold">
                  Service Providers
                </h1>
              </div>
            </div>
          </div>
          <div className="w-[30%]  rounded-2xl border shadow-lg p-4 border-l-8 border-l-[#548CA8]">
            <div className="flex items-center">
              <div className=" rounded-lg p-1">
                <MdOutlineRateReview className="text-6xl" />
              </div>
              <div>
                <h1 className="ml-4 text-3xl font-semibold">{reviewCount}</h1>
                <h1 className=" ml-4 text-xl text-gray-600 font-semibold">
                  Reviews
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-16 flex-wrap">
          <div className=" w-[55%]  shadow-xl min-w-[610px]">
            <h2 className="text-2xl font-semibold mt-4 text-center z-1">
              Service Providers
            </h2>
            <div className="capitalize -ml-6">
              <BarChart
                className=""
                width={660}
                height={320}
                data={serviceTypeCount}
                margin={{
                  top: 20,
                  right: 40,
                  bottom: 5,
                }}
              >
                <XAxis
                  dataKey="serviceType"
                  interval={0}
                  tick={{ fontSize: 12.5 }}
                />
                <YAxis domain={[0]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#25344d" barSize={25} />
              </BarChart>
            </div>
          </div>
          <div className="capitalize w-[35%]   min-w-[480px] shadow-xl">
            <h2 className="text-2xl font-semibold mt-4 text-center z-1">
              User Demographics
            </h2>
            <div className="-mt-14 z-0">
              <PieChart width={400} height={400} className="">
                <Pie
                  dataKey="value"
                  data={pieData}
                  cx={200}
                  cy={200}
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  wrapperStyle={{
                    top: 300,
                    left: 320,
                    lineHeight: "24px",
                  }}
                  iconSize={10}
                  width={400}
                  height={140}
                  layout="vertical"
                  verticalAlign="middle"
                />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
