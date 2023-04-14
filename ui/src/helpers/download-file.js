/**
  * Faz o download de um arquivo a partir de uma URL com um nome de arquivo especificado.
  * @param {Object} options As opções de download.
  * @param {string} options.url A URL do arquivo a ser baixado.
  * @param {string} options.fileName O nome do arquivo a ser salvo no disco local.
  * @returns {void}
*/
export default ({ url, name }) => {
  const link = document.createElement('a')

  link.download = name
  link.href = url
  link.style.display = 'none'

  link.setAttribute('target', '_blank')
  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)
}
