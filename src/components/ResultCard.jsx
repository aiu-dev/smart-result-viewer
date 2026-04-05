import {
  calculateGPA,
  getGrade,
  totalUnits,
  totalQualityPoints
} from "../utils/calculateGPA";

import Chart from "./Chart"
;
function ResultCard({ student }) {

  const courses = student.courses || [];

  return (
    <div className="bg-white p-6 rounded shadow mb-6">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-center mb-4">
        {student.semester} Semester Result ({student.level} Level)
      </h2>

      {/* TABLE */}
      <table className="w-full border text-base text-center border-collapse">

        <thead className="bg-gray-200 text-lg">
          <tr>
            <th className="border p-2">Course</th>
            <th className="border p-2">Test</th>
            <th className="border p-2">Exam</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Unit</th>
            <th className="border p-2">Grade</th>
            <th className="border p-2">Point</th>
            <th className="border p-2">QP (U×P)</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((c, i) => {
            const { grade, point } = getGrade(c.score);
            const qp = point * Number(c.unit);

            return (
              <tr key={i} className="border">
                <td className="border p-2">{c.course}</td>
                <td className="border p-2">{c.test}</td>
                <td className="border p-2">{c.exam}</td>
                <td className="border p-2 font-semibold">{c.score}</td>
                <td className="border p-2">{c.unit}</td>
                <td className="border p-2 font-bold">{grade}</td>
                <td className="border p-2">{point}</td>
                <td className="border p-2">{qp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* SUMMARY */}
      <div className="mt-6 text-base space-y-1">

        <p className="flex justify-between">
          <span>Total Units:</span>
          <span>{totalUnits(courses)}</span>
        </p>

        <p className="flex justify-between">
          <span>Total Quality Points:</span>
          <span>{totalQualityPoints(courses)}</span>
        </p>

        <p className="flex justify-between font-bold text-lg">
          <span>GPA:</span>
          <span>{calculateGPA(courses)}</span>
        </p>

      </div>
        <Chart courses={courses} />
    </div>
  );
}

export default ResultCard;
