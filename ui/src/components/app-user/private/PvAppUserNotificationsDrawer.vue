<template>
  <qas-drawer v-bind="drawerProps" v-model="model">
    <qas-list-items class="full-width" :list="notificationsMock" redirect-key="uuid">
      <template #item-section="{ item }">
        <div>
          name: {{ item.name }}
        </div>
      </template>
    </qas-list-items>
  </qas-drawer>
</template>

<script setup>
import QasDrawer from '../../drawer/QasDrawer.vue'

import { computed } from 'vue'

defineOptions({ name: 'PvAppUserNotificationsDrawer' })

const props = defineProps({
  model: {
    type: Boolean
  }
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get () {
    return props.model
  },

  set (value) {
    emit('update:modelValue', value)
  }
})

const drawerProps = {
  maxWidth: '60%'
}

const notificationsMock = [
  {
    name: 'item 1',
    email: 'email1@example.com',
    uuid: 'uuid1'
  },
  {
    name: 'item 2',
    email: 'email2@example.com',
    uuid: 'uuid2'
  },
  {
    name: 'item 3',
    email: 'email3@example.com',
    uuid: 'uuid3'
  },
  {
    name: 'item 4',
    email: 'email4@example.com',
    uuid: 'uuid4'
  },
  {
    name: 'item 5',
    email: 'email5@example.com',
    uuid: 'uuid5'
  },
  {
    name: 'item 6',
    email: 'email6@example.com',
    uuid: 'uuid6'
  },
  {
    name: 'item 7',
    email: 'email7@example.com',
    uuid: 'uuid7'
  },
  {
    name: 'item 8',
    email: 'email8@example.com',
    uuid: 'uuid8'
  },
  {
    name: 'item 9',
    email: 'email9@example.com',
    uuid: 'uuid9'
  },
  {
    name: 'item 10',
    email: 'email10@example.com',
    uuid: 'uuid10'
  }
]
</script>
