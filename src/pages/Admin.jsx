import { useEffect, useState } from "react";
import { API } from "../services/api";
import { getGrade, calculateGPA } from "../utils/calculateGPA";

function Admin({ user }) {

  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [student, setStudent] = useState({
    fullname: "",
    matric: "",
    department: "",
    program: "",
    level: "",
    semester: "First",
    courses: []
  });

  const [course, setCourse] = useState({
    course: "",
    test: "",
    exam: "",
    unit: ""
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data.filter(s => s.lecturerId === user.id));
  };

  const handleStudentChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // ADD COURSE
  const addCourse = () => {
    if (!course.course || !course.test || !course.exam || !course.unit) {
      return alert("Fill all course fields");
    }

    const total = Number(course.test) + Number(course.exam);
    const { grade, point } = getGrade(total);

    setStudent({
      ...student,
      courses: [...student.courses, { ...course, score: total, grade, point }]
    });

    setCourse({ course: "", test: "", exam: "", unit: "" });
  };

  const removeCourse = (index) => {
    setStudent({
      ...student,
      courses: student.courses.filter((_, i) => i !== index)
    });
  };

  // SAVE / UPDATE
  const saveStudent = async () => {

    if (student.courses.length === 0) {
      return alert("Add at least one course");
    }

    const data = { ...student, lecturerId: user.id };

    if (editingId) {
      await API.put(`/students/${editingId}`, data);
      setEditingId(null);
    } else {
      await API.post("/students", data);
    }

    resetForm();
    fetchStudents();
  };

  const editStudent = (s) => {
    setStudent(s);
    setEditingId(s.id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // UX improvement
  };

  const deleteStudent = async (id) => {
    if (!confirm("Delete this student?")) return;

    await API.delete(`/students/${id}`);
    fetchStudents();
  };

  const resetForm = () => {
    setStudent({
      fullname: "",
      matric: "",
      department: "",
      program: "",
      level: "",
      semester: "First",
      courses: []
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="p-3 md:p-5 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
        <h2 className="text-xl font-bold">Lecturer Dashboard</h2>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Logout
        </button>
      </div>

      {/* FORM */}
      <div className="bg-white p-3 md:p-5 rounded shadow mb-6">

        {/* GRID FIXED FOR MOBILE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

          <input name="fullname" value={student.fullname} onChange={handleStudentChange} placeholder="Full Name" className="border p-2 rounded" />
          <input name="matric" value={student.matric} onChange={handleStudentChange} placeholder="Matric Number" className="border p-2 rounded" />

          <input name="department" value={student.department} onChange={handleStudentChange} placeholder="Department" className="border p-2 rounded" />
          <input name="program" value={student.program} onChange={handleStudentChange} placeholder="Program" className="border p-2 rounded" />

          <input name="level" value={student.level} onChange={handleStudentChange} placeholder="Level (100,200...)" className="border p-2 rounded" />

          <select name="semester" value={student.semester} onChange={handleStudentChange} className="border p-2 rounded">
            <option>First</option>
            <option>Second</option>
          </select>

        </div>

        {/* COURSE SECTION */}
        <div className="mt-4 border p-3 rounded">

          <h4 className="font-semibold mb-2">Add Courses</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            <input name="course" value={course.course} onChange={handleCourseChange} placeholder="Course" className="border p-2 rounded" />
            <input name="test" value={course.test} onChange={handleCourseChange} placeholder="Test" className="border p-2 rounded" />
            <input name="exam" value={course.exam} onChange={handleCourseChange} placeholder="Exam" className="border p-2 rounded" />
            <input name="unit" value={course.unit} onChange={handleCourseChange} placeholder="Unit" className="border p-2 rounded" />
          </div>

          <button
            onClick={addCourse}
            className="bg-blue-600 text-white px-4 py-2 mt-2 rounded w-full sm:w-auto"
          >
            Add Course
          </button>

          {/* COURSE LIST */}
          <div className="mt-3">
            {student.courses.map((c, i) => (
              <div key={i} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1 text-sm">
                <span>{c.course} ({c.score})</span>
                <button onClick={() => removeCourse(i)} className="text-red-500 font-bold">X</button>
              </div>
            ))}
          </div>

        </div>

        {/* BUTTON FIX */}
        <button
          onClick={saveStudent}
          className="bg-green-600 text-white w-full mt-4 py-3 rounded text-lg"
        >
          {editingId ? "Update Student" : "Add Student"}
        </button>

      </div>

      {/* TABLE */}
     <div className="bg-white p-4 rounded shadow overflow-x-auto">

  <h3 className="font-semibold mb-3">Students Records</h3>

  <table className="w-full text-sm border min-w-[900px]">
    <thead className="bg-gray-200">
      <tr>
        <th>Name</th>
        <th>Matric</th>
        <th>Course</th>
        <th>Test</th>
        <th>Exam</th>
        <th>Total</th>
        <th>Unit</th>
        <th>Grade</th>
        <th>GPA</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {students.map((s) =>
        s.courses.map((c, i) => (
          <tr key={i} className="border text-center">

            <td>{s.fullname}</td>
            <td>{s.matric}</td>

            <td>{c.course}</td>
            <td>{c.test}</td>
            <td>{c.exam}</td>
            <td>{c.score}</td>
            <td>{c.unit}</td>
            <td className="font-semibold">{c.grade}</td>

            {/* GPA PER STUDENT */}
            <td>{calculateGPA(s.courses)}</td>

            <td className="space-x-2">
              <button
                onClick={() => editStudent(s)}
                className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
              >
                Edit
              </button>

              <button
                onClick={() => deleteStudent(s.id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-xs"
              >
                Delete
              </button>
            </td>

          </tr>
        ))
      )}
    </tbody>

  </table>
</div>
      
    </div>
  );
}

export default Admin;
