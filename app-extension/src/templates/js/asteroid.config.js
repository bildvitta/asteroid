module.exports = {
  /**
   * Configurações de API
   * @type {{ serverTimeout: number }}
  */
  api: {},

  /**
   * O asteroid ao identificar que a aplicação tenha dependências terceiras e
   * não estão declarados na opção "thirdPartyComponents" ele remove as dependências da aplicação (package.json), caso precise dessas dependências mesmo que sem os thirdPartyComponents, desative esta opção setando como "false".
   * @type {boolean}
  */
  autoRemoveThirdDependencies: true,

  /**
   * Configurações externas para os componentes.
   *
   * @type {{ QasMap: { key: string } }}
  */
  components: {},

  fonts: {
    observer: {
      /**
       * O asteroid adiciona um observer nas fontes, enquanto ela não carrega adiciona um loading para
       * não quebrar o layout, a configuração "waitForUserAuthenticate: true" define que o observer deve esperar
       * o usuário estar autenticado para começar a observar as fontes, para isto a aplicação deve poder receber um
       * "postMessage" com um evento type "requestUser" e responder com um evento type "responseUser".
       *
       * @type {boolean}
       * @example
       * // solicita o usuário
       * window.postMessage({ type: 'requestUser' })
       *
       * window.addEventListener('message', ({ data }) => data.type // responseUser })
       */
      waitForUserAuthenticate: true
    }
  },

  /**
   * Componentes que necessitam de instalação de bibliotecas de terceiros
   * dentro da aplicação que utiliza o asteroid, a instalação é feita automaticamente pelo asteroid.
   * @type {Array<'QasChartView' | 'QasMap'>}
  */
  thirdPartyComponents: []
}
