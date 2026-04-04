import { useState, useRef } from "react";
import ResultCard from "../components/ResultCard";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Dashboard({ user }) {

  const [filter, setFilter] = useState("");
  const pdfRef = useRef();

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const exportPDF = async () => {
    const canvas = await html2canvas(pdfRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`${user.fullname}_result.pdf`);
  };

  const data = Array.isArray(user) ? user : [user];

  return (
    <div className="p-4 max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Welcome {user.fullname}</h2>

        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
          Logout
        </button>
      </div>

      {/* FILTER + EXPORT */}
      <div className="flex justify-between mb-4 flex-wrap gap-2">

        <select
          className="border p-2"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="First">First Semester</option>
          <option value="Second">Second Semester</option>
        </select>

        <button
          onClick={exportPDF}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Export PDF
        </button>

      </div>

      {/* PDF CONTENT */}
      <div
  ref={pdfRef}
  className="bg-white p-6 w-[210mm] min-h-[297mm]"
>

        <div className="mb-3">
          <p><strong>Name:</strong> {user.fullname}</p>
          <p><strong>Matric:</strong> {user.matric}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Program:</strong> {user.program}</p>
        </div>

        {data
          .filter((s) => (filter ? s.semester === filter : true))
          .map((s, i) => (
            <ResultCard key={i} student={s} />
          ))}
      </div>

    </div>
  );
}

export default Dashboard;
