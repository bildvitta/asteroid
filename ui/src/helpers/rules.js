function required (value = '', message = 'Campo obrigatório.') {
  return String(value ?? '').length || message
}

export {
  required
}
