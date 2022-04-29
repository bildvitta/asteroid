module.exports = function (api) {
  api.onExitLog(`
             _               _    _
     __ _ __| |_ ___ _ _ ___(_)__| |
    / _\` (_-<  _/ -_) '_/ _ \\ / _\` |
    \\__,_/__/\\__\\___|_| \\___/_\\__,_|
    ~+    INSTALAÇÃO CONCLUÍDA    +~
  `)

  // adicionar arquivo de configuração de variareis sass ao projeto.
  api.renderFile(
    // caminho do arquivo importado
    './templates/css/quasar.variables.scss',
    // caminho do arquivo que será criado no projeto
    'src/css/quasar.variables.scss'
  )
}
