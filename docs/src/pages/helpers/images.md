---
title: images
---

Conjunto de funções para lidar com imagens.
Funções: `getImageSize`, `getResizeDimensions`.

- [getImageSize](/helpers/images/#getImageSize)
- [getResizeDimensions](/helpers/images/#getResizeDimensions)

### Funções

#### getImageSize
Função para recuperar os tamanhos de uma imagem.

::: warning
Esta função retorna uma [Promise](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise).
:::

```js
// Definição
getImageSize(
  image // Elemento <img>
)

const image = new Image()
image.src = 'https://picsum.photos/200'

const { width, height } = await getImageSize(image)

// retorna: { width: 200, height: 200 }
```

#### getResizeDimensions
Função para recuperar dimensões de redimensionamento.

```js
// Definição
getResizeDimensions(
  sizeLimit, // tamanho máximo permitido
  width, // largura da imagem
  height // altura da imagem
)

const { width, height } = getResizeDimensions(1920, 2400, 1500)

// retorna: { width: 1920, height: 1200 }
```
