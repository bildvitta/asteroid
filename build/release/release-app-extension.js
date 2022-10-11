function releaseAppExtension ({ execaSync, ora, nextVersion, publishCommands, packages }) {
  const installNextUi = require('./install-next-ui')

  const { error } = installNextUi({ execaSync, ora, nextVersion, packages })

  if (error) return { success: false, error: true }

  const publishAppExtensionSpinner = ora('Publicando "app-extension"...')

  try {
    // publica a nova versão do "app-extension"
    execaSync('npm', publishCommands, { cwd: packages['app-extension'].resolved })
    publishAppExtensionSpinner.succeed('"app-extension" publicada com sucesso')

    return { success: true, error: false }
  } catch {
    publishAppExtensionSpinner.fail('Falha ao publicar "app-extension"')
    return { success: false, error: true }
  }
}

module.exports = releaseAppExtension
