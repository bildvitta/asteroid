<template>
  <div>
    <q-layout class="flex items-center justify-center" :container="$qas.screen.untilLarge" style="height: 600px;">
      <qas-app-menu :items="menuList" :modules="modules" title="Documentação" :user="user" />
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

const user = {
  photo: 'https://www.abc.net.au/cm/lb/6367016/data/alan2c-see-the-person-data.jpg',
  name: 'Eduardo Lima',
  email: 'eduardolima@gmail.com'
}

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
          label: 'Começando',
          children: [
            {
              label: 'Dialog',
              to: { path: '/plugins/dialog' },
              icon: 'sym_r_settings_input_hdmi'
            },
            {
              label: 'Logger',
              to: { path: '/plugins/dialog' },
              icon: 'sym_r_info'
            }
          ]
        },
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
          label: 'Começando',
          children: [
            {
              label: 'Dialog',
              to: { path: '/plugins/dialog' },
              icon: 'sym_r_settings_input_hdmi'
            },
            {
              label: 'Logger',
              to: { path: '/plugins/dialog' },
              icon: 'sym_r_info'
            }
          ]
        },
        {
          label: 'AppMenu',
          icon: 'sym_r_menu',
          to: { path: '/components/app-menu' }
        },
        {
          label: 'Por que asteroid?',
          icon: 'sym_r_pin',
          to: { path: '/why-asteroid' }
        }
        // {
        //   label: 'Começando',
        //   children: [
        //     {
        //       label: 'Dialog',
        //       to: { path: '/plugins/dialog' },
        //       icon: 'sym_r_settings_input_hdmi'
        //     },
        //     {
        //       label: 'Logger',
        //       to: { path: '/plugins/dialog' },
        //       icon: 'sym_r_info'
        //     }
        //   ]
        // }
      ]
    },

    user () {
      return user
    }
  }
}
</script>
