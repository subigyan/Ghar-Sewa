import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const Chart = ({ pieData }) => {
  const COLORS = ["#FFB72B", "#4D96FF"];

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
    <div>
      <PieChart width={400} height={400} className="bg-purple-500">
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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

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
  );
};

export default Chart;
