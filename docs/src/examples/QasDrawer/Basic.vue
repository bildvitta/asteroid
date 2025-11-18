<template>
  <div class="container q-py-lg">
    <div class="justify-between row">
      <qas-btn @click="toggle('left')">Abrir drawer na esquerda</qas-btn>
      <qas-btn @click="toggle('right')">Abrir drawer na direita</qas-btn>
    </div>

    <qas-drawer v-model="isDrawerOpened" v-bind="drawerProps">
      <qas-list-items class="full-width" :list="list" redirect-key="uuid">
        <template #item-section="{ item }">
          <div>
            name: {{ item.name }}
          </div>
        </template>
      </qas-list-items>
    </qas-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDrawerOpened: false,
      position: 'left'
    }
  },

  computed: {
    drawerProps () {
      return {
        title: 'Título de exemplo',
        position: this.position
      }
    },

    list () {
      return [
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
    }
  },

  methods: {
    toggle (position) {
      this.position = position
      this.isDrawerOpened = !this.isDrawerOpened
    }
  }
}
</script>
