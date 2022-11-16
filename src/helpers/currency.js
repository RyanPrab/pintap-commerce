export default function currency(amount) {
  if (isNaN(amount) || !amount) return 0;
  return Math.round(parseFloat(amount || 0)).toLocaleString('en-US');
}
