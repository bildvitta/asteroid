import { computed } from 'vue'
import { getImageSize, getResizeDimensions } from '../../helpers/images.js'

import Pica from 'pica'

export default function ({ props }) {
  const {
    acceptResizeTypes,
    picaResizeOptions,
    sizeLimit
  } = props

  const defaultPicaResizeOptions = computed(() => {
    return {
      unsharpAmount: 160,
      unsharpRadius: 0.6,
      unsharpThreshold: 1,

      ...picaResizeOptions
    }
  })

  async function resizeImage (file) {
    const { type } = file

    if (!acceptResizeTypes.includes(type)) return file

    try {
      const image = new Image()
      const canvas = document.createElement('canvas')

      image.src = URL.createObjectURL(file)

      // Retorna largura e altura da original da imagem
      const { width, height } = await getImageSize(image)

      // Tamanho da imagem menor que o tamanho limite, sendo assim, não faz o resize
      if (width <= sizeLimit) {
        return file
      }

      // Retorna os novos tamanhos redimensionados
      const resizedDimensions = getResizeDimensions(sizeLimit, width, height)

      canvas.width = resizedDimensions.width
      canvas.height = resizedDimensions.height

      // Resolve problemas com cors
      image.crossOrigin = ''

      image.width = width
      image.height = height

      const pica = Pica()
      const resizedImage = await pica.resize(image, canvas, defaultPicaResizeOptions)
      const blob = await pica.toBlob(resizedImage, type, 0.90)

      const newFile = new File([blob], file.name, { type })

      return newFile
    } catch {
      // Caso não consiga redimensionar retorna o arquivo original
      return file
    }
  }

  return {
    methods: {
      resizeImage
    }
  }
}
