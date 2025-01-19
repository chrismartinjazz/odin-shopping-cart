export default function convertToCurrency(input, currency) {
  const AUDollar = new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency,
  });
  try {
    return AUDollar.format(input);
  } catch (error) {
    throw new Error(`Error displaying product price: ${error.message}`);
  }
}
