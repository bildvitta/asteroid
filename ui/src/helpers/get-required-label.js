export default function getRequiredLabel ({ label, required }) {
  return required ? `${label}*` : label
}
