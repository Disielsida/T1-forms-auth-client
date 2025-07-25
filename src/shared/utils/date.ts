export const formatDateToInput = (date: Date | null): string => {
  if (!date) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const parseInputToDate = (input: string): Date | null => {
  const [day, month, year] = input.split('.');
  if (!day || !month || !year) return null;
  return new Date(Number(year), Number(month) - 1, Number(day));
};
