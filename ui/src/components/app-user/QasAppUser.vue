<template>
  <div class="cursor-pointer items-center no-wrap q-gutter-sm qas-app-user row" data-cy="app-user">
    <div class="relative-position">
      <qas-avatar :image="user.photo" :size="avatarSize" :title="userName" />

      <q-badge v-if="hasNotifications" color="red" floating>
        {{ notifications.count }}
      </q-badge>
    </div>

    <div class="ellipsis qas-app-user__data">
      <div class="ellipsis qas-app-user__name text-grey-10">
        {{ userName }}
      </div>

      <div class="ellipsis qas-app-user__email text-grey-8">
        {{ user.email }}
      </div>
    </div>

    <q-menu class="shadow-2 text-grey-10" max-height="400px" v-bind="menuProps">
      <div class="q-pb-sm q-pt-md q-px-md qas-app-user__menu">
        <qas-avatar class="q-mb-md" :image="user.photo" size="64px" :title="userName" />

        <div class="ellipsis qas-app-user__menu-name">
          {{ userName }}
        </div>

        <div class="ellipsis">
          {{ user.email }}
        </div>

        <qas-select v-if="hasCompaniesSelect" v-model="companiesModel" class="q-my-md" v-bind="defaultCompanyProps" data-cy="app-user-companies-select" @update:model-value="setCompanies" />

        <q-list class="q-mt-md">
          <q-item v-close-popup :active="false" class="qas-app-user__menu-item" clickable :to="user.to">
            <q-item-section avatar>
              <q-icon name="sym_r_person" />
            </q-item-section>

            <q-item-section>
              Editar
            </q-item-section>
          </q-item>

          <q-item v-if="hasNotifications" v-close-popup class="qas-app-user__menu-item" clickable>
            <q-item-section avatar>
              <q-icon name="sym_r_notifications" />
            </q-item-section>

            <q-item-section>
              Notificações
            </q-item-section>

            <q-item-section side>
              <q-badge color="red">
                {{ notifications.count }}
              </q-badge>
            </q-item-section>
          </q-item>

          <q-item v-close-popup class="qas-app-user__menu-item" clickable @click="signOut">
            <q-item-section avatar>
              <q-icon name="sym_r_logout" />
            </q-item-section>

            <q-item-section>
              Sair
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-menu>
  </div>
</template>

<script setup>
import QasAvatar from '../avatar/QasAvatar.vue'

import { NotifySuccess, NotifyError } from '../../plugins'

import { ref, computed, watch, inject } from 'vue'

defineOptions({ name: 'QasAppUser' })

const props = defineProps({
  avatarSize: {
    default: '40px',
    type: String
  },

  companyProps: {
    default: () => ({}),
    type: Object
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
})

const emits = defineEmits(['sign-out'])

// vindo direto do boot api.js
const axios = inject('axios')

const companiesModel = ref('')
const loading = ref(false)

const defaultCompanyProps = computed(() => {
  return {
    loading: loading.value,

    ...props.companyProps,

    // não é possível alterar o label.
    label: 'Vínculo'
  }
})

const hasCompaniesSelect = computed(() => !!props.companyProps.options?.length)
const hasNotifications = computed(() => !!Object.keys(props.notifications).length)

const userName = computed(() => props.user.name || props.user.givenName)

// watch
watch(() => props.companyProps.modelValue, value => {
  companiesModel.value = value
}, { immediate: true })

// métodos
function signOut () {
  emits('sign-out')
}

async function setCompanies (value) {
  loading.value = true

  try {
    await axios.patch('users/me', { companies: value })
    setTimeout(() => location.reload(), 1500)

    NotifySuccess('Vínculo alterado com sucesso.')
  } catch {
    companiesModel.value = props.companyProps.modelValue

    NotifyError('Falha ao alterar vínculo.')
  } finally {
    loading.value = false
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
