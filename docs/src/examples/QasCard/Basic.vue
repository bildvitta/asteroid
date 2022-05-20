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
        'https://picsum.photos/200/300?random=1',
        'https://picsum.photos/200/300?random=2',
        'https://picsum.photos/200/300?random=3',
        'https://picsum.photos/200/300?random=4',
        'https://picsum.photos/200/300?random=5',
        'https://picsum.photos/200/300?random=6',
        'https://picsum.photos/200/300?random=7',
        'https://picsum.photos/200/300?random=8',
        'https://picsum.photos/200/300?random=9',
        'https://picsum.photos/200/300?random=10',
        'https://picsum.photos/200/300?random=11',
        'https://picsum.photos/200/300?random=12'
      ]
    }
  }
}
</script>
