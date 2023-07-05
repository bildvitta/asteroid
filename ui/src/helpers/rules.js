function required (value = '', message = 'Campo obrigatório') {
  return String(value ?? '') || message
}

export {
  required
}
