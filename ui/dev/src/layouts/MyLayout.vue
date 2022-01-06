<template>
  <q-layout view="hHh Lpr lFf">
    <q-header height-hint="70">
      <qas-app-bar :apps="apps" :is-auth="true" :title="`quasar-ui-asteroid v${version}`" :user="user" @sign-out="signOut" @toggle-menu="toggleMenuDrawer" />
    </q-header>

    <qas-app-menu v-model="menuDrawer" :items="menuList" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { version } from 'ui'
import pages from '../router/pages'

const apps = [
  {
    label: 'Hub',
    image: 'http://placehold.it/640x320'
  },
  {
    label: 'Produto',
    image: 'http://placehold.it/640x320'
  },
  {
    label: 'CRM',
    image: 'http://placehold.it/640x320'
  },
  {
    label: 'Vendas',
    image: 'http://placehold.it/640x320'
  },
  {
    label: 'Repasse',
    image: 'http://placehold.it/640x320'
  },
  {
    label: 'Jurídico',
    image: 'http://placehold.it/640x320'
  }
]

const menuList = [
  {
    label: 'Início',
    icon: 'o_home',
    to: { path: '/ooo' }
  },

  {
    label: 'Menu Teste',
    icon: 'o_layers',
    to: { path: '/teste' },
    children: [
      { label: 'Teste 1', to: { path: '/teste-1' }, }
    ]
  },

  {
    label: 'Páginas',
    icon: 'o_layers',
    to: { path: '/' },
    children: pages.map(page => ({ ...page, to: '/' + page.path }))
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
    }
  },

  methods: {
    signOut () {
      console.log('signOut fired.')
    },

    toggleMenuDrawer () {
      this.menuDrawer = !this.menuDrawer
    }
  }
}
</script>
