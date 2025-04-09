export const formatCpf = (value: string): string => {
  // Remove any non-digit characters and limit to 11 digits
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    // When there are 4-6 digits, add a dot after the first three digits
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  } else if (digits.length <= 9) {
    // When there are 7-9 digits, add a dot between the 3rd and 4th, and between the 6th and 7th digits
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  } else {
    // When there are 10 or more digits, add a dash after the 9th digit
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(
      6,
      9
    )}-${digits.slice(9)}`;
  }
};
