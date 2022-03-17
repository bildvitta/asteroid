<template>
  <q-page padding>
    <qas-avatar rounded text-color="positive" title="Caio Tarifa" />

    <qas-box class="bg-yellow">
      Um pequeno passo para o homem, mas um grande passo para os Fronts!
    </qas-box>

    <qas-breakline class="bg-red">{{ breakLineText }}</qas-breakline>

    <qas-copy text="Hello!" />

    <qas-debugger :inspect="['Hello', 'World!']" />

    <qas-btn hide-label-on-small-screen>Mostre-me</qas-btn>

    <qas-select v-model="autoCompleteModel" multiple :options="autoCompleteOptions" />
    <pre>{{ autoCompleteModel }}</pre>

    <qas-numeric-input v-model="number" />
    <pre>{{ number }}</pre>

    <qas-label id="ronaldo" aa="bb" count="-1" label="Teste" @click="abc" />

    <qas-password-strength-checker v-model="strength" password="p!aassword" :use-numbers="false" />
    <pre>{{ strength }}</pre>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      autoCompleteModel: [],
      number: 123,
      strength: true
    }
  },

  computed: {
    apps () {
      return [
        { href: '?', image: 'http://placehold.it/500x300', label: 'App 1' },
        { href: '?', image: 'http://placehold.it/500x300', label: 'App 2' },
        { href: '?', image: 'http://placehold.it/500x300', label: 'App 3' },
        { href: '?', image: 'http://placehold.it/500x300', label: 'App 4' },
        { href: '?', image: 'http://placehold.it/500x300', label: 'App 5' }
      ]
    },

    autoCompleteOptions () {
      return [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' }
      ]
    },

    breakLineText () {
      return `Lorem ipsum dolor sit amet consectetur, adipisicing elit.

      Cum, deleniti aspernatur hic doloremque?
      Vel?`
    }
  },

  methods: {
    abc () {
      console.log('123')
    }
  }
}
</script>
