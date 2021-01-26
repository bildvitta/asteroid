export default function (quantity, label) {
  return quantity ? `${label} (${quantity})` : label
}
