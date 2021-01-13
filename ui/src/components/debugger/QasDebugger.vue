<template>
  <details class="bg-grey-3 q-my-md q-pa-md rounded-borders">
    <summary>Debugger</summary>

    <div class="row">
      <pre v-for="(item, index) in inspect" :key="index" class="col q-pa-sm scroll" style="max-height: 300px;">{{ item }}</pre>
    </div>
  </details>
</template>

<script>
export default {
  props: {
    inspect: {
      default: () => [],
      required: true,
      type: Array
    }
  }
}
</script>
