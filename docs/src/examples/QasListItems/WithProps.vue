<template>
  <div class="container q-py-lg">
    <qas-list-items v-bind="listItemsProps" />
  </div>
</template>

<script setup>
defineOptions({ name: 'WithProps' })

const listItemsProps = {
  list: [
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
  ],

  redirectKey: 'uuid',
  descriptionKey: 'email',
  labelKey: 'name',

  onClickItem: ({ item }) => alert(JSON.stringify(item))
}
</script>
