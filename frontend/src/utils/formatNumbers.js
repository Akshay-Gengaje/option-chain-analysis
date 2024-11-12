export function formatNumber(num) {
  // Check if the number is valid
  if (isNaN(num)) {
    return "Invalid Number";
  }

  // Convert the number to string
  num = num.toString();

  // Regular expression to match the correct place for commas
  const regex = /\B(?=(\d{3})+(?!\d))/g;

  // Format the number using the regex
  return num.replace(regex, ",");
}
