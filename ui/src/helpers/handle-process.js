/**
 * @param {function} processEnv função que retorna o process.env.
 * @param {string} defaultValue valor default caso não exista a process.env
 *
 * @example handleProcess(() => process.env.MY_ENV, 'meu-valor-default')
 */
export default (processEnv = () => {}, defaultValue) => {
  try {
    return processEnv() || defaultValue
  } catch {
    return defaultValue
  }
}
