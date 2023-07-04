function required (value = '', message = 'Campo obrigatório') {
  return !!value || message
}

export {
  required
}
