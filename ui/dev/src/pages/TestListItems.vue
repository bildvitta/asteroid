<template>
  <q-page class="container">
    <qas-list-items :list="list" redirect-key="uuid">
      <template #item-section-left="{ item, index }">
        <div>
          name: {{ item.name }}
          index: {{ index }}
        </div>
      </template>
    </qas-list-items>

    Sem actions section
    <qas-list-items :list="list" :use-section-actions="false">
      <template #item-section-left="{ item, index }">
        <div>
          name: {{ item.name }}
          index: {{ index }}
        </div>
      </template>
    </qas-list-items>
  </q-page>
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
  }
}
</script>
