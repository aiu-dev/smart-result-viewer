🎓 Smart Result Viewer

📌 Project Overview

Smart Result Viewer is a full-featured university result management system built with React, Axios, JSON Server, and Tailwind CSS.

It allows lecturers to manage student academic records and enables students to securely view and export their results in a professional format.

This system simulates a real-world university result processing workflow, including course registration, grading, GPA calculation, and result export.

Live Application: [View App]( https://smart-result-viewer.vercel.app )

Project Presentation: [Download PDF](https://smart-result-viewer.vercel.app/presentation.pdf )


🚀 Features

👨‍🏫 Lecturer (Admin)

- Register and login
- Add new students
- Add multiple courses (7–12 courses supported)
- Record test and exam scores
- Automatic grade & GPA calculation
- Edit student records
- Delete student records
- View all students and their results in a structured table

🎓 Student

- Login using Full Name + Matric Number
- View personal results only
- See:
  - Courses
  - Test & Exam scores
  - Grades
  - Units
  - Quality Points
  - GPA
- Filter results by:
  - First Semester
  - Second Semester
- Export result as PDF (A4 format)

---

🛠️ Tech Stack

- Frontend: React (Vite)
- Styling: Tailwind CSS
- API Requests: Axios
- Backend (Mock): JSON Server
- PDF Export: jsPDF + html2canvas

---

📂 Project Structure

src/
│── components/
│   └── ResultCard.jsx
│
│── pages/
│   ├── Admin.jsx
│   ├── Dashboard.jsx
│   └── Welcome.jsx
│
│── services/
│   └── api.js
│
│── utils/
│   └── calculateGPA.js
│
└── App.jsx

---

## 📸 Screenshots

[View Screenshots](https://github.com/aiu-dev/smart-result-viewer/tree/main/screenshot)

⚙️ Installation & Setup

1. Clone the Project

 clone
https:// github.com/aiu-dev/smart-result-viewer.git

cd smart-result-viewer

---

2. Install Dependencies

npm install

---

3. Install Required Packages

npm install axios json-server tailwindcss jspdf html2canvas

---

4. Setup JSON Server

Create a file:

db.json

Example:

{
  "students": [],
  "users": []
}

---

5. Add Script in "package.json"

"scripts": {
  "server": "json-server --watch db.json --port 5000",
  "dev": "vite"
}

---

6. Run the Project

Start backend:

npm run server

Start frontend:

npm run dev

---

🧑‍💻 How to Use the Website (Step-by-Step)

---

🟢 Step 1: Open the App

- Visit: "http://localhost:5173"
- You will see the Welcome Page

---

🟢 Step 2: Choose User Type

- Click:
  - Login as Lecturer OR
  - Login as Student

---

👨‍🏫 Lecturer Flow

🟢 Step 3: Register / Login

- Enter email and password
- Login to dashboard

---

🟢 Step 4: Add Student

Fill the form:

- Full Name
- Matric Number
- Department
- Program
- Level
- Semester (First / Second)

---

🟢 Step 5: Add Courses

For each course:

- Course Name
- Test Score
- Exam Score
- Unit

Click Add Course

👉 Repeat for multiple courses (7–12 courses)

---

🟢 Step 6: Save Student

- Click Add Student
- Student appears in table

---

🟢 Step 7: Manage Records

- Edit student → updates data
- Delete student → removes record

---

🎓 Student Flow

🟢 Step 8: Login

Enter:

- Full Name
- Matric Number

👉 Must match lecturer’s record

---

🟢 Step 9: View Result

Student can see:

- All courses
- Scores
- Grades
- Units
- GPA

---

🟢 Step 10: Filter Result

Use dropdown:

- First Semester
- Second Semester

---

🟢 Step 11: Export Result

Click:

Export PDF

👉 Downloads:

- A4 formatted result sheet

---

🧮 GPA Calculation Formula

GPA = Total Quality Points / Total Units

Where:

- Quality Point = Grade Point × Unit

---

🎨 UI Features

- Fully responsive design
- Mobile-friendly forms
- Clean table layout
- A4 optimized PDF export
- Smooth animations

---

📌 Future Improvements

- CGPA across semesters
- Authentication with real backend
- Role-based dashboard routing
- Transcript generation
- Cloud database integration

---

🏆 Conclusion

This project demonstrates:

- Real-world academic system design
- Advanced React architecture
- State management
- API handling
- UI/UX best practices

---

👤 Author

Abubakar Ibrahim
Project: Smart Result Viewer
Purpose: Internship Final Project

---

📄 License

This project is for educational and internship purposes.

---

🔥 Built with passion and precision
