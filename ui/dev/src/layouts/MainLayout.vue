<template>
  <qas-layout :app-bar-props="appBarProps" :app-menu-props="appMenuProps" />
</template>

<script>
import { version } from 'ui'
import pages from '../router/pages'

const apps = [
  {
    label: 'Hub',
    image: 'http://placehold.it/640x640'
  },
  {
    label: 'Produto',
    image: 'http://placehold.it/640x640'
  },
  {
    label: 'CRM',
    image: 'http://placehold.it/640x640'
  },
  {
    label: 'Vendas',
    image: 'http://placehold.it/640x640'
  },
  {
    label: 'Repasse',
    image: 'http://placehold.it/640x640'
  },
  {
    label: 'Jurídico',
    image: 'http://placehold.it/640x640'
  }
]

const menuList = [
  {
    label: 'Dialog',
    icon: 'o_home',
    to: { path: '/dialog-form' }
  },

  {
    label: 'Teste expansivo',
    icon: 'o_edit',
    children: pages.splice(1, 4).map(page => ({ label: getPagtTitle(page), to: '/' + page.path, icon: 'o_edit' }))
  },

  {
    label: 'Páginas',
    icon: 'o_layers',
    to: {
      path: '/test-input-number'
    },
    children: pages.splice(5).map(page => ({ label: getPagtTitle(page), to: '/' + page.path, icon: 'o_edit' }))
  }
]

function getPagtTitle ({ title }) {
  return title?.split('.')[0]
}

const user = {
  photo: 'https://www.abc.net.au/cm/lb/6367016/data/alan2c-see-the-person-data.jpg',
  name: 'Eduardo Lima',
  email: 'eduardolima@gmail.com'
}

export default {
  data () {
    return {
      menuDrawer: true
    }
  },

  computed: {
    apps () {
      return apps
    },

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
      return [
        {
          label: 'Modulo de teste',
          value: 'test',
          path: 'http://localhost:8080'
        },
        {
          label: 'Segundo modulo de teste',
          value: 'test-2',
          path: 'https://google.com'
        }
      ]
    },

    appBarProps () {
      return {
        apps: this.apps,
        isAuth: true,
        title: `quasar-ui-asteroid v${version}`,
        user: this.user,
        id: 'eaeee mano'
      }
    },

    appMenuProps () {
      return {
        currentModule: 'test',
        items: this.menuList,
        modules: this.modules
      }
    }
  },

  methods: {
    toggleMenuDrawer () {
      this.menuDrawer = !this.menuDrawer
    }
  }
}
</script>
