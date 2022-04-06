<template>
  <!-- Ignore este <q-layout />, ele é usado apenas para funcionar na documentação. -->
  <q-layout class="flex items-center justify-center" container style="height: 600px;">
    <qas-layout :app-bar-props="appBarProps" :app-menu-props="appMenuProps" :model-value="false" />
  </q-layout>
</template>

<script>
const user = {
  photo: 'https://www.abc.net.au/cm/lb/6367016/data/alan2c-see-the-person-data.jpg',
  name: 'Eduardo Lima',
  email: 'eduardolima@gmail.com'
}

const modules = [
  {
    label: 'Assistência Digital',
    value: 'https://develop.assistencia-digital.nave.dev'
  },
  {
    label: 'Bolso Virtual BPO',
    value: 'https://app.bolsovirtual.com.br'
  },
  {
    label: 'Crm',
    value: 'https://develop.crm.nave.dev'
  },
  {
    label: 'HUB',
    value: 'https://develop.hub.nave.dev'
  },
  {
    label: 'Produto',
    value: 'https://develop.produto.nave.dev'
  },
  {
    label: 'Vendas',
    value: 'https://develop.vendas.nave.dev'
  }
]

export default {
  data () {
    return {
      opened: true
    }
  },

  computed: {
    appMenuProps () {
      return {
        modules,
        items: this.menuList
      }
    },

    appBarProps () {
      return {
        user,
        title: 'QasLayout',
        isAuth: true
      }
    },

    menuList () {
      return [
        {
          label: 'Home',
          icon: 'home',
          to: '/'
        },
        {
          label: 'About',
          icon: 'info',
          to: '/contact'
        }
      ]
    }
  }
}
</script>
