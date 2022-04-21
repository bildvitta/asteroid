<template>
  <q-page class="container q-py-lg">
    <div class="q-col-gutter-md q-pa-md row">
      <qas-card :images="images" use-header>
        <div>
          <div>{{ result.name }}</div>
          <div>{{ result.email }}</div>
        </div>

        <template #actions>
          <q-icon class="col-grow" color="primary" name="o_edit" />
          <q-icon class="col-grow" color="primary" name="o_delete" />
          <q-icon class="col-grow" color="primary" name="o_photo_camera" />
        </template>
      </qas-card>

      <qas-card :images="images" use-header>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </qas-card>

      Form mode:
      <qas-card :images="images" outlined use-header>
        <template #default>
          <div>{{ result.name }}</div>
          <div>{{ result.email }}</div>
        </template>
        <template #actions>
          <div class="full-width">
            <div class="text-blue text-bold text-center">Ver mais</div>
          </div>
        </template>
      </qas-card>
    </div>
  </q-page>
</template>

<script>
export default {
  computed: {
    images () {
      return [
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg'
      ]
    },

    result () {
      return {
        name: 'John Appleseed',
        email: 'john.appleseed@example.com',
        phone: '99999999999',
        gender: 'Male',
        document: '99999999999',
        address: '747 Austen View'
      }
    }
  },

  methods: {
    onEmptyResult () {
      alert('Empty results')
    }
  }
}
</script>
