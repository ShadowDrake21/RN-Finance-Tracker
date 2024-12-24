export const compareDashboardDates = (
  selectedMonthId: string,
  comparedDate: string
): boolean => {
  const [monthStr, yearStr] = selectedMonthId.split('-');
  const selectedMonth = parseInt(monthStr, 10);
  const selectedYear = parseInt(yearStr, 10);
  const [comparedYear, comparedMonth] = comparedDate.split('-').map(Number);

  return selectedYear === comparedYear && selectedMonth === comparedMonth - 1;
};
