<template>
  <!-- Descartar essa div -->
  <div>
    <qas-list-view v-model:fields="fields" v-model:results="results" :entity="entity">
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

      <template #default>
        <div class="bg-positive q-my-lg q-pa-lg">
          Template default
          <div>
            Results: <qas-debugger :inspect="[results]" />
          </div>
          <div>
            Fields: <qas-debugger :inspect="[fields]" />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="bg-positive q-my-lg q-pa-lg">
          template footer
        </div>
      </template>
    </qas-list-view>
  </div>
</template>

<script>
export default {
  name: 'UsersList',

  data () {
    return {
      fields: {},
      errors: {},
      results: [],
      metadata: {}
    }
  },

  computed: {
    entity () {
      return 'users'
    }
  }
}
</script>
