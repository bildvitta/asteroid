<template>
  <code class="doc-token"><slot>{{ decodedToken }}</slot></code>
</template>

<script>
export default {
  props: {
    token: {
      default: '',
      type: String
    }
  },

  computed: {
    decodedToken () {
      // Aqui está dando problema para fazer decodeURI quando eu passo algum valor com porcentagem.
      // Por exemplo, se no arquivo .md eu passo dentro de um "`25%`"
      // o decodeURI não funciona, para resolver isto, achei a seguinte solução no stackoverflow:
      // https://stackoverflow.com/questions/9064536/javascript-decodeuricomponent-malformed-uri-exception
      const content = this.token.toString().replace(/%/g, '~~pct~~')
      return decodeURI(content).replace(/~~pct~~/g, '%')
    }
  }
}
</script>

<style lang="scss">
@use 'sass:color';

.doc-token {
  background-color: $grey-4;
  border-radius: $generic-border-radius;
  display: inline-block;
  letter-spacing: -0.03em;
  line-height: 1;
  padding: 2px 4px;
  white-space: nowrap;
}
</style>
