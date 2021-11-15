const CalcBasicSkillPercent = (numerator, denominator) => {
  const division = (numerator / denominator) * 100;
  const result = Math.round(division);
  return result;
};
export default CalcBasicSkillPercent;
