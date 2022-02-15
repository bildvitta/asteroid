<template>
  <div class="col-12 container">
    <div class="q-mt-xl">
      <div>UPLOAD PADRÃO DOCUMENTO</div>
      <pre>model: {{ uploadDefault }}</pre>
      isUploading: {{ isUploading }}
      <qas-signature-uploader v-model="uploadDefault" v-model:uploading="isUploading" entity="service_orders/inspectionSignature" signature-label="Assinatura do Cleyton" upload-label="Assinatura digital" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isUploading: false,
      uploadDefault: 'https://s3.amazonaws.com/develop-portal-cms.bivilabs.com.br/uploads/portal-app/problems/photo/47751626-8e24-4e3f-8ac7-1aa837550336.png'
    }
  }
}
</script>
