export default function (type, defaultPlaceholder = 'Digite aqui...') {
  switch (type) {
    case 'company-document':
      return '00.000.000/0000-00'
    case 'date':
      return 'dd/mm/aaaa'
    case 'datetime':
      return 'dd/mm/aaaa hh:mm'
    case 'decimal':
      return '0,00'
    case 'email':
      return 'seuemail@exemplo.com'
    case 'integer':
      return '0'
    case 'money':
      return 'R$ 0,00'
    case 'percent':
      return '0,00%'
    case 'personal-document':
      return '000.000.000-00'
    case 'phone':
      return '(00) 00000-0000'
    case 'postal-code':
      return '00000-000'
    case 'square-area':
      return '0,00 m²'
    case 'time':
      return 'hh:mm'
    default:
      return defaultPlaceholder
  }
}
