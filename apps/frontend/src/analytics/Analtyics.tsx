import { useData } from "@repo/zustand/store";
import { Navbar } from "../body/Navbar/Navbar";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const Analytics = () => {
  const { analytics } = useData();

  if (!analytics || Object.keys(analytics).length === 0) {
    return (
      <div>
        <Navbar />
        <h1 className="text-center mt-10 text-xl font-semibold">
          No analytics data available.
        </h1>
      </div>
    );
  }

  const charts = Object.entries(analytics).map(([title, dataMap]) => ({
    title,
    data: Object.entries(dataMap).map(([name, value]) => ({
      name,
      value: parseFloat(String(value)),
    })),
  }));

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold text-center my-6">Alumni Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        {charts.map(({ title, data }) => (
          <div key={title} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-center mb-4 capitalize">
              {title.replace(/Percentage$/, "")} Stats
            </h2>

            <PieChart width={350} height={300}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
