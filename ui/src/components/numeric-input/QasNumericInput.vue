<template>
  <q-field v-model="model">
    <template #control="{ emitValue, floatingLabel, id, value }">
      <input v-show="floatingLabel" ref="input" class="q-field__input" :id="id" :model-value="value" @input="event => emitValue(event.target.value)">
    </template>
  </q-field>
</template>

<script>
export default {
  props: {
    value: {
      validator (value) {
        return typeof value === 'number' || typeof value === 'string' || value === '' || value === null
      }
    }
  },

  data () {
    return {
      autoNumeric: null
    }
  },

  computed: {
    model: {
      get () {
        return this.value
      },

      set (value) {
        value = this.autoNumeric.getNumber()
        this.$emit('input', value)
      }
    }
  },

  async created () {
    const AutoNumeric = (await import('autoNumeric')).default

    this.$nextTick(() => {
      this.$refs.input.value = this.value
      this.autoNumeric = new AutoNumeric(this.$refs.input).brazilian()
    })
  }
}
</script>
