function Welcome({ setRole }) {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center px-4">

      {/* CENTERED HEADER */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 animate-bounce">
        🎓 Welcome to Smart Result Viewer
      </h1>

      <p className="mb-6 text-sm md:text-base">
        View and manage university results easily
      </p>

      <div className="flex flex-col sm:flex-row gap-3">

        <button
          onClick={() => setRole("lecturer")}
          className="bg-white text-blue-600 px-6 py-2 rounded hover:scale-105 transition w-full sm:w-auto"
        >
          Login as Lecturer
        </button>

        <button
          onClick={() => setRole("student")}
          className="bg-white text-green-600 px-6 py-2 rounded hover:scale-105 transition w-full sm:w-auto"
        >
          Login as Student
        </button>

      </div>

    </div>
  );
}

export default Welcome;
