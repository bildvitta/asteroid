<template>
  <div class="container q-py-lg">
    <qas-list-items :list="list" redirect-key="uuid" @click-item="onClickItem">
      <template #item-section-left="{ item, index }">
        <div>
          name: {{ item.name }}
          index: {{ index }}
        </div>
      </template>
    </qas-list-items>
  </div>
</template>

<script>
export default {
  computed: {
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
        }
      ]
    }
  },

  methods: {
    // Aqui neste método você define o que quer fazer após o usuário clicar no item
    onClickItem ({ item, index }) {
      alert(JSON.stringify(item))
    }
  }
}
</script>
