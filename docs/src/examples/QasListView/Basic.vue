<template>
  <qas-list-view class="container spaced" dialog :entity="entity">
    <template #header>
      <div class="bg-positive q-pa-lg">
        Template do header.
      </div>
    </template>

    <template #filter>
      <div class="bg-positive q-my-lg q-pa-lg">
        Template do filter.
      </div>
    </template>

    <template #default="{ results, fields }">
      <div class="">
        Results: <qas-debugger :inspect="[results]" />
      </div>
      <div class="">
        Fields: <qas-debugger :inspect="[fields]" />
      </div>
    </template>
  </qas-list-view>
</template>

<script>

export default {
  name: 'MaterialsList',

  computed: {
    entity () {
      return 'users'
    }
  }
}
</script>
