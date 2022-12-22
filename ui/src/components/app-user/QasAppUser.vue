<template>
  <div class="cursor-pointer items-center no-wrap q-gutter-sm qas-app-user row">
    <div class="relative-position">
      <qas-avatar color="white" dark :image="user.photo" rounded :size="avatarSize" text-color="primary" :title="userName" />
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

        <q-list class="q-mt-sm">
          <q-item v-close-popup :active="false" class="qas-app-user__menu-item" clickable :to="user.to">
            <q-item-section avatar>
              <q-icon name="o_person" size="20px" />
            </q-item-section>

            <q-item-section>Editar</q-item-section>
          </q-item>

          <q-item v-if="hasNotifications" v-close-popup class="qas-app-user__menu-item" clickable>
            <q-item-section avatar>
              <q-icon name="o_notifications" size="20px" />
            </q-item-section>

            <q-item-section>Notificações</q-item-section>

            <q-item-section side>
              <q-badge color="red">{{ notifications.count }}</q-badge>
            </q-item-section>
          </q-item>

          <q-item v-close-popup class="qas-app-user__menu-item" clickable @click="signOut">
            <q-item-section avatar>
              <q-icon name="o_logout" size="20px" />
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

  computed: {
    hasNotifications () {
      return !!Object.keys(this.notifications).length
    },

    userName () {
      return this.user.name || this.user.givenName
    }
  },

  methods: {
    signOut () {
      this.$emit('sign-out')
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
  }

  @media (max-width: $breakpoint-xs) {
    &__data {
      display: none;
    }
  }
}
</style>
