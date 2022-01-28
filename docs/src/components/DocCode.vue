<template>
  <div class="doc-code">
    <pre class="doc-code__inner"><code class="doc-code__code" :class="codeClass" v-html="highlightedCode" /></pre>

    <div class="doc-code__copy-button">
      <doc-copy-button :text="decodedCode" />
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js/lib/common'

export default {
  props: {
    code: {
      type: String,
      required: true
    },

    language: {
      default: 'auto',
      type: String
    }
  },

  computed: {
    codeClass () {
      return `language-${this.language}`
    },

    decodedCode () {
      return decodeURI(this.code)
    },

    highlightedCode () {
      if (!this.language || this.language === 'auto') {
        return hljs.highlightAuto(this.decodedCode).value
      }

      return hljs.highlight(this.decodedCode, { language: this.language }).value
    }
  }
}
</script>

<style lang="scss">
@import 'highlight.js/styles/github.css';

.doc-code {
  background-color: $grey-2;
  border-radius: $generic-border-radius;
  margin-bottom: 16px;
  position: relative;

  &__inner,
  &__code {
    color: $grey-9;
    font-size: 12px;
    margin: 0;
  }

  &__code {
    display: block;
    overflow: auto;
    padding: 1em;
  }

  &__copy-button {
    position: absolute;
    right: 8px;
    top: 8px;
  }
}
</style>
