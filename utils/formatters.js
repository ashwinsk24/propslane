export const formatCurrency = (price) => {
  if (!price) return "Price upon request";
  return new Intl.NumberFormat("en-GB", {
    // Use en-GB for Great Britain Pound
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);
};
