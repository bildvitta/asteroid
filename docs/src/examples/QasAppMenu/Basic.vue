<template>
  <div>
    <q-layout class="flex items-center justify-center" :container="$qas.screen.untilLarge" style="height: 600px;">
      <qas-app-menu :items="menuList" :modules="modules" title="Documentação" />
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
          label: 'AppMenu',
          icon: 'o_menu',
          to: { path: '/why-asteroid' }
        },
        {
          label: 'Por que asteroid?',
          icon: 'o_pin',
          to: { path: '/why-asteroid' }
        },
        {
          label: 'Começando',
          children: [
            {
              label: 'Dialog',
              to: { path: '/plugins/dialog' },
              icon: 'o_settings_input_hdmi'
            },
            {
              label: 'Logger',
              to: { path: '/plugins/dialog' },
              icon: 'o_info'
            }
          ]
        }
      ]
    }
  }
}
</script>
