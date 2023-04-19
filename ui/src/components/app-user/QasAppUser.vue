<template>
  <div class="cursor-pointer items-center no-wrap q-gutter-sm qas-app-user row">
    <div class="relative-position">
      <qas-avatar :image="user.photo" :size="avatarSize" :title="userName" />
      <q-badge v-if="hasNotifications" color="red" floating>{{ notifications.count }}</q-badge>
    </div>

    <div class="ellipsis qas-app-user__data">
      <div class="ellipsis qas-app-user__name text-grey-9">{{ userName }}</div>
      <div class="ellipsis qas-app-user__email text-grey-8">{{ user.email }}</div>
    </div>

    <q-menu class="shadow-2 text-grey-9" max-height="400px" v-bind="menuProps">
      <div class="q-pb-sm q-pt-md q-px-md qas-app-user__menu">
        <qas-avatar class="q-mb-md" :image="user.photo" size="96px" :title="userName" />

        <div class="ellipsis qas-app-user__menu-name">{{ userName }}</div>
        <div class="ellipsis">{{ user.email }}</div>

        <qas-select v-if="hasCompaniesSelect" v-model="companiesModel" class="q-my-md" label="Vínculo" :loading="loading" :options="companiesOptions" @update:model-value="setCompanies" />

        <q-list class="q-mt-md">
          <q-item v-close-popup :active="false" class="qas-app-user__menu-item" clickable :to="user.to">
            <q-item-section avatar>
              <q-icon name="sym_r_person" />
            </q-item-section>

            <q-item-section>Editar</q-item-section>
          </q-item>

          <q-item v-if="hasNotifications" v-close-popup class="qas-app-user__menu-item" clickable>
            <q-item-section avatar>
              <q-icon name="sym_r_notifications" />
            </q-item-section>

            <q-item-section>Notificações</q-item-section>

            <q-item-section side>
              <q-badge color="red">{{ notifications.count }}</q-badge>
            </q-item-section>
          </q-item>

          <q-item v-close-popup class="qas-app-user__menu-item" clickable @click="signOut">
            <q-item-section avatar>
              <q-icon name="sym_r_logout" />
            </q-item-section>

            <q-item-section>Sair</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-menu>
  </div>
</template>

<script>
import QasAvatar from '../avatar/QasAvatar.vue'

export default {
  name: 'QasAppUser',

  components: {
    QasAvatar
  },

  props: {
    avatarSize: {
      default: '36px',
      type: String
    },

    companiesOptions: {
      type: Array,
      default: () => []
    },

    currentCompany: {
      type: String,
      default: ''
    },

    menuProps: {
      default: () => ({}),
      type: Object
    },

    notifications: {
      default: () => ({}),
      type: Object
    },

    user: {
      default: () => ({}),
      required: true,
      type: Object
    }
  },

  emits: ['sign-out'],

  data () {
    return {
      companiesModel: '',
      loading: false
    }
  },

  computed: {
    hasNotifications () {
      return !!Object.keys(this.notifications).length
    },

    userName () {
      return this.user.name || this.user.givenName
    },

    hasCompaniesSelect () {
      return this.companiesOptions.length > 1
    }
  },

  watch: {
    currentCompany: {
      handler (value) {
        this.companiesModel = value
      },

      immediate: true
    }
  },

  methods: {
    signOut () {
      this.$emit('sign-out')
    },

    async setCompanies (value) {
      this.loading = true

      try {
        // TODO remover
        await new Promise(resolve => setTimeout(resolve, 2000))
        await this.$axios.patch('users/me', { companies: value })

        this.$qas.success('Vínculo alterado com sucesso.')

        setTimeout(() => location.reload(), 1500)
      } catch {
        this.companiesModel = this.currentCompany
        this.$qas.error('Falha ao alterar vínculo.')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
.qas-app-user {
  &__data {
    line-height: 1.1;
  }

  &__name,
  &__menu-name {
    font-weight: 600;
  }

  &__email {
    font-size: 0.75rem;
  }

  &__menu {
    width: 248px;
  }

  &__menu-name {
    font-size: 1.125rem;
  }

  &__menu-item {
    min-height: 36px;
    padding: 0;

    & + & {
      margin-top: var(--qas-spacing-sm);
    }
  }

  @media (max-width: $breakpoint-xs) {
    &__data {
      display: none;
    }
  }
}
</style>
