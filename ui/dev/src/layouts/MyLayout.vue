<template>
  <qas-layout :app-bar-props="appBarProps" :app-menu-props="appMenuProps" />
</template>

<script>
import { version } from 'ui'
import pages from '../router/pages'

const menuList = [
  {
    label: 'Dialog',
    icon: 'o_home',
    to: { path: '/test-dialog' }
  },

  {
    label: 'Teste expansivo',
    icon: 'o_edit',
    children: [...pages].splice(1, 4).map(page => ({ label: getPageTitle(page), to: '/' + page.path, icon: 'o_edit' }))
  },

  {
    label: 'Páginas',
    icon: 'o_layers',
    to: {
      path: ''
    },
    children: [...pages].splice(5).map(page => ({ label: getPageTitle(page), to: '/' + page.path, icon: 'o_edit' }))
  }
]

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

function getPageTitle ({ file }) {
  return file?.split('.')[0]
}

const user = {
  photo: 'https://www.abc.net.au/cm/lb/6367016/data/alan2c-see-the-person-data.jpg',
  name: 'Eduardo Lima',
  email: 'eduardolima@gmail.com'
}

export default {
  computed: {
    menuList () {
      return menuList
    },

    user () {
      return user
    },

    version () {
      return version
    },

    modules () {
      return modules
    },

    appBarProps () {
      return {
        isAuth: true,
        title: `quasar-ui-asteroid v${version}`,
        user: this.user
      }
    },

    appMenuProps () {
      return {
        items: this.menuList,
        modules: this.modules
      }
    }
  }
}
</script>
