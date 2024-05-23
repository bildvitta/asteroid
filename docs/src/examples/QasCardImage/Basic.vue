<template>
  <div class="container spaced">
    <div class="q-col-gutter-md row">
      <qas-card-image :images="images" use-header>
        <template #default>
          <div>
            Meu conteúdo
          </div>
        </template>
      </qas-card-image>

      <qas-card-image :images="images" use-header>
        <template #default>
          <div>
            Meu conteúdo
          </div>
        </template>
      </qas-card-image>

      <qas-card-image :images="images" use-header>
        <template #default>
          <div>
            Meu conteúdo
          </div>
        </template>
      </qas-card-image>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    images () {
      return [
        'https://via.placeholder.com/200x300',
        'https://via.placeholder.com/200x300',
        'https://via.placeholder.com/200x300',
        'https://via.placeholder.com/200x300',
        'https://via.placeholder.com/200x300',
        'https://via.placeholder.com/200x300',
        'https://via.placeholder.com/200x300',
        'https://via.placeholder.com/200x300',
        'https://via.placeholder.com/200x300',
        'https://via.placeholder.com/200x300',
        'https://via.placeholder.com/200x300',
        'https://via.placeholder.com/200x300'
      ]
    }
  }
}
</script>
