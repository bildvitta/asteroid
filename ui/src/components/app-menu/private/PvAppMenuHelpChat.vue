<template>
  <q-menu anchor="top right" auto-close class="pv-app-menu-help-chat shadow-2" max-width="400px" self="top left" touch-position>
    <header class="q-pa-md">
      <h3>Bem-vindo!</h3>

      <div class="text-subtitle1">
        Deixe a sua mensagem para o suporte técnico da Nave.
      </div>
    </header>
    <qas-box class="pv-app-menu-help-chat__content">
      <div class="pv-app-menu-help-chat__iframe-content" />

      <div>
        <div class="text-subtitle2">
          Estamos conectados
        </div>

        <div class="text-body2">
          Normalmente responde em alguns minutos
        </div>

        <qas-btn class="full-width q-mt-md" label="Iniciar conversa" variant="primary" />
      </div>
    </qas-box>
  </q-menu>
</template>

<script setup>
defineOptions({ name: 'PvAppMenuHelpChat' })
</script>

<style lang="scss">
.pv-app-menu-help-chat {
  &__content {
    background-color: var(--qas-background-color) !important;
  }

  &__iframe-content {
    height: 140px;
  }
}

.webchat__send-box__main {

  svg {
    color: red !important;
    fill: red !important;
  }
}
</style>
