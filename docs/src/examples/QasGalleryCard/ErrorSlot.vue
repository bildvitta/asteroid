<template>
  <div class="container spaced">
    <div class="row">
      <div class="col-4">
        <qas-gallery-card v-bind="galleryCardProps">
          <template #image-error-container>
            <div class="bg-blue-grey-2 flex full-height full-width items-center justify-center text-blue-grey-8">
              <div>
                <div>
                  <q-icon name="sym_r_draft" size="lg" />
                </div>

                <h4 class="q-mt-xs text-blue-grey-8 text-center text-h4">
                  PDF
                </h4>
              </div>
            </div>
          </template>
        </qas-gallery-card>
      </div>
    </div>
  </div>
</template>

<script setup>
const galleryCardProps = {
  useHeaderErrorMode: false,
  url: 'https://dhaw-crmap01-assets.s3.amazonaws.com/uploads/customers/import/upload/43e8aaef-6237-4e51-9cfd-f6b2c923f152.pdf'
}
</script>
