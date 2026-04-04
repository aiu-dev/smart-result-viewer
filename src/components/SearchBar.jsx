function SearchBar({ search, setSearch, semester, setSemester }) {
  return (
    <div> {/* ✅ wrapper */}

      <input
        type="text"
        placeholder="Search by name or matric..."
        className="border p-2 w-full mt-4 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border p-2 mt-3 w-full rounded"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      >
        <option value="">All Semesters</option>
        <option value="100L">100L</option>
        <option value="200L">200L</option>
      </select>

    </div>
  );
}

export default SearchBar;
