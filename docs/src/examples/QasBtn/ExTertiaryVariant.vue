<template>
  <div class="q-pa-md">
    <div class="q-mb-lg">
      <div class="q-gutter-sm q-mb-lg">
        <qas-label>Habilitado</qas-label>
        <qas-btn label="tertiary" variant="tertiary" />
        <qas-btn icon="sym_r_search" label="tertiary" variant="tertiary" />
        <qas-btn icon-right="sym_r_more_vert" label="tertiary" variant="tertiary" />
        <qas-btn icon="sym_r_search" variant="tertiary" />
      </div>

      <div class="q-gutter-sm q-mb-lg">
        <qas-btn color="grey-10" label="tertiary" variant="tertiary" />
        <qas-btn color="grey-10" icon="sym_r_search" label="tertiary" variant="tertiary" />
        <qas-btn color="grey-10" icon-right="sym_r_more_vert" label="tertiary" variant="tertiary" />
        <qas-btn color="grey-10" icon="sym_r_search" variant="tertiary" />
      </div>

      <div class="bg-secondary-contrast q-gutter-x-sm q-mb-lg q-py-lg">
        <qas-btn color="white" label="tertiary" variant="tertiary" />
        <qas-btn color="white" icon="sym_r_search" label="tertiary" variant="tertiary" />
        <qas-btn color="white" icon-right="sym_r_more_vert" label="tertiary" variant="tertiary" />
        <qas-btn color="white" icon="sym_r_search" variant="tertiary" />
      </div>

      <div class="bg-primary q-gutter-x-sm q-mb-lg q-py-lg">
        <qas-btn color="white" label="tertiary" :use-hover-on-white-color="false" variant="tertiary" />
        <qas-btn color="white" icon="sym_r_search" label="tertiary" :use-hover-on-white-color="false" variant="tertiary" />
        <qas-btn color="white" icon-right="sym_r_more_vert" label="tertiary" :use-hover-on-white-color="false" variant="tertiary" />
        <qas-btn color="white" icon="sym_r_search" :use-hover-on-white-color="false" variant="tertiary" />
      </div>

      <div class="q-gutter-sm">
        <qas-label>Desabilitado</qas-label>
        <qas-btn disabled label="tertiary" variant="tertiary" />
        <qas-btn disabled icon="sym_r_search" label="tertiary" variant="tertiary" />
        <qas-btn disabled icon-right="sym_r_more_vert" label="tertiary" variant="tertiary" />
        <qas-btn disabled icon="sym_r_search" variant="tertiary" />
      </div>
    </div>
  </div>
</template>
