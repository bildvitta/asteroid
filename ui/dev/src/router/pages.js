function kebabCase (string) {
  const result = string.replace(
    /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g,
    match => '-' + match.toLowerCase()
  )

  return (string[0] === string[0].toUpperCase()) ? result.substring(1) : result
}

function slugify (string) {
  return encodeURIComponent(String(string).trim().replace(/\s+/g, '-'))
}

export default require.context('../pages', true, /^\.\/.*\.vue$/)
  .keys()
  .map(page => page.slice(2).replace('.vue', ''))
  .filter(page => page !== 'Index')
  .map(page => ({
    file: page,
    title: page + '.vue',
    path: slugify(kebabCase(page))
  }))
