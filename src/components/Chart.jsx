import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function Chart({ courses }) {

  const data = courses.map(c => ({
    name: c.course,
    score: c.score
  }));

  // Grade distribution
  const gradeCount = { A: 0, B: 0, C: 0, D: 0, F: 0 };

  courses.forEach(c => {
    if (c.score >= 70) gradeCount.A++;
    else if (c.score >= 60) gradeCount.B++;
    else if (c.score >= 50) gradeCount.C++;
    else if (c.score >= 45) gradeCount.D++;
    else gradeCount.F++;
  });

  const pieData = Object.keys(gradeCount).map(key => ({
    name: key,
    value: gradeCount[key]
  }));

  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="mt-6 space-y-6">

      {/* ===== BAR CHART CARD ===== */}
      <div className="bg-white rounded-xl shadow p-4">

        <h3 className="text-lg font-semibold mb-2">
          Course Performance
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          Score distribution across courses
        </p>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={40}>
              
              <XAxis dataKey="name" />
              <YAxis />
              
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                }}
              />

              <Legend />

              <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => {
                  let color = "#22c55e";

                  if (entry.score < 50) color = "#ef4444";
                  else if (entry.score < 70) color = "#f59e0b";

                  return <Cell key={index} fill={color} />;
                })}
              </Bar>

            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ===== PIE CHART CARD ===== */}
      <div className="bg-white rounded-xl shadow p-4">

        <h3 className="text-lg font-semibold mb-2">
          Grade Distribution
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          Overall grade breakdown
        </p>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                innerRadius={40}
                paddingAngle={3}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                }}
              />

              <Legend />

            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

export default Chart;
