export const getGrade = (score) => {
  if (score >= 70) return { grade: "A", point: 5 };
  if (score >= 60) return { grade: "B", point: 4 };
  if (score >= 50) return { grade: "C", point: 3 };
  if (score >= 45) return { grade: "D", point: 2 };
  if (score >= 40) return { grade: "E", point: 1 };
  return { grade: "F", point: 0 };
};

export const calculateGPA = (courses) => {
  let totalPoints = 0;
  let totalUnits = 0;

  courses.forEach((c) => {
    const { point } = getGrade(c.score);
    totalPoints += point * Number(c.unit);
    totalUnits += Number(c.unit);
  });

  return totalUnits ? (totalPoints / totalUnits).toFixed(2) : "0.00";
};

export const totalUnits = (courses) =>
  courses.reduce((sum, c) => sum + Number(c.unit), 0);

export const totalQualityPoints = (courses) =>
  courses.reduce((sum, c) => {
    const { point } = getGrade(c.score);
    return sum + point * Number(c.unit);
  }, 0);
