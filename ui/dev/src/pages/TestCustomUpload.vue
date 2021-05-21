<template>
  <div class="col-12 container">
    <div class="q-mt-xl">
      <div>UPLOAD PADRÃO</div>
      <pre>model: {{ uploadDefault }}</pre>
      <qas-uploader v-model="uploadDefault" entity="portal-app/problems/photo" />
    </div>

    <div class="q-mt-xl">
      <div>UPLOAD MULTIPLO</div>
      <pre>model: {{ uploadMultiple }}</pre>
      <qas-uploader v-model="uploadMultiple" entity="portal-app/problems/photo" hint="cleyton" label="cleyton" multiple />
    </div>

    <div class="q-mt-xl">
      <div>USANDO FORM GENERATOR</div>
      <pre>model: {{ formGenerator.values }}</pre>
      <qas-form-generator v-model="formGenerator.values" columns="fit" :fields="formGenerator.fields" />
    </div>

    <div class="q-mt-xl">
      <div>UPLOAD PADRÃO COM VALOR</div>
      <pre>model: {{ uploadWithValue }}</pre>
      <qas-uploader v-model="uploadWithValue" entity="portal-app/problems/photo" />
    </div>

    <div class="q-mt-xl">
      <div>UPLOAD MULTIPLO COM VALOR</div>
      <pre>model: {{ uploadMultipleWithValue }}</pre>
      <qas-uploader v-model="uploadMultipleWithValue" entity="portal-app/problems/photo" multiple />
    </div>

    <div class="q-my-xl">
      <div>CUSTOM UPLOAD</div>
      <pre>model: {{ customUpload }}</pre>
      <qas-uploader v-model="customUpload" entity="portal-app/problems/photo">
        <template #custom-upload="{ context }">
          <q-btn color="primary" flat no-caps @click="context.dispatchUpload">
            <q-circular-progress v-if="context.isFetching" class="q-mr-sm" color="primary" indeterminate size="20px" />
            <q-icon class="q-mr-sm" name="o_camera_alt" />
            Fazer upload
          </q-btn>
        </template>
      </qas-uploader>

      <q-img class="q-mt-sm" height="200px" :src="customUpload" width="300px" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      uploadDefault: '',
      uploadMultiple: [],
      uploadWithValue: 'https://s3.amazonaws.com/develop-portal-cms.bivilabs.com.br/uploads/portal-app/problems/photo/47751626-8e24-4e3f-8ac7-1aa837550336.png',
      uploadMultipleWithValue: [
        'https://www.bild.com.br/uploads/photo/file/11974/content_BILD-VISION-5626.jpg',
        'https://s3.amazonaws.com/develop-portal-cms.bivilabs.com.br/uploads/portal-app/problems/photo/8043b545-30c7-47e4-91c4-16a74ffc4380.jpeg',
        'https://s3.amazonaws.com/develop-portal-cms.bivilabs.com.br/uploads/portal-app/problems/photo/27aa1255-1bca-47b5-8b60-bab5491566b3.jpg',
        'https://www.bild.com.br/uploads/photo/file/11974/content_BILD-VISION-5626.jpg'
      ],
      customUpload: '',

      formGenerator: {
        values: {
          uploader: [
            'https://s3.amazonaws.com/develop-portal-cms.bivilabs.com.br/uploads/portal-app/problems/photo/a5fb7c9f-910b-4408-894b-da4c0b40548a.jpg'
          ]
        },

        fields: {
          uploader: {
            default: '',
            entity: 'portal-app/problems/photo',
            extensions: ['jpg', 'jpeg', 'gif', 'png'],
            label: 'Inserir imagens',
            name: 'uploader',
            type: 'upload',
            // readonly: true,
            multiple: true,
            maxFiles: 2
          }
        }
      }
    }
  }
}
</script>
