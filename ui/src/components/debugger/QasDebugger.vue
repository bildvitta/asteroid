<template>
  <details class="bg-grey-3 q-my-md q-pa-md rounded-borders">
    <summary>Debugger</summary>

    <div class="row">
      <pre v-for="(item, index) in inspect" :key="index" v-test:debugger-item class="col q-pa-sm scroll" style="max-height: 300px;">{{ item }}</pre>
    </div>
  </details>
</template>

<script>
// TODO ver uma forma de adicionar globalmente as diretivas
import test from '../../directives/Test'

export default {
  directives: {
    test
  },

  props: {
    inspect: {
      default: () => [],
      required: true,
      type: Array
    }
  }
}
</script>
