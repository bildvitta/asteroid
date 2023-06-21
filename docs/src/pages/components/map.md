---
title: QasMap
---

Componente para utilizar mapa do Google.

:::info
##### Instalação

Este componente necessita da biblioteca `'@fawmi/vue-google-maps': '^0.9.79'` instalada no projeto, caso não tenha, a primeira vez que rodar `quasar dev`, ele tentará instalar automaticamente, caso não funcione, instale manualmente.

###### Configuração

```js
// package.json (caso não adicione automaticamente ao rodar "quasar dev")
{
  "dependencies": {
    "@fawmi/vue-google-maps": "^0.9.79"
  }
}

// asteroid.config.js
{
  framework: {
    thirdPartyComponents: ['QasMap']
  }
}

// quasar.config.js
{
  build: {
    env: {
      MAPS_API_KEY: 'SUA_API_KEY_DO_GOOGLE'
    }
  }
}
```
:::

<doc-api file="map/QasMap" name="QasMap" />

## Uso

<doc-example file="QasMap/Basic" title="Básico" />
