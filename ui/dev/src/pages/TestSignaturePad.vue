<template>
  <q-page class="container row spaced">
    <div class="col-12">
      <!-- <qas-signature-pad ref="signaturePad" height="250" :is-empty.sync="isEmpty" :options="{ backgroundColor }" />
      <div v-if="isEmpty" class="q-mt-sm">Está vazio</div>
      <div class="q-gutter-sm q-mb-xl q-mt-sm row">
        <q-btn color="primary" label="Salvar" no-caps @click="saveSignature" />
        <q-btn color="primary" label="Limpar" no-caps @click="clearSignature" />
        <q-btn color="primary" label="Trocar cor" no-caps @click="changeColor" />
      </div> -->

      <qas-signature-uploader v-model="signature" class="col-12" entity="portal-app/problems/photo" signature-label="Assinatura do Cleyton" upload-label="Assinatura digital" />
      <pre class="q-mb-xl">v-model {{ signature }}</pre>

      <qas-form-generator v-model="formGenerator.values" columns="fit" :errors="formGenerator.errors" :fields="formGenerator.fields" :fields-props="filesFieldsProps" />
      <pre>{{ formGenerator }}</pre>
    </div>
  </q-page>
</template>

<script>
export default {

  data () {
    return {
      backgroundColor: 'white',
      isEmpty: true,
      signature: 'https://s3.amazonaws.com/develop-portal-cms.bivilabs.com.br/uploads/portal-app/problems/photo/b7ce481e-44c4-49ee-8d8b-737feb70bc18.png',

      formGenerator: {
        values: {
          uploader: 'https://s3.amazonaws.com/develop-portal-cms.bivilabs.com.br/uploads/portal-app/problems/photo/b7ce481e-44c4-49ee-8d8b-737feb70bc18.png'
        },

        fields: {
          uploader: {
            default: '',
            entity: 'portal-app/problems/photo',
            label: 'Assinatura do Cleytinho',
            name: 'uploader',
            type: 'signature-uploader'
          }
        },

        errors: {
          uploader: [
            'Campo obrigatório'
          ]
        }
      }
    }
  },

  computed: {
    filesFieldsProps () {
      return {
        uploader: { readonly: true }
      }
    }
  },

  methods: {
    saveSignature () {
      alert(`base64 gerado: ${this.$refs.signaturePad.saveSignature()}`)
    },

    clearSignature () {
      this.$refs.signaturePad.clearSignature()
    },

    changeColor () {
      this.backgroundColor = 'grey'
    }
  }
}
</script>
