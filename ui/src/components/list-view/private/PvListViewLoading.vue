<template>
  <q-inner-loading :showing="true">
    <q-spinner color="gray" size="3em" />

    <transition>
      <div v-if="showWaitingMessage" class="flex items-end text-center">
        <h6 class="q-mr-xs text-h6">
          Aguarde, isto pode levar alguns segundos...
        </h6>
      </div>
    </transition>
  </q-inner-loading>
</template>

<script setup>
import { watch, ref } from 'vue'

defineOptions({ name: 'PvListViewLoading' })

const model = defineModel({ type: Boolean })

const showWaitingMessage = ref(true)
const loadingListener = ref(null)

watch(() => model.value, value => {
  console.log('TCL: value', value)
  if (value) {
    loadingListener.value = setInterval(startTrigger, 3000)

    return
  }

  if (loadingListener.value) {
    clearInterval(loadingListener.value)
    showWaitingMessage.value = false
  }
})

function startTrigger () {
  if (model.value) {
    showWaitingMessage.value = true

    clearInterval(loadingListener.value)
  }
}

</script>

<style>
.q-inner-loading {
  background-color: rgba(255, 255, 255, 0.8);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
