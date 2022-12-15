# Changelog
Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Para encontrar de uma forma mais detalhada todas as mudanças da `versão 2` para a `versão 3`, navegue até o arquivo `/docs/src/pages/start/upgrade-guide.md`.
Neste arquivo (CHANGELOG.MD) você encontrará somente as mudanças referentes a versão 3.

### Sobre os "BREAKING CHANGES"
Podemos ter pequenas breaking changes sem alterar o `major` version, apesar de serem pequenas, podem alterar o comportamento da funcionalidade caso não seja feita uma atualização, **preste muita atenção** nas breaking changes dentro das versões quando existirem.

## Não publicado
## BREAKING CHANGE
- `QasTableGenerator`: pode haver breaking change de design no espaçamento embaixo do componente uma vez que foi removido a classe `q-mb-xl`.
- `QasNestedFields`: mudanças de comportamento e estilo do nested, rever implementações.

### Adicionado
- `QasPagination`: adicionado novo componente de paginação que é um wrapper do `QPagination`.
- `QasField`: Adicionado `*` na label no caso do campo ser obrigatório com base na propriedade `required: true`.
- [`NotifySuccess`, `NotifyError`]: Adicionado botão de fechar.
- [`NotifySuccess`, `NotifyError`]: Adicinado ícones de sucesso e erro.
- `shared`: Adicionado pasta para arquivos de configurações que iremos utilizar internamente.
- `plugins`: Adicionado pasta para plugins css.
- `notify.scss`: Adicionado arquivo de css para o novo padrão de layout dos notifies.
- `QasListView`: adicionado nova propriedade `use-auto-handle-on-delete` para controlar se o componente vai lidar automaticamente quando acontecer algum delete compatível com a listagem.
- `QasNestedFields`: adicionada nova propriedade `addFirstInputLabel` para modificar o texto do botão de adicionar o primeiro item.
- `QasNestedFields`: adicionada nova propriedade `useFirstInputButton` para usar um botão diferente para adicionar o primeiro item.
- `QasNestedFields`: adicionada nova propriedade `useStartsEmpty` para iniciar o componente sem nenhum item.

### Modificado
- [`NotifySuccess`, `NotifyError`]: Mudança de posição que será exibido(era bottom, agora será top).
- [`NotifySuccess`, `NotifyError`]: Mudança de cor, agora será `grey-9`.
- `generator.js`: Modificado o padrão da prop de gutter de `md` para `lg`.
- `QasActionsMenu`: modificado o estilo padrão do componente e comportamento quando há uma ação ou mais ações.
- `QasActionsMenu`: modificado a label padrão do botão para "Opções" e ícone para `o_more_vert`.
- `QasTableGenerator`: removido classe `q-mb-xl` para adaptação de layout, responsabilidade de espaçamento fica com quem implementa.
- `QasListView`: utilizando `QasPagination` no lugar do `QPagination` e adicionado de informação de quantos itens existem por página.
- `QasNestedFields`: modificado o valor padrão da propriedade `addInputLabel` para "Adicionar".
- `QasNestedFields`: modificado o valor padrão da propriedade `useDestroyAlways` para ser um espelho da propriedade `useStartsEmpty` como valor default.

## [3.5.0-beta.0] - 18-11-2022
## BREAKING CHANGE
- `QasField`: Alterado type `radio` par utilizar o novo componente `QasOptionGroup` e removido prop de erro pois não existe no componente `QOptionGroup`, testar bem para validar.
- Componentes de radio agora existe padronização, a partir do mobile componente segue comportamento de linha, em telas mobile segue comportamento de bloco, não sendo possível alterar este comportamento, verificar locais que utilizam para não quebrar o estilo.
- `QasSelect`: removido propriedade `useSearch` pois agora existe o padrão de ter pesquisa pelo fuse sempre que existir pelo menos 10 opções e nunca menos que isto.

### Adicionado
- `QasFilters`: adicionado nova propriedade `fieldsProps` para repassar propriedades para os campos do filtro.
- `QasSelect`: adicionado busca automaticamente quando existem pelo menos 10 opções.
- `QasOptionGroup`: adicionado novo componente wrapper do `QOptionGroup` do quasar, para deixar padronizado propriedade `inline` e deixar mais componentizado.

### Modificado
- `QasField`: alterado type `radio` par utilizar o novo componente `QasOptionGroup` e removido prop de erro pois não existe no componente `QOptionGroup`.
- `QasField`: removido propriedade `useSearch` que era repassado para o `QasSelect` já que ela foi removido do mesmo.
- `typography.scss`: alterado tipografia para seguir novo padrão de design.

### Removido
- `QasSelect`: removido propriedade `useSearch` pois agora existe o padrão de ter pesquisa pelo fuse sempre que existir pelo menos 10 opções e nunca menos que isto.

## [3.4.0] - 18-11-2022
### Adicionado
- `QasField`: repassando `useStrengthChecker` no QasField.
- `copyToClipboard`: adicionado novo helper copyToClipboard para ser utilizado no componente `QasCopy` e fora do asteroid.

### Modificado
- [`QasFormView`, `QasListView`, `QasSingleView`]: removido notify de erro do método `mx_fetchError` quando o status code é `401 | 403 | 404 | >= 500`.
- `QasCopy`: utilizando novo helper`copyToClipboard`.
- `QasSearchBox`: modificado tempo de `debounce` no lazy loading de `500` para `800`.
- `QasSearchBox`: removido `disable` do campo de busca enquanto ocorria uma request.
- `quasar`: atualizado quasar para `2.10.1`.

### Corrigido
- `QasAppBar`: corrigido badge que mostra se o ambiente é de `Develop`.
- `QasPasswordInput`: corrigido problema de slots que não mostrada `QasPasswordStrengthChecker` quando renderizado pelo `QasField` e também não respeitava a prop `hideBottomSpace` quando usado diretamente.
- `QasFormGenerator`: corrigido problema que não deixava campo disabled quando a prop vinha pelo `QasField`.
- `QasInput`: corrigido problemas de mascara ao alterar valor do model fora do componente.

## [3.4.0-beta.2] - 17-11-2022
### Corrigido
- `QasFormGenerator`: corrigido problema que não deixava campo disabled quando a prop vinha pelo `QasField`.

## [3.4.0-beta.1] - 11-11-2022
### Adicionado
- `QasField`: repassando `useStrengthChecker` no QasField.

### Modificado
- `QasSearchBox`: modificado tempo de `debounce` no lazy loading de `500` para `800`.
- `QasSearchBox`: removido `disable` do campo de busca enquanto ocorria uma request.

### Corrigido
- `QasAppBar`: corrigido badge que mostra se o ambiente é de `Develop`.
- `QasPasswordInput`: corrigido problema de slots que não mostrada `QasPasswordStrengthChecker` quando renderizado pelo `QasField` e também não respeitava a prop `hideBottomSpace` quando usado diretamente.

## [3.4.0-beta.0] - 10-11-2022
### Adicionado
- `copyToClipboard`: adicionado novo helper copyToClipboard para ser utilizado no componente `QasCopy` e fora do asteroid.

### Modificado
- [`QasFormView`, `QasListView`, `QasSingleView`]: removido notify de erro do método `mx_fetchError` quando o status code é `401 | 403 | 404 | >= 500`.
- `QasCopy`: utilizando novo helper`copyToClipboard`.

## [3.3.1-beta.0] - 04-11-2022
### Modificado
- `quasar`: atualizado quasar para `2.10.1`.

### Corrigido
- `QasInput`: corrigido problemas de mascara ao alterar valor do model fora do componente.

## [3.3.0] - 04-11-2022
## BREAKING CHANGES
- `QasGallery`: propriedade `images` substituída para `modelValue` uma vez que agora é possível excluir itens da galeria.
- `QasGallery`: propriedade `height` removida para padronização.
- `QasGallery`: propriedade `carouselNextIcon` removida para padronização.
- `QasGallery`: propriedade `carouselPreviousIcon` removida para padronização.
- `QasGallery`: propriedade `loadSize` removida, agora o tamanho de carregamento de imagens é relativo ao `initialSize`.

### Adicionado
- `QasDialog`: adicionado nova propriedade `useFullMaxWidth` para utilizar `100% do maxWidth`.
- `QasGallery`: adicionado funcionalidade para deletar imagem a partir da galeria.
- `QasGallery`: adicionado propriedade `customId` usada para deletar a imagem da galeria.
- `QasGallery`: adicionado propriedade `dialogProps` usada para configurar dialog de deleção.
- `QasGallery`: adicionado propriedade `entity` usada para deletar a imagem da galeria.
- `QasGallery`: adicionado propriedade `modelValue` usada para controlar as imagens.
- `QasGallery`: adicionado propriedade `modelKey` usada para deletar a imagem da galeria.
- `QasGallery`: adicionado propriedade `url` usada para deletar a imagem da galeria.
- `QasGallery`: adicionado propriedade `entity` usada para deletar a imagem da galeria.
- `QasGallery`: adicionado propriedade `useDestroy` usada para deletar a imagem da galeria.
- `QasGallery`: adicionado propriedade `useObjectModel` usada para definir model como objeto.
- `QasGallery`: adicionado evento `@update:modelValue` para atualização do model.
- `QasGallery`: adicionado evento `@delete-success` que é disparado quando acontece uma deleção com sucesso.
- `QasGallery`: adicionado evento `@delete-error` que é a deleção falha.

### Modificado
- `QasGallery`: alterado estilos/comportamento quando é imagem única do componente.
- `QasGallery`: refatoração de código.
- `QasGallery`: Adicionado classe `bg-white` para espaço entre a sombra e imagem sempre ficar `branca`.

### Corrigido
- `QasGallery`: resolvido pequeno problema referente a tamanhos

### Removido
- `QasGallery`: propriedade `images` substituída para `modelValue` uma vez que agora é possível excluir itens da galeria.
- `QasGallery`: propriedade `height` removida para padronização.
- `QasGallery`: propriedade `carouselNextIcon` removida para padronização.
- `QasGallery`: propriedade `carouselPreviousIcon` removida para padronização.
- `QasGallery`: propriedade `loadSize` removida, agora o tamanho de carregamento de imagens é relativo ao `initialSize`.

## [3.3.0-beta.1] - 31-10-2022
### Modificado
- `QasGallery`: adicionado classe `bg-white` para espaço entre a sombra e imagem sempre ficar `branca`.

## [3.3.0-beta.0] - 31-10-2022
## BREAKING CHANGES
- `QasGallery`: propriedade `images` substituída para `modelValue` uma vez que agora é possível excluir itens da galeria.
- `QasGallery`: propriedade `height` removida para padronização.
- `QasGallery`: propriedade `carouselNextIcon` removida para padronização.
- `QasGallery`: propriedade `carouselPreviousIcon` removida para padronização.
- `QasGallery`: propriedade `loadSize` removida, agora o tamanho de carregamento de imagens é relativo ao `initialSize`.

### Adicionado
- `QasDialog`: adicionado nova propriedade `useFullMaxWidth` para utilizar `100% do maxWidth`.
- `QasGallery`: adicionado funcionalidade para deletar imagem a partir da galeria.
- `QasGallery`: adicionado propriedade `customId` usada para deletar a imagem da galeria.
- `QasGallery`: adicionado propriedade `dialogProps` usada para configurar dialog de deleção.
- `QasGallery`: adicionado propriedade `entity` usada para deletar a imagem da galeria.
- `QasGallery`: adicionado propriedade `modelValue` usada para controlar as imagens.
- `QasGallery`: adicionado propriedade `modelKey` usada para deletar a imagem da galeria.
- `QasGallery`: adicionado propriedade `url` usada para deletar a imagem da galeria.
- `QasGallery`: adicionado propriedade `entity` usada para deletar a imagem da galeria.
- `QasGallery`: adicionado propriedade `useDestroy` usada para deletar a imagem da galeria.
- `QasGallery`: adicionado propriedade `useObjectModel` usada para definir model como objeto.
- `QasGallery`: adicionado evento `@update:modelValue` para atualização do model.
- `QasGallery`: adicionado evento `@delete-success` que é disparado quando acontece uma deleção com sucesso.
- `QasGallery`: adicionado evento `@delete-error` que é a deleção falha.

### Modificado
- `QasGallery`: alterado estilos/comportamento quando é imagem única do componente.
- `QasGallery`: refatoração de código.

### Corrigido
- `QasGallery`: resolvido pequeno problema referente a tamanhos

### Removido
- `QasGallery`: propriedade `images` substituída para `modelValue` uma vez que agora é possível excluir itens da galeria.
- `QasGallery`: propriedade `height` removida para padronização.
- `QasGallery`: propriedade `carouselNextIcon` removida para padronização.
- `QasGallery`: propriedade `carouselPreviousIcon` removida para padronização.
- `QasGallery`: propriedade `loadSize` removida, agora o tamanho de carregamento de imagens é relativo ao `initialSize`.

## [3.2.0] - 21-10-2022
## BREAKING CHANGES
- `QasAppMenu`: removido logo do modular no menu.
- `QasAppMenu`: agora os itens com children no item pai não tem redirecionamento, nem ícone, apenas os filhos dele.
- `quasar`: atualizado para 2.10.0.

### Adicionado
- `QasTreeGenerator`: adicionado novo componente para criação de árvore.
- `promiseHandler`: adicionado novo helper para lidar com promises.
- `destroyNestedChildrenByKey`: adicionado novo helper para lidar com remoção em campos nested.
- `findChildrenByKey`: adicionado novo helper para encontrar children através de chave e valor.
- `rules`: adicionado novo helper para lidar com validações de componentes, no momento existe apenas `required`.
- Criado automatização de todo processo de publicação do asteroid.

### Modificado
- `QasAvatar`: forçando a sempre ser "redondo", removido propriedades `rounded` e `square`.
- `QasAppBar`: alterado estilos do componente.
- `fonts.scss`: alterado font `Inter` para `Nunito`.
- `item.scss`: alterado estilo padrão do `QItem`.
- `spacing.scss`: alterado espaçamento padrão do `lg` para `32px`.
- `QasAppMenu`: alterado estilos e comportamento do componente, entre eles o modo "mini".
- `quasar`: atualizado o quasar para a versão 2.10.0.
- `QasLayout`: modificado screen `untilMedium` para `untilLarge`.

### Corrigido
- `add-counter-suffix.md`: corrigido title da documentação.
- `filter-object.md`: corrigido title da documentação.
- `checkbox-group.md`: corrigido documentação que estava pegando com base da do select.
- `transfer.yml`: adicionado chave `model: true` na propriedade `model-value`.
- `QasNestedFields`: Corrigido botão de excluir ao adicionar um novo item sem salvar ele não removia o item independente da prop useRemoveOnDestroy.

### Removido
- `QasAppMenu`: removido propriedade `brand-menu` pois não existe mais a logo "modular" no menu.

## [3.2.0-beta.3] - 19-10-2022
### Corrigido
- `QasAppBar`: adicionado classe `no-wrap` para não quebrar o menu de usuário.

## [3.2.0-beta.2] - 18-10-2022
## BREAKING CHANGES
- `QasAppMenu`: removido logo do modular no menu.
- `QasAppMenu`: agora os itens com children no item pai não tem redirecionamento, nem ícone, apenas os filhos dele.
- `quasar`: atualizado para 2.10.0.

### Modificado
- `QasAvatar`: forçando a sempre ser "redondo", removido propriedades `rounded` e `square`.
- `QasAppBar`: alterado estilos do componente.
- `fonts.scss`: alterado font `Inter` para `Nunito`.
- `item.scss`: alterado estilo padrão do `QItem`.
- `spacing.scss`: alterado espaçamento padrão do `lg` para `32px`.
- `QasAppMenu`: alterado estilos e comportamento do componente, entre eles o modo "mini".
- `quasar`: atualizado o quasar para a versão 2.10.0.
- `QasLayout`: modificado screen `untilMedium` para `untilLarge`.

### Removido
- `QasAppMenu`: removido propriedade `brand-menu` pois não existe mais a logo "modular" no menu.

## [3.2.0-beta.1] - 13-10-2022
### Adicionado
- Criado automatização de todo processo de publicação do asteroid.

## [3.2.0-beta.0] - 30-09-2022
### Adicionado
- `QasTreeGenerator`: adicionado novo componente para criação de árvore.
- `promiseHandler`: adicionado novo helper para lidar com promises.
- `destroyNestedChildrenByKey`: adicionado novo helper para lidar com remoção em campos nested.
- `findChildrenByKey`: adicionado novo helper para encontrar children através de chave e valor.
- `rules`: adicionado novo helper para lidar com validações de componentes, no momento existe apenas `required`.

### Corrigido
- `add-counter-suffix.md`: corrigido title da documentação.
- `filter-object.md`: corrigido title da documentação.
- `checkbox-group.md`: corrigido documentação que estava pegando com base da do select.
- `transfer.yml`: adicionado chave `model: true` na propriedade `model-value`.

## [3.1.1-beta.0] - 26-09-22
### Corrigido
- `QasNestedFields`: Corrigido botão de excluir ao adicionar um novo item sem salvar ele não removia o item independente da prop useRemoveOnDestroy.

## [3.1.0] - 19-09-22
### Adicionado
Adicionado suporte para Pinia/Vuex Seguindo os padrões da biblioteca `@bildvitta/store-adapter` e `@bildvitta/store-module`.
- `QasFormGenerator`: adicionado propriedade `disabled` para desativar todos os campos de uma vez.
- `QasNestedFields`: adicionado propriedade `disableRows`com esta propriedade é possível desabilitar rows (linhas) especificas passando um array com chaves identificadoras, ou caso queira desativar todas passando um boolean "true" (isto vai remover todos os botões da linha, duplicar e excluir).
- `QasNestedFields`: adicionado propriedade `useAdd` para controla quando vai ter seção de "adicionar" novas rows (linhas).
- `QasFilters`: adicionado data-cy no input, dropdown e botões
- `QasGridGenerator`: adicionado data-cy nos campos e resultados

### Modificado
- [`QasBox`, `QasListItems`, `QasCard`, `QasAppBar`]: alterado cor shadow padrão de `shadow-14` para `shadow-2`.
- `QasListItems`: alterado como usa shadow para resolver problema de borda que cortava o shadow, agora o componente usa o `QasBox` e removido prop `bordered`.

### Corrigido
- `QasActionsMenu`: Alterado propriedade `use-label-on-small-screen` para `:use-label-on-small-screen="false"` para seguir o padrão.
- `QasTabsGenerator`: Alterado type do `modelValue` para `[String, Number]` para aceitar numbers também.
- `QasTableGenerator`: Alterado `counters[key]` para `counters[tab.value]` para funcionar o counters quando utilizar tabs como `array`.
- `QasNestedFields`: Adicionado prop `deep: true` no watch no `modelValue` para resolver bug quando usa um custom slot, ou altera o v-model e perde a reatividade.

### Removido
- `shadow.scss`: Removido arquivo de sombras que alteravam cores para deixar estilo original do quasar.

## [3.1.0-beta.4] - 15-09-22
### Corrigido
- `QasNestedFields`: Adicionado prop `deep: true` no watch no `modelValue` para resolver bug quando usa um custom slot, ou altera o v-model e perde a reatividade.

## [3.1.0-beta.3] - 14-09-22
### Corrigido
- `QasActionsMenu`: Alterado propriedade `use-label-on-small-screen` para `:use-label-on-small-screen="false"` para seguir o padrão.
- `QasTabsGenerator`: Alterado type do `modelValue` para `[String, Number]` para aceitar numbers também.
- `QasTableGenerator`: Alterado `counters[key]` para `counters[tab.value]` para funcionar o counters quando utilizar tabs como `array`.

## [3.1.0-beta.2] - 06-09-22
### Modificado
- [`QasBox`, `QasListItems`, `QasCard`, `QasAppBar`]: alterado cor shadow padrão de `shadow-14` para `shadow-2`.
- `QasListItems`: alterado como usa shadow para resolver problema de borda que cortava o shadow, agora o componente usa o `QasBox` e removido prop `bordered`.

### Removido
- `shadow.scss`: Removido arquivo de sombras que alteravam cores para deixar estilo original do quasar.

## [3.1.0-beta.1] - 02-09-22
### Adicionado
- `QasFilters`: adicionado data-cy no input, dropdown e botões
- `QasGridGenerator`: adicionado data-cy nos campos e resultados

## [3.1.0-beta.0] - 02-09-22
### Adicionado
Adicionado suporte para Pinia/Vuex Seguindo os padrões da biblioteca `@bildvitta/store-adapter` e `@bildvitta/store-module`.
- `QasFormGenerator`: adicionado propriedade `disabled` para desativar todos os campos de uma vez.
- `QasNestedFields`: adicionado propriedade `disableRows`com esta propriedade é possível desabilitar rows (linhas) especificas passando um array com chaves identificadoras, ou caso queira desativar todas passando um boolean "true" (isto vai remover todos os botões da linha, duplicar e excluir).
- `QasNestedFields`: adicionado propriedade `useAdd` para controla quando vai ter seção de "adicionar" novas rows (linhas).

## 3.0.0 - 22-08-22
## Versão estável lançada

## [3.0.0-beta.20] - 16-08-2022
### Adicionado
- `QasUploader`: adicionada a prop: `useObjectModel` para poder utilizar o model padrão como um objeto.

### Modificado
- `QasSearchBox`: modificado watch `mx_search` para realizar o focus do input de pesquisa após retornar dados do lazy loading.
- [`QasDateTimeInput`, `QasField`, `QasInput`, `QasPasswordInput`]: modificado componente para não herdar todos os atributos. Para isso foi adicionado `inheritAttrs` com o valor `false`.
- `QasMap`: modificado height da classe `.qas-map__draw` para conter a propriedade `!important`.
- `QasFormGenerator`: modificado a computada `fieldsetClasses` para adicionar a classe gutter somente no eixo y.

### Corrigido
- `QasFormGenerator`: corrigido problema ao adicionar validação no `field` do `normalizedFields`  quando o valor é `undefined`.
- `QasDateTimeInput`: corrigido problema do `valueLength` quando o valor é `undefined` adicionando `optional chaining`.

### Removido
- `QasPasswordInput`: removido propriedade `color` com o valor `negative` por padrão.

## [3.0.0-beta.19] - 08-08-2022
## BREAKING CHANGES
- `QasFormView`: alterado parâmetro `params` para `externalPayload`, agora ele sobrescreve todo o payload do `fetchSingle` e não somente o `params`.
- `QasFormView`: alterado nome do método de `fetch` para `fetchSingle` para manter padrão dos outros componentes de `view`.

### Adicionado
- `filters`: adicionado novos tipos money e decimal na função `humanize`.
- `QasDialog`: adicionado nova propriedade `useValidationAllAtOnce` para validar todos os campos de uma única vez.
- `handleProcess`: Adicionado novo `helper` que lida com `process.env`.

### Modificado
- `QasTabsGenerator`: alterado `name` do `QTab` para `tab.value` ao invés de `key`.
- `QasTabsGenerator`: adicionado novo type `Array` na propriedade `tabs`.
- `QasLayout`: componente agora começa com menu lateral aberto a partir de telas maiores que "tablet", sem a necessidade de fazer este controla manual.
- `QasListView`: alterado execução do método `fetchList` para `mx_fetchHandler` dentro do `refresh`.
- `api.js`: alterado boot do `api` para validar quando intercepta o `axios` e fazer o `camelize`.

### Corrigido
- `QasNestedFields`: corrigido propriedade `useDestroyAlways`, não estava sendo removido a ultima linha (row) do nested, alterado onde o método `setDefaultNestedValue` é chamado.
- `QasNestedFields`: corrigido propriedade `useRemoveOnDestroy`, não estava funcionando quando valor era `false` por uma validação errada no método `destroy`.
- `QasField`: alterado atributo `gmt` para `useIso` para o componente `QasDateTimeInput`.
- [`QasDateTimeInput`, `QasInput`, `QasField`, `QasPasswordInput`]: removido div "pai" dos elementos deixando os próprios elementos sendo o "pai", resolvendo alguns problemas referentes ao `$attrs`.

### Removido
- `QasNestedFields`: removido `leaveActiveClass: 'animated slideOutUp'` animação na "volta" não funcionava e apenas dava um delay desnecessário e parecia que o componente estava lento.

## [3.0.0-beta.18] - 02-08-2022
### Adicionado
- `QasFormGenerator`: adicionado propriedade `fieldset` para agrupar elementos por rótulo (label).
- `QasFormGenerator`: adicionado propriedade `fieldsetGutter` para dar espaçamentos entre rótulos (label) com default `lg`.
- `QasUploader`: Adicionado o atributo `accept` para o `<input>` interno do componente.
- `QasSelect`: Adicionado o tipo `Boolean` para a propriedade `modelValue`.

### corrigido
- `generatorMixin`: alterado `validator` da propriedade `gutter` para quando ele é do tipo `Boolean`.
- `QasFormView`: Removido a utilização do `$nextTick` na atualização da model. Assim, corrigindo o problema de o evento `fetchSuccess` estar com a model desatualizada.
- `DocLayout`: Corrigido warning da propriedade `view` do componente `q-layout`.

### Removido
- `QasSelect`: Removido o atributo `bottomSlots` do componente, pois não é mais necessário.

## [3.0.0-beta.17] - 18-07-2022
### Adicionado
- [`QasSelect`, `QasSearchBox`]: adicionada props: `useLazyLoading`, `name`, `entity` e `useLazyLoadingProps` para adicionar funcionalidades do lazy loading semelhante a versão 2 do asteroid: https://github.com/bildvitta/asteroid/pull/573/files
- [`QasSelect`, `QasSearchBox`]: adicionada eventos: `@fetch-options-error`, `@fetch-options-success` e `@update:fetching` referentes ao lazy loading.
- `QasSearchBox`: adicionado slot loading referente ao lazy loading.
- `QasField`: repassando `entity`, `name` e `useLazyLoading` ao componente `QasSelect`.
- Adicionado novo helper `getNormalizedOptions`.
- Adicionado novo mixin `searchFilterMixin` para ser usado tanto no `QasSelect` quanto no `QasSearchBox`
- `QasSearchBox`: Adicionado propriedade `emptyResultText` com default `Não há resultados disponíveis.`.

### Corrigido
- `QasInput`: resolvido problema com mascara quando o model vinha `null`.
- `QasSelectList`: adicionado propriedade `deep: true` no watch do `modelValue` para resolver problemas de model.

## [3.0.0-beta.16] - 22-06-2022
## BREAKING CHANGES
- `QasListView`: antes o que era passado por parâmetro entrava como `filters`, agora é o payload todo, então se precisar passar um filters como anteriormente usar `fetchList({ filters: {...} })`.
- `QasSingleView`: antes o que era passado por parâmetro entrava como `params`, agora é o payload todo, então se precisar passar um params como anteriormente usar `fetchSingle({ params: {...} })`.

### Adicionado
- `QasListView`: adicionada prop `useResultsAreaOnly` para definir se o container de results quando o valor está vazio, irá sempre ser exibido.
- [`QasListView`, `QasFormView`, `QasSingleView`]: adicionada prop `beforeFetch`, onde dará a liberdade para controlar quando irá acontecer a primeira execução do `fetchList`.
- `viewMixin`: adicionado o método `mx_fetchHandler`, onde será o handler responsável por interceptar as funções de fetch das views.
- `viewMixin`: adicionado novo data `mx_cancelBeforeFetch` e novo callback `done` dentro do `beforeFetch`.

### Modificado
- [`QasListView`, `QasSingleView`]: modificado o nome do parâmetro, possibilitando que o payload passado externamente sobreponha qualquer valor caso precise.

## [3.0.0-beta.15] - 09-06-2022
### Adicionado
- `QasNestedFields`: adicionada prop `identifierItemKey` para definir a chave identificadora do objeto/linha.

### Modificado
- `QasNestedFields`: modificado o comportamento do método `destroy`, adicionando uma validação para caso não exista uma chave identificadora, ele remova a o objeto mesmo que `useRemoveOnDestroy` seja `false`.

- `QasNestedFields`: modificado o comportamento do método `add` para ação duplicar linha, removendo a chave identificadora na hora de duplicar a linha.

## [3.0.0-beta.14] - 07-06-2022
### Adicionado
- `QasFormView`: adicionado propriedade `beforeSubmit` para controlar o submit, ex: mostrar um modal de confirmação antes de fazer o submit do formulário.

### Modificado
- `QasFormView`: adicionado um handler `submitHandler` para o controle do submit junto a propriedade `beforeSubmit`.

### Corrigido
- `QasNestedFields`: adicionado método `setDefaultNestedValue` no watch do `modelValue` ao invés do `fields` para resolver problema quando modelValue é alterado para array vazio **após** o created. Ex: quando a API retorna array vazio, ele removia os campos default setados pelo `rowObject`.

## [3.0.0-beta.13] - 02-06-2022
### Adicionado
- Adicionado helper `camelizeFieldsName` para formatar os `names` dos fields em camelCase.

### Modificado
- `QasNestedFields`: removido logica do camelize na computada `children` já que agora os fields já vem formatados.
- `viewMixin`: `mx_setFields` usando helper `camelizeFieldsName` de forma recursiva para formatar os `names` dos `fields`.
- `QasFilters`: Adicionados props `color="grey-9"` e `flat` para os <qas-btn /> do input de busca para deixar o estilo igual quando era com <q-btn />.

## [3.0.0-beta.12] - 02-06-2022
### Modificado
- `QasPageHeader`: utilizando mixin `createMetaMixin` do quasar para utilizar `title`.
- `Logger`: alterado método `console.group` para `console.groupCollapsed` para que os grupos por padrão se mantenham fechados e abram após clicar.

### Corrigido
- `QasInput`: adicionado validação no método `toggleMask` para resolver problema de quando o campo já vinha com valor preenchido (depois do created) e a mascara fosse `document` ou `phone`.
- `QasInput`: adicionado novo evento `@paste` com o método `onPaste` para resolver problemas de formatação da mascara quando acontece `ctrl v`.

## [3.0.0-beta.11] - 01-06-2022
### Adicionado
- Adicionado novo plugin `Logger` que funcionam quando a variável de ambiente `DEBUGGING` é setada.
- [`QasDelete`, `QasFilters`, `QasFormView`, `QasListView`, `QasNestedFields`, `QasSingleView`, `QasSingleView`, `QasGridGenerator`, `QasTableGenerator`, `QasUploader`]: Adicionado loggers.

### Modificado
- [`QasFilters`, `QasSearchBox`]: Alterado componente `q-input` para o `qas-input`.

### Corrigido
- `QasDateTimeInput`: corrigido watch que estava `value` ao invés de `modelValue`, quando o valor não era setado no created, não funcionava.

## [3.0.0-beta.10] - 20-05-2022
## BREAKING CHANGES
- `QasBtn`: propriedade `hideLabelOnSmallScreen` alterada para `useLabelOnSmallScreen`, com valor default `true`.
- `QasAppBar`: propriedade `isAuth` removida, agora é validado caso exista valor na propriedade `user`.
- `QasActionsMenu`: evento `delete-success` removido, a propriedade `deleteProps` deve ser a única responsável por passar propriedades e eventos para o `QasDelete`.
- `QasCard`: propriedade `bgImagePosition` alterada para `imagePosition`.
- `QasCard`: propriedade `formMode` removida em favor das novas propriedades: `outlined` e `unelevated` para fazer o controle dos estilos.
- `QasDateTimeInput`: propriedade `gmt` alterada para `useIso`.
- `QasDateTimeInput`: propriedade `dateOnly` alterada para `useDateOnly`.
- `QasDateTimeInput`: propriedade `timeOnly` alterada para `useTimeOnly`.
- `QasDialog`: propriedade `useCloseIcon` alterada para `useCloseButton`.
- `QasFilters`: propriedade `forceRefetch` alterada para `useForceRefetch`.
- [`QasFormView`, `QasListView`, `QasSingleView`]: propriedade `dialog` do mixin `viewMixin` alterada para `useBoundary` com default `true`, uma vez que dialog é muito especifico para quando for usado dentro de um dialog, porém o mesmo comportamento pode se repetir fora de um dialog.
- `QasFormView`: propriedade `showDialogOnUnsavedChanges` alterada para `useDialogOnUnsavedChanges`.
- `QasGridGenerator`: propriedade `hideEmptyResult` alterada para `useEmptyResult`.
- `QasInput`: propriedade `removeErrorOnType` alterada para `useRemoveErrorOnType`.
- `QasListItems`: propriedades `redirectKey`, e `to` removidas em favor de utilizar o evento `click-item` para lidar quando clicado nos items ou dentro do button dos items.
- `QasListItems`: propriedade `useRedirectOnIcon` alterada para `useClickableItem` com default `false` para identificar que o item inteiro é clicável ao invés de somente o button.
- `QasListItems`: slot `item-section-left` alterado para `item-section`.
- `QasListView`: propriedade `disableRefresh` alterada para `useRefresh` com default `true`.
- `QasNumericInput`: propriedade `allowNegative` alterada para `useNegative`.
- `QasNumericInput`: propriedade `allowPositive` alterada para `usePositive`.
- `QasNumericInput`: propriedade `autonumericProps` alterada para `autonumericOptions`.
- `QasPasswordInput`: propriedade `hideStrengthChecker` alterada para `useStrengthChecker` com default `true`.
- `QasSelect`: propriedade `searchable` alterada para `useSearch`.
- `QasSelectList`: propriedades `to`, `redirectKey` e `paramKey` removidas em favor de usar o evento `click-label` para lidar quando clicar no label.
- `QasNestedFields`: propriedade `btnDestroyProps` alterada para `buttonDestroyProps`.
- `QasNestedFields`: propriedade `btnDuplicateProps` alterada para `buttonDuplicateProps`.

### Adicionado
- `QasCard`: propriedade `outlined` com default `false`.
- `QasCard`: propriedade `unelevated` com default `false`.
- `QasListItems`: propriedade `useClickableItem`.
- `QasListItems`: evento `click-item` adicionado para lidar quando clicado nos items ou dentro do button dos items.
- `QasSelectList`: propriedade `useClickableLabel` com default `false` para deixar label com `cursor-pointer` e habilitar evento `click-label`.
- `QasSelectList`: evento `click-label` para lidar quando clicar no label (evento só acontece caso a propriedade `useClickableLabel` for `true`).

### Modificado
- [`QasAppBar`, `QasFilters`, '`QasSignatureUploader`]: substituído `q-btn` por `qas-btn`.

## [3.0.0-beta.9] - 13-05-2022
## BREAKING CHANGES
- `QasFormView`: propriedade `readOnly` alterada para `useActions`.
- `QasFormView`: propriedade `cancelButton` alterada para `cancelButtonLabel`.
- `QasFormView`: propriedade `submitButton` alterada para `submitButtonLabel`.

### Adicionado
- `QasFormView`: propriedade `useCancelButton` adicionada para controlar se vai ter ou não botão de "cancelar".
- `QasFormView`: propriedade `useSubmitButton` adicionada para controlar se vai ter ou não botão de submit.

### Corrigindo
- `QasFormView`: corrigido bug de validações quando o usuário deixa a pagina.

## [3.0.0-beta.8] - 12-05-2022
### Adicionado
- Adicionado nova pagina de erro `Unauthorized.vue` para quando api retorna status code `401` no fetch.
- Adicionado `name` para as paginas de erros.

### Modificado
- `QasSearchBox`: modificado valor default da prop `fuseOptions` para `{ threshold: 0.1, ignoreLocation: true }`. 
- `QasSelect`: modificado valor default da prop `fuseOptions` para `{ threshold: 0.1, ignoreLocation: true, keys: ['label', 'value'] }`.

### Corrigido
- Adicionado redirect para status code `> 500` (antes já existia a pagina para isto, mas não era redirecionado).
- `QasTableGenerator`: corrigido bug `Uncaught TypeError: this.scrollOnGrab.destroyEvents is not a function`.

## [3.0.0-beta.7] - 10-05-2022
### Adicionado
- `QasNumericInput`: adicionado novo evento "update-model" para disparar toda vez que acontece um novo input.

### Modificado
- `QasListView`: adicionado propriedade `deep` para o watch do `resultsModel`.
- `QasPasswordInput`: modificado valor `bottom-slots` para `false`.
- `QasFilters`: adicionado `max-with="240px"` e `full-width` dentro do `QMenu`.

### Corrigido
- `QasListView`: corrigido bug de filtros ao fazer o `fetchList`.
- `QasTransfer`: corrigido bug quando v-model já existe valor antes de existir `options`.
- `QasNumericInput`: corrigido bug no two-way data binding.

## [3.0.0-beta.6] - 05-06-2022
### Modificado
- Propriedade `hideLabelOnSmallScreen` só funciona quando o "rotulo" do botão é passado via prop `label` e não mais por slot default também.

### Corrigido
- Corrigido `QasBtn`, quando usa a prop `hideLabelOnSmallScreen` e utiliza o slot default, quando a tela está em tamanho pequeno, o botão remove o slot default, o problema disto é que se usar com um `QMenu` dentro do botão, o `QMenu` não é chamado pois não existe mais slot default.

[3.0.0-beta.6]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.5...v3.0.0-beta.6?expand=1
[3.0.0-beta.7]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.6...v3.0.0-beta.7?expand=1
[3.0.0-beta.8]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.7...v3.0.0-beta.8?expand=1
[3.0.0-beta.9]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.8...v3.0.0-beta.9?expand=1
[3.0.0-beta.10]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.9...v3.0.0-beta.10?expand=1
[3.0.0-beta.11]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.10...v3.0.0-beta.11?expand=1
[3.0.0-beta.12]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.11...v3.0.0-beta.12?expand=1
[3.0.0-beta.13]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.12...v3.0.0-beta.13?expand=1
[3.0.0-beta.14]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.13...v3.0.0-beta.14?expand=1
[3.0.0-beta.15]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.14...v3.0.0-beta.15?expand=1
[3.0.0-beta.16]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.15...v3.0.0-beta.16?expand=1
[3.0.0-beta.17]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.16...v3.0.0-beta.17?expand=1
[3.0.0-beta.18]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.17...v3.0.0-beta.18?expand=1
[3.0.0-beta.19]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.18...v3.0.0-beta.19?expand=1
[3.0.0-beta.20]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.19...v3.0.0-beta.20?expand=1
[3.0.0]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.20...v3.0.0?expand=1
[3.1.0]: https://github.com/bildvitta/asteroid/compare/3.0.0...3.1.0?expand=1
[3.1.0-beta.0]: https://github.com/bildvitta/asteroid/compare/v3.0.0...3.1.0-beta.0?expand=1
[3.1.0-beta.1]: https://github.com/bildvitta/asteroid/compare/3.1.0-beta.0...3.1.0-beta.1?expand=1
[3.1.0-beta.2]: https://github.com/bildvitta/asteroid/compare/3.1.0-beta.1...3.1.0-beta.2?expand=1
[3.1.0-beta.3]: https://github.com/bildvitta/asteroid/compare/3.1.0-beta.2...3.1.0-beta.3?expand=1
[3.1.0-beta.4]: https://github.com/bildvitta/asteroid/compare/3.1.0-beta.3...3.1.0-beta.4?expand=1
[3.1.1-beta.0]: https://github.com/bildvitta/asteroid/compare/3.1.0...3.1.1-beta.0?expand=1
[3.2.0-beta.0]: https://github.com/bildvitta/asteroid/compare/3.1.1-beta.0...3.2.0-beta.0?expand=1
[3.2.0-beta.1]: https://github.com/bildvitta/asteroid/compare/v3.2.0-beta.0...v3.2.0-beta.1?expand=1
[3.2.0-beta.2]: https://github.com/bildvitta/asteroid/compare/v3.2.0-beta.1...v3.2.0-beta.2?expand=1
[3.2.0-beta.3]: https://github.com/bildvitta/asteroid/compare/v3.2.0-beta.2...v3.2.0-beta.3?expand=1
[3.2.0]: https://github.com/bildvitta/asteroid/compare/v3.1.0...v3.2.0?expand=1
[3.3.0-beta.0]: https://github.com/bildvitta/asteroid/compare/v3.2.0...v3.3.0-beta.0?expand=1
[3.3.0-beta.1]: https://github.com/bildvitta/asteroid/compare/v3.3.0-beta.0...v3.3.0-beta.1?expand=1
[3.3.0]: https://github.com/bildvitta/asteroid/compare/v3.2.0...v3.3.0?expand=1
[3.3.1-beta.0]: https://github.com/bildvitta/asteroid/compare/v3.3.0...v3.3.1-beta.0?expand=1
[3.4.0-beta.0]: https://github.com/bildvitta/asteroid/compare/v3.3.1-beta.0...v3.4.0-beta.0?expand=1
[3.4.0-beta.1]: https://github.com/bildvitta/asteroid/compare/v3.4.0-beta.0...v3.4.0-beta.1?expand=1
[3.4.0-beta.2]: https://github.com/bildvitta/asteroid/compare/v3.4.0-beta.1...v3.4.0-beta.2?expand=1
[3.4.0]: https://github.com/bildvitta/asteroid/compare/v3.3.0...v3.4.0?expand=1
[3.5.0-beta.0]: https://github.com/bildvitta/asteroid/compare/v3.4.0...v3.5.0-beta.0?expand=1
