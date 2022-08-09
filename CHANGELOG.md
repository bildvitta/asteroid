# Changelog
Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Para encontrar de uma forma mais detalhada todas as mudanças da `versão 2` para a `versão 3`, navegue até o arquivo `/docs/src/pages/start/upgrade-guide.md`.
Neste arquivo (CHANGELOG.MD) você encontrará somente as mudanças referentes a versão 3.

### Sobre os "BREAKING CHANGES"
Podemos ter pequenas breaking changes sem alterar o `major` version, apesar de serem pequenas, podem alterar o comportamento da funcionalidade caso não seja feita uma atualização, **preste muita atenção** nas breaking changes dentro das versões quando existirem.

## Não publicado
### Modificado
- `QasSearchBox`: modificado watch `mx_search` para realizar o focus do input de pesquisa após retornar dados do lazy loading.

## 3.0.0-beta.19 - 08-08-2022
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
- [`QasUploader`]: adicionada a prop: `useObjectModel` para poder utilizar como padrão o model como um objeto

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
- `QasFilters`: Adicionados props `color="grey-9"` e `flat` para os <qas-btn /> do input de busca para deixar o estilo igual quando era com <q-btn>.

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

[3.0.0-beta.18]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.17...v3.0.0-beta.18?expand=1
[3.0.0-beta.17]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.16...v3.0.0-beta.17?expand=1
[3.0.0-beta.16]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.15...v3.0.0-beta.16?expand=1
[3.0.0-beta.15]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.14...v3.0.0-beta.15?expand=1
[3.0.0-beta.14]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.13...v3.0.0-beta.14?expand=1
[3.0.0-beta.13]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.12...v3.0.0-beta.13?expand=1
[3.0.0-beta.12]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.11...v3.0.0-beta.12?expand=1
[3.0.0-beta.11]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.10...v3.0.0-beta.11?expand=1
[3.0.0-beta.10]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.9...v3.0.0-beta.10?expand=1
[3.0.0-beta.9]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.8...v3.0.0-beta.9?expand=1
[3.0.0-beta.8]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.7...v3.0.0-beta.8?expand=1
[3.0.0-beta.7]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.6...v3.0.0-beta.7?expand=1
[3.0.0-beta.6]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.5...v3.0.0-beta.6?expand=1
