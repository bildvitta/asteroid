<template>
  <div>
    <q-layout class="flex items-center justify-center" container style="height: 600px;">
      <qas-app-menu v-model="isMenuOpened" :items="menuList" :modules="modules" title="Documentação" />
    </q-layout>
  </div>
</template>

<script>
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
      isMenuOpened: true
    }
  },

  computed: {
    modules () {
      return modules
    },

    menuList () {
      return [
        {
          label: 'Home 1',
          icon: 'home',
          to: { name: 'Components' }
        },
        {
          label: 'About 1',
          icon: 'info',
          to: '/contacto'
        },
        {
          label: 'About 2',
          icon: 'info',
          children: [
            {
              label: 'About 2.1',
              icon: 'info',
              to: '/contact'
            },
            {
              label: 'Home 2.2',
              icon: 'home',
              to: '/components/app-menu'
            }
          ]
        },
        {
          label: 'About 3',
          icon: 'info',
          children: [
            {
              label: 'About 3.1',
              icon: 'info',
              to: '/contact'
            },
            {
              label: 'Home 3.2',
              icon: 'home',
              to: '/components/app-menu'
            },
            {
              label: 'Home 3.3',
              icon: 'home',
              to: '/components/app-menu'
            },
            {
              label: 'Home 3.4',
              icon: 'home',
              to: '/components/app-menu'
            }
          ]
        }
      ]
    }
  }
}
</script>
