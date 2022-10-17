<template>
  <!-- Ignore este <q-layout />, ele é usado apenas para funcionar na documentação. -->
  <q-layout class="basic flex items-center justify-center" container>
    <qas-layout :app-bar-props="appBarProps" :app-menu-props="appMenuProps" />
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
          label: 'AppMenu',
          icon: 'o_menu',
          to: { path: '/components/app-menu' }
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

<!-- NÃO COPIAR, ADICIONADO POR CAUSA DA DOCUMENTAÇÃO -->
<style lang="scss">
.basic {
  height: 600px;
}

.q-body--fullscreen-mixin,
.q-body--prevent-scroll {
  position: initial !important;
}
</style>
