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
    label: 'Asteroid',
    value: 'https://asteroid.nave.dev',
    icon: 'sym_r_home'
  },
  {
    label: 'Asteroid - Beta',
    value: 'https://asteroid-homolog.vercel.app',
    icon: 'sym_r_home'
  },
  {
    label: 'Assistência Digital',
    value: 'https://develop.assistencia-digital.nave.dev',
    icon: 'sym_r_home'
  },
  {
    label: 'Bolso Virtual BPO',
    value: 'https://app.bolsovirtual.com.br',
    icon: 'sym_r_home'
  },
  {
    label: 'Crm',
    value: 'https://develop.crm.nave.dev',
    icon: 'sym_r_home'
  },
  {
    label: 'HUB',
    value: 'https://develop.hub.nave.dev',
    icon: 'sym_r_home'
  },
  {
    label: 'Produto',
    value: 'https://develop.produto.nave.dev',
    icon: 'sym_r_home'
  },
  {
    label: 'Vendas',
    value: 'https://develop.vendas.nave.dev',
    icon: 'sym_r_home'
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
        brand: 'https://placehold.co/208x40',
        miniBrand: 'https://placehold.co/40x40',
        items: this.menuList
      }
    },

    appBarProps () {
      return {
        appUserProps: {
          companyProps: {
            options: [
              {
                label: 'Empresa 1',
                value: '1'
              },
              {
                label: 'Empresa 2',
                value: '2'
              }
            ],

            modelValue: '1'
          },

          user
        },
        title: 'QasLayout'
      }
    },

    menuList () {
      return [
        {
          label: 'AppMenu',
          icon: 'sym_r_menu',
          to: { path: '/components/app-menu' }
        },
        {
          label: 'Por que asteroid?',
          icon: 'sym_r_pin',
          to: { path: '/why-asteroid' }
        },
        {
          label: 'Começando com um titulo longo',
          children: [
            {
              label: 'Configurações',
              to: { path: '/plugins/dialog' },
              icon: 'sym_r_settings_input_hdmi'
            },
            {
              label: 'Logger',
              to: { path: '/plugins/dialog' },
              icon: 'sym_r_info'
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
