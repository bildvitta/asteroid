<template>
  <q-layout view="hHh Lpr lFf">
    <q-header height-hint="70">
      <qas-app-bar :apps="apps" :is-auth="true" :title="`quasar-ui-asteroid v${version}`" :user="user" @toggle-menu="toggleMenuDrawer" />
    </q-header>

    <qas-app-menu v-model="menuDrawer" current-module="test" :items="menuList" :modules="modules" />

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
    label: 'Teste multiplo expansivo',
    icon: 'o_edit',
    children: [
      {
        label: 'teste'
      }
    ]
  },

  {
    label: 'Páginas',
    icon: 'o_layers',
    // children: [
    //   {
    //     label: 'Filho',
    //     icon: 'o_edit'
    //   }
    // ]
    children: pages.splice(5).map(page => ({ label: getPagtTitle(page), to: '/' + page.path, icon: 'o_edit' }))
  }
]

console.log(pages)

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
    }
  },

  methods: {
    toggleMenuDrawer () {
      this.menuDrawer = !this.menuDrawer
    }
  }
}
</script>
