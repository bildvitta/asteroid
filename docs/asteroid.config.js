module.exports = {
  /**
   * Configurações de API
   * @type {{ serverTimeout: number }}
  */
  api: {},

  /**
   * Configurações externas para os componentes
   *
   * @type {{ QasMaps: { key: string } }}
  */
  components: {},

  fonts: {
    observer: {
      /**
       * O asteroid adiciona um observer nas fontes, enquanto ela não carrega adiciona um loading para
       * não quebrar o layout, a configuração "waitForUserAuthenticate: true" define que o observer deve esperar
       * o usuário estar autenticado para começar a observar as fontes, para isto a aplicação deve poder receber um
       * "postMessage" com um evento type "requestUser" e responder com um evento type "responseUser"
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
   * @type {Array<'QasChartView' | 'QasMaps'>}
  */
  thirdPartyComponents: []
}
