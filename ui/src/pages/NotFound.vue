<template>
  <div class="fixed-center text-center">
    <p class="q-my-lg text-faded">Ops, nada aqui... <strong>(404)</strong></p>
    <q-btn color="primary" flat @click="backLink()">Voltar</q-btn>
  </div>
</template>

<script>
import { history } from '../helpers/historyHandler'

export default {
  methods: {
    backLink () {
      if (!history.hasPreviousRoute){
        this.$router.push('/')
        return
      } 
      
      history.list.splice(history.list.length -2, 2)
      const redirect = history.list.pop()
      this.$router.push(redirect.fullPath)
    }
  }
}
</script>