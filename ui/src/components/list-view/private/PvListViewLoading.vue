<template>
  <q-inner-loading :showing="model">
    <q-spinner color="gray" size="3em" />

    <transition>
      <div v-if="showWaitingMessage" class="flex items-end text-center">
        <h4 class="q-mr-xs text-h4">
          Aguarde, isto pode levar alguns segundos <q-spinner-dots color="gray-10" />
        </h4>
      </div>
    </transition>
  </q-inner-loading>
</template>

<script setup>
import { watch, ref } from 'vue'
import { NotifySuccess } from '../../../plugins'

defineOptions({ name: 'PvListViewLoading' })

const model = defineModel({ type: Boolean })

const showWaitingMessage = ref(false)
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

    NotifySuccess('Aguarde, isto pode levar alguns segundos...')

    clearInterval(loadingListener.value)
  }
}

</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
