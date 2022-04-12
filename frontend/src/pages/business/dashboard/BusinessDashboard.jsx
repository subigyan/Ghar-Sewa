import React, { useEffect, useState } from "react";

import Sidebar from "../../../components/business/Sidebar";
import { AiFillCloseSquare, AiFillStar } from "react-icons/ai";
import { getReviewStats } from "../../../api/review";
import { useRecoilValue } from "recoil";
import { serviceProviderAuthState } from "../../../atoms/authAtom";
import { getServiceProvider } from "../../../api/serviceProviderSearch";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Modal } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";
import { MdOutlineRateReview } from "react-icons/md";
import { GoVerified } from "react-icons/go";

const BusinessDashboard = () => {
  const user = useRecoilValue(serviceProviderAuthState);

  const [serviceProvider, setServiceProvider] = useState([]);

  useEffect(() => {
    getServiceProvider(user.id)
      .then((res) => {
        setServiceProvider(res.data);
      })
      .catch((err) => console.log("No Service Providers"));
  }, []);

  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    negativePercentage: 0,
    negativeReviews: 0,
    positivePercentage: 0,
    positiveReviews: 0,
    totalReviews: 0,
    maxStarCount: 0,
    ratingStats: [
      {
        name: "One Star",
        count: 0,
      },
      {
        name: "Two Stars",
        count: 0,
      },
      {
        name: "Three Stars",
        count: 0,
      },
      {
        name: "Four Stars",
        count: 0,
      },
      {
        name: "Five Stars",
        count: 0,
      },
    ],
  });

  useEffect(() => {
    getReviewStats(user?.id)
      .then((res) => {
        setReviewStats(res.data);
      })
      .catch((err) => console.log("No Reviews"));
  }, []);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  console.log(reviewStats);

  const data = [
    {
      name: "Positive Reviews",
      value: reviewStats.positiveReviews,
    },
    {
      name: "Negative Reviews",
      value: reviewStats.negativeReviews,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    value,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

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
          <div className="w-[30%]  rounded-2xl border shadow-lg p-4 border-l-8 border-l-indigo-900">
            <div className="flex items-center">
              <div className=" rounded-lg p-1">
                <AiFillStar className="text-6xl" />
              </div>
              <h1 className="ml-4 text-4xl font-semibold">
                {reviewStats.averageRating} Stars
              </h1>
            </div>
          </div>
          <div className="w-[30%]  rounded-2xl bg-green-100  shadow-lg p-4">
            <div className="flex items-center">
              <div className=" rounded-lg p-1">
                <MdOutlineRateReview className="text-6xl" />
              </div>
              <h1 className="ml-4 text-4xl font-semibold">
                {reviewStats.totalReviews} Reviews
              </h1>
            </div>
          </div>
          <div className="w-[30%]  rounded-2xl  bg-sky-100 shadow-lg p-4">
            {serviceProvider?.verified ? (
              <>
                <div className="flex items-center">
                  <div className=" rounded-lg p-1">
                    <GoVerified className="text-6xl" />
                  </div>
                  <h1 className="ml-4 text-4xl font-semibold">Vefied</h1>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <div className=" rounded-lg p-1">
                    <GoVerified className="text-6xl" />
                  </div>
                  <h1 className="ml-4 text-4xl font-semibold"> Not Vefied</h1>
                </div>
                <p
                  className="flex justify-end text-sm font-medium underline text-violet-900 cursor-pointer"
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  Request Verification
                </p>
              </>
            )}
          </div>
        </div>

        <div className="w-full mt-8 flex justify-around flex-wrap">
          <div className="capitalize w-5/12 min-w-[500px]">
            <h2 className="text-2xl font-semibold my-4 text-center">
              Ratings Received by the business
            </h2>
            <div className="">
              <BarChart
                width={580}
                height={320}
                data={reviewStats?.ratingStats}
                margin={{
                  top: 20,
                  right: 30,
                  left: -40,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis domain={[0]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#25344d" />
              </BarChart>
            </div>
          </div>
          <div className="capitalize w-5/12 min-w-[500px]">
            <h2 className="text-2xl font-semibold mt-4 text-center ">
              Ratings Received by the business
            </h2>

            <div className="z-50 -mt-14">
              <PieChart width={500} height={400}>
                <Pie
                  dataKey="value"
                  data={data}
                  cx={200}
                  cy={200}
                  outerRadius={120}
                  fill="#8884d8"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {data.map((entry, index) => (
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
      <Modal open={open} onClose={handleClose}>
        <div className="absolute top-1/2 left-1/2 min-w-[350px] w-[50%] bg-slate-100 -translate-x-1/2 -translate-y-1/2   rounded sm:py-8 sm:px-10 p-4 flex flex-col">
          <AiFillCloseSquare
            className="absolute -top-2 -right-2 m-4 text-4xl text-red-700 cursor-pointer"
            onClick={handleClose}
          />
          <h1 className="text-3xl font-semibold mr-6">
            Request for Verification
          </h1>
          <p className="text-lg mt-2">
            We at Ghar Sewa review you business information within 48 hours of
            your registration. In case you have not been yet verified, it may be
            due to some uncertainty regarding your business information. You can
            directly call us at{" "}
            <a href="tel:98512345678" className="font-semibold">
              98512345678
            </a>{" "}
            or email us at{" "}
            <a href="mailto:asubigyan@gmail.com" className="font-semibold">
              asubigyan@gmail.com
            </a>{" "}
            to request for verification.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default BusinessDashboard;
