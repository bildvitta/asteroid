<template>
  <div class="container spaced">
    <div class="q-col-gutter-md row">
      <qas-card :images="images" use-header>
        <template #default>
          <div>
            Meu conteúdo
          </div>
        </template>
      </qas-card>
      <qas-card :images="images" use-header>
        <template #default>
          <div>
            Meu conteúdo
          </div>
        </template>
      </qas-card>
      <qas-card :images="images" use-header>
        <template #default>
          <div>
            Meu conteúdo
          </div>
        </template>
      </qas-card>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    images () {
      return [
        'https://via.placeholder.com/200x300/ff0000/969696',
        'https://via.placeholder.com/200x300/09ff00/969696',
        'https://via.placeholder.com/200x300/0044ff/969696',
        'https://via.placeholder.com/200x300/ff0000/969696',
        'https://via.placeholder.com/200x300/09ff00/969696',
        'https://via.placeholder.com/200x300/0044ff/969696',
        'https://via.placeholder.com/200x300/ff0000/969696',
        'https://via.placeholder.com/200x300/09ff00/969696',
        'https://via.placeholder.com/200x300/0044ff/969696',
        'https://via.placeholder.com/200x300/ff0000/969696',
        'https://via.placeholder.com/200x300/09ff00/969696',
        'https://via.placeholder.com/200x300/0044ff/969696'
      ]
    }
  }
}
</script>
