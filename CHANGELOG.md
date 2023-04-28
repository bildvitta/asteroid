# Changelog
Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Para encontrar de uma forma mais detalhada todas as mudanças da `versão 2` para a `versão 3`, navegue até o arquivo `/docs/src/pages/start/upgrade-guide.md`.
Neste arquivo (CHANGELOG.MD) você encontrará somente as mudanças referentes a versão 3.

### Sobre os "BREAKING CHANGES"
Podemos ter pequenas breaking changes sem alterar o `major` version, apesar de serem pequenas, podem alterar o comportamento da funcionalidade caso não seja feita uma atualização, **preste muita atenção** nas breaking changes dentro das versões quando existirem.

## [Unreleased]
### Corrigido
- `QasFormView`: corrigido a validação das props `useCancelButton` e `useSubmitButton`.

## [3.9.0-beta.1] - 19-04-2023
## BREAKING CHANGES
- [`QasAppMenu`, `QasAppBar`]: removido propriedade `user` em favor da nova propriedade `appUserProps`.
- `QasAppBar`: removido escopo `user` do slot `user`, uma vez que já temos essa informação fora do componente.

### Adicionado
- `QasAppUser`: adicionado propriedade `currentCompany` para setar empresa atual vinculada.
- `QasAppUser`: adicionado propriedade `companiesOptions` para enviar opções de possíveis empresas para troca de vínculo.
- `QasAppUser`: adicionado recurso para troca de vínculo de empresa.
- [`QasAppMenu`, `QasAppBar`]: adicionado propriedade `appUserProps` para repassar todas props do `QasAppUser`.
- `QasListView`: adicionado nova propriedade `usePagination` para controlar paginação com default `true`.

### Removido
- [`QasAppMenu`, `QasAppBar`]: removido propriedade `user` em favor da nova propriedade `appUserProps`.
- `QasAppBar`: removido escopo `user` do slot `user`, uma vez que já temos essa informação fora do componente.

## [3.9.0-beta.0] - 14-04-2023
## BREAKING CHANGES
- `QasGallery`: removido slot `destroy` para dar lugar aos slots do `QasGalleryCard`, olhar documentação.
- `QasGallery`: breaking changes nos slots, verificar documentação.
- `QasActionsMenu` agora precisa passar a prop `useTooltip` para controle de tooltip.

### Adicionado
- `QasListView`: adicionado propriedade `useAutoRefetchOnDelete` para controlar se o componente vai fazer o fetch novamente quando acontecer algum delete compatível com a listagem.
- `QasGallery`: adicionado propriedade `galleryCardProps`.
- `QasGalleryCard`: adicionado novo slot `actions`.
- `QasActionsMenu`: adicionado propriedade `useTooltip` com default `false` para controle de tooltip.

### Modificado
- `QasGallery`: implementado componente `QasGalleryCard`.
- `QasGallery`: com a implementação do componente `QasGalleryCard`, a altura do card passou de `150px` para `180px`.
- `QasGallery`: componente repassa todos os slots do `QasGalleryCard` passando como escopo `image` e `index`.
- `QasGalleryCard`: mudanças de espaçamento e no `defaultActionsMenuProps`.
- `QasActionsMenu`: agora o tooltip precisa de controle por prop `useTooltip`.
- `copyToClipboard`: modificado helper, agora no notify aparece sempre uma mensagem genérica "Item copiado com sucesso." ao invés do texto copiado anteriormente (isto impacta diretamente no componente `QasCopy`).

### Removido
- `QasGallery`: removido slot `destroy` para dar lugar aos slots do `QasGalleryCard`, olhar documentação.

## [3.8.0] - 14-04-2023
## BREAKING CHANGES
- `QasAppMenu`: adicionado propriedade `miniBrand` sendo `required` para passar logo em modo "mini".
- `ui/src/mixins/view.js`: removido computada `mx_componentTag` uma vez que os componentes de view sempre renderizam uma `div`, caso esteja usando este mixin nos produtos, revisar e remover.
- `QasLayout`: removido propriedade `padding` do componente `QPage` já que a responsabilidade deste espaçamento deve ser da classe `container`, isto pode gerar alguma(s) breaking changes visuais.
- `ui/src/css/utils/container.scss`: modificado espaçamento do container em telas mobile, alterado para `40px` (20px para cada lado), isto pode gerar alguma(s) breaking changes visuais.
- `QasUploader`: mudanças significativas de layout e comportamento que podem ou não gerar quebras.
- `QasUploader`: removido propriedade `hint`.
- `QasSignatureUploader`: removido propriedades `readonly`, `uploadLabel` pois agora esse controle é feito pela propriedade `uploaderProps`.
- `QasNestedFields`: mudanças de model no componente, pode ter breaking changes, principalmente se utilizado a propriedade `:use-remove-on-destroy="false"`.

### Adicionado
- `QasBtn`: adicionado propriedade `useEllipsis`.
- `QasAppMenu`: adicionado propriedade `miniBrand` para passar logo em modo "mini".
- `QasBtnDropdown`: adicionado model `menu`.
- `ui/src/css/mixins/set-button.scss`: adicionado nova opção para adicionar `ellipsis`.
- `downloadFile`: adicionado novo helper para fazer download de arquivos.
- `docs/src/components/DocPrint.vue`: adicionado novo componente para **documentação** para adicionar imagens (prints) de exemplos.
- `QasGalleryCard`: novo componente adicionado para ser utilizado no QasUploader (futuramente no QasGallery também).
- `QasSignatureUploader`: adicionado nova propriedade `uploaderProps` para repassar as propriedades para o QasUploader.
- `QasFormView`: adicionado novo evento no `window` que dispara toda vez que o submit ocorre com sucesso chamado `submit-success`.
- `QasLabel`: adicionado propriedade `color` para controle da cor com default `grey-9`.
- `QasUploader`: adicionado novas propriedades: `addButtonFn`, `addButtonLabel`, `columns`, `dialogProps`, `error`, `fields`, `formGeneratorProps`, `galleryCardProps`, `gridGeneratorProps`, e `useDownload`
- `QasTableGenerator`: Adicionado propriedade `use-sticky-header` e `sticky-header-table-height` para manter o header da tabela fixo na rolagem do conteúdo.
- `scrollbar.scss`: Adicionado estilo padrão para o scrollbar.
- `QasFilters`: Adicionado slot `filter-button`.
- `QasFilters`: Adicionado documentação para o slot `right-side`.
- `QasFilters`: Adicionado propriedade `use-spacing` com o valor default `true` para habilitar ou não o espaçamento padrão do componente.
- `QasFilters`: Adicionado propriedade `use-update-route` com o valor default `true` para habilitar ou não a atualização da rota com base nos filtros.
- `QasFilters`: Adicionado evento `@update:currentFilters` que dispara sempre que é realizada alguma atualização no filtro.

### Modificado
- `QasFilters`: Modificado comportamento para após filtrar ou limpar o filtro realizar o fechamento do menu de filtros.
- atualizado quasar e package-lock geral do asteroid.
- `QasAppMenu`: modificado layout e comportamento para se adequar ao DS.
- `QasBtn`: agora é possível utilizar a propriedade `align` do `QBtn` do quasar.
- `QasAppMenu`: removido `required` da propriedade `title`.
- `QasAppMenu`: adicionado `required` na propriedade `brand`.
- `ui/src/css/utils/container.scss`: modificado espaçamento do container em telas mobile, alterado para `40px` (20px para cada lado), isto pode gerar alguma(s) breaking changes visuais.
- `QasLayout`: modificado propriedade `view` para se adequar ao novo layout.
- `QasLayout`: removido propriedade `padding` do componente `QPage` já que a responsabilidade deste espaçamento deve ser da classe `container`, isto pode gerar alguma(s) breaking changes visuais.
- `QasSignatureUploader`: atualizações para se adequar as mudanças do QasUploader.
- [`QasSignatureUploader`, `QasUploader`]: adicionado ordem alfabética em métodos / data / props.
- `QasField`: atualizações para se adequar as mudanças do QasSignatureUploader.
- `QasGridGenerator`: removido logger.
- `QasUploader`: mudanças de layout e comportamento.

### Corrigido
- `QasAppMenu`: Corrigido separator que não estava aparecendo de uma forma correta, adicionado pelo componente `QSeparator` ao invés de css.
- [`QasFormView`, `QasListView`, `QasSingleView`]: removido mixin que controlava se a tag vai seria uma `div` ou um `QPage`, uma vez que o `QasLayout` já engloba um `QPage` não deveria existir QPage dentro de QPage, já que ele gera tag main dentro de main.
- `QasNestedFields`: corrigido model do componente para quando a prop `useRemoveOnDestroy` for `false` e `useIndexLabel` for `true`.
- `QasNestedFields`: corrigido disposição da label quando existe a prop `useSingleLabel`, estava alinhada a esquerda quando deveria ser aliado a direita.
- `QasNestedFields`: corrigido model do componente para quando a prop `useRemoveOnDestroy` for false.
- `docs/src/pages/helpers/filters.md`: corrigido doc.
- `QasFilters`: corrigido problema onde não era possível ter o botão de filtro sem o campo de busca.
- `QasPagination`: corrigido problema com propriedade `max-content` que quebrava no `safari`.
- `searchFilterMixin`: corrigido problema ao emitir o evento `update:modelValue` para campos de select múltiplos ao alterar a propriedade `lazyLoadingProps`.

### Removido
- `ui/src/mixins/view.js`: removido computada `mx_componentTag` uma vez que os componentes de view sempre renderizam uma `div`.
- `QasSignatureUploader`: removido propriedades `readonly`, `uploadLabel` pois agora esse controle é feito pela propriedade `uploaderProps`.
- `QasUploader`: removido propriedade `hint`.

## [3.8.0-beta.7] - 11-04-2023
### Corrigido
- `QasAppMenu`: Corrigido separator que não estava aparecendo de uma forma correta, adicionado pelo componente `QSeparator` ao invés de css.

## [3.8.0-beta.6] - 10-04-2023
### Modificado
- `QasFilters`: Modificado comportamento para após filtrar ou limpar o filtro realizar o fechamento do menu de filtros.

## [3.8.0-beta.5] - 10-04-2023
### Modificado
- atualizado quasar e package-lock geral do asteroid.

## [3.8.0-beta.4] - 05-04-2023
## BREAKING CHANGES
- `QasAppMenu`: adicionado propriedade `miniBrand` sendo `required` para passar logo em modo "mini".
- `ui/src/mixins/view.js`: removido computada `mx_componentTag` uma vez que os componentes de view sempre renderizam uma `div`, caso esteja usando este mixin nos produtos, revisar e remover.
- `QasLayout`: removido propriedade `padding` do componente `QPage` já que a responsabilidade deste espaçamento deve ser da classe `container`, isto pode gerar alguma(s) breaking changes visuais.
- `ui/src/css/utils/container.scss`: modificado espaçamento do container em telas mobile, alterado para `40px` (20px para cada lado), isto pode gerar alguma(s) breaking changes visuais.

### Adicionado
- `QasBtn`: adicionado propriedade `useEllipsis`.
- `QasAppMenu`: adicionado propriedade `miniBrand` para passar logo em modo "mini".
- `QasBtnDropdown`: adicionado model `menu`.
- `ui/src/css/mixins/set-button.scss`: adicionado nova opção para adicionar `ellipsis`.

### Corrigido
- [`QasFormView`, `QasListView`, `QasSingleView`]: removido mixin que controlava se a tag vai seria uma `div` ou um `QPage`, uma vez que o `QasLayout` já engloba um `QPage` não deveria existir QPage dentro de QPage, já que ele gera tag main dentro de main.

### Modificado
- `QasAppMenu`: modificado layout e comportamento para se adequar ao DS.
- `QasBtn`: agora é possível utilizar a propriedade `align` do `QBtn` do quasar.
- `QasAppMenu`: removido `required` da propriedade `title`.
- `QasAppMenu`: adicionado `required` na propriedade `brand`.
- `ui/src/css/utils/container.scss`: modificado espaçamento do container em telas mobile, alterado para `40px` (20px para cada lado), isto pode gerar alguma(s) breaking changes visuais.
- `QasLayout`: modificado propriedade `view` para se adequar ao novo layout.
- `QasLayout`: removido propriedade `padding` do componente `QPage` já que a responsabilidade deste espaçamento deve ser da classe `container`, isto pode gerar alguma(s) breaking changes visuais.

### Removido
- `ui/src/mixins/view.js`: removido computada `mx_componentTag` uma vez que os componentes de view sempre renderizam uma `div`.

## [3.8.0-beta.3] - 04-04-2023
### Corrigido
- `QasNestedFields`: corrigido model do componente para quando a prop `useRemoveOnDestroy` for `false` e `useIndexLabel` for `true`.

## [3.8.0-beta.2] - 31-03-2023
## BREAKING CHANGES
- `QasUploader`: mudanças significativas de layout e comportamento que podem ou não gerar quebras.
- `QasUploader`: removido propriedade `hint`.
- `QasSignatureUploader`: removido propriedades `readonly`, `uploadLabel` pois agora esse controle é feito pela propriedade `uploaderProps`.
- `QasNestedFields`: mudanças de model no componente, pode ter breaking changes, principalmente se utilizado a propriedade `:use-remove-on-destroy="false"`.

### Adicionado
- `downloadFile`: adicionado novo helper para fazer download de arquivos.
- `docs/src/components/DocPrint.vue`: adicionado novo componente para **documentação** para adicionar imagens (prints) de exemplos.
- `QasGalleryCard`: novo componente adicionado para ser utilizado no QasUploader (futuramente no QasGallery também).
- `QasSignatureUploader`: adicionado nova propriedade `uploaderProps` para repassar as propriedades para o QasUploader.
- `QasFormView`: adicionado novo evento no `window` que dispara toda vez que o submit ocorre com sucesso chamado `submit-success`.
- `QasLabel`: adicionado propriedade `color` para controle da cor com default `grey-9`.
- `QasUploader`: adicionado novas propriedades: `addButtonFn`, `addButtonLabel`, `columns`, `dialogProps`, `error`, `fields`, `formGeneratorProps`, `galleryCardProps`, `gridGeneratorProps`, e `useDownload`
- `QasTableGenerator`: Adicionado propriedade `use-sticky-header` e `sticky-header-table-height` para manter o header da tabela fixo na rolagem do conteúdo.
- `scrollbar.scss`: Adicionado estilo padrão para o scrollbar.
- `QasFilters`: Adicionado slot `filter-button`.
- `QasFilters`: Adicionado documentação para o slot `right-side`.
- `QasFilters`: Adicionado propriedade `use-spacing` com o valor default `true` para habilitar ou não o espaçamento padrão do componente.
- `QasFilters`: Adicionado propriedade `use-update-route` com o valor default `true` para habilitar ou não a atualização da rota com base nos filtros.
- `QasFilters`: Adicionado evento `@update:currentFilters` que dispara sempre que é realizada alguma atualização no filtro.

### Modificado
- `QasSignatureUploader`: atualizações para se adequar as mudanças do QasUploader.
- [`QasSignatureUploader`, `QasUploader`]: adicionado ordem alfabética em métodos / data / props.
- `QasField`: atualizações para se adequar as mudanças do QasSignatureUploader.
- `QasGridGenerator`: removido logger.
- `QasUploader`: mudanças de layout e comportamento.

### Corrigido
- `QasNestedFields`: corrigido disposição da label quando existe a prop `useSingleLabel`, estava alinhada a esquerda quando deveria ser aliado a direita.
- `QasNestedFields`: corrigido model do componente para quando a prop `useRemoveOnDestroy` for false.
- `docs/src/pages/helpers/filters.md`: corrigido doc.
- `QasFilters`: corrigido problema onde não era possível ter o botão de filtro sem o campo de busca.

### Removido
- `QasSignatureUploader`: removido propriedades `readonly`, `uploadLabel` pois agora esse controle é feito pela propriedade `uploaderProps`.
- `QasUploader`: removido propriedade `hint`.

## [3.8.0-beta.1] - 30-03-2023
### Corrigido
- `QasPagination`: corrigido problema com propriedade `max-content` que quebrava no `safari`.

## [3.8.0-beta.0] - 21-03-2023
### Corrigido
- `searchFilterMixin`: corrigido problema ao emitir o evento `update:modelValue` para campos de select múltiplos ao alterar a propriedade `lazyLoadingProps`.

## [3.7.0] - 20-03-2023
## BREAKING CHANGES
- `QasPasswordInput`: removido propriedade `iconColor` uma vez que não deve ser possível mudar a cor do ícone.
- `QasPasswordStrengthChecker`: removido model `modelValue` pois não estava sendo repassado para o `QasPasswordInput`.
- `QasActionsMenu`: removido propriedades [`useLabelOnSmallScreen`, `color`, `icon`] pois agora é possível passar as propriedades para o `buttonProps` e `dropdownIcon`.
- `QasActionsMenu`: como agora o componente não faz mais uso do `QasDelete`, mas sim do `Delete.js` muda um pouco a utilização, checar documentação.
- `QasNumericInput`: modificado o valor padrão da propriedade `use-negative` para `false`. Anteriormente por padrão era possível inserir valores negativos, porém com essa modificação será necessário passar a propriedade `use-negative` como `true` para ter o mesmo comportamento anterior.

### Adicionado
- [`QasPasswordInput`, `QasPasswordStrengthChecker`]: model `currentLevel` que retorna o level atual.
- `QasTableGenerator`: Adicionado prop `row-route-fn` caso queira que ao clicar em uma linha, vá para outra rota.
- `QasTableGenerator`: Adicionado prop `use-external-link` que é usado em conjunto com a prop `row-function-fn` quando há a necessidade da rota ser um link externo.
- `QasActionsMenu`: adicionado propriedade `splitName` que habilita o useSplit no QBtnDropdown internamente separando 2 ações no componente por uma barra.
-`Delete.js`: adicionado novo plugin para dar a possibilidade de utilização de deleção de items sem ser pelo uso do componente `QasDelete`, com isto é possível utilizar fora de componentes `vue`.
- `QasBtnDropdown`: adicionado novo componente semelhante ao QBtnDropdown, porém nossas regras, e estilos.
- `QasActionsMenu`: adicionado propriedade `dropdownIcon` para ser repassado para o `QasBtnDropdown`.
- `QasActionsMenu`: adicionado propriedade `buttonProps` para ser repassado para o `QasBtn` e `QasBtnDropdown` (dependendo da quantidade de itens dentro da prop `list`).
- `QasActionsMenu`: adicionado propriedade `splitName` que habilita o `useSplit` do `QasBtnDropdown` e também é responsável por sinalizar qual item da lista será o botão a esquerda do QasBtnDropdown.
- `QasBtn`: adicionadas propriedades [`icon`, `iconRight`], antes essas props vinha através do `$attrs`, porém por logica interna foi necessário fixar elas no componente.
- `ui/src/css/variables/separator.scss`: modificado cores do QSeparator.
- [`app-extension/src/boot/loading.js`, `ui/src/css/plugins/loading.scss`]: adicionado novos arquivos para mudar o estilo do Loading.

### Modificado
- `QasPasswordInput`: Corrigido `QIcon` que foi substituído para um `QasBtn`.
- `QasActionsMenu`: modificado componente para utilizar nativamente o `QBtnDropdown`ao invés de fazer a logica manual com `QMenu`.
- `/ui/src/css/components/button.scss`: adicionado propriedade `box-shadow: none` para zerar o shadow em todos os casos.
- `QasDelete`: reimplementado componente para fazer utilização do plugin `Delete.js`.
- `QasActionsMenu`: refatorado código para troca no `QasDelete` pelo `Delete.js`.
- `QasActionsMenu`: refatorado código para utilização do `QasBtnDropdown`.
- `QasActionsMenu`: mudanças de comportamento.
- `QasNestedFields`: repassando todas propriedades do `QasActionsMenu` e não somente o `list`.
- `QasNumericInput`: modificado o valor padrão da propriedade `use-negative` para `false`.
- `QasDialog`: modificado a forma de repassar as props para o `QasActions`, para que sobrescreva os valores defaults.
- `QasActions`: modificado a lógica de inverter os botões a partir do momento que for passada a prop `useFullWidth`.
- `Loading` adicionado estilos default para o Loading do `quasar`.

### Removido
- `QasPasswordInput`: removido propriedade `iconColor` uma vez que não deve ser possível mudar a cor do ícone.
- `QasPasswordStrengthChecker`: removido model `modelValue` pois não estava sendo repassado para o `QasPasswordInput`.
- `QasActionsMenu`: removido propriedades [`useLabelOnSmallScreen`, `color`, `icon`] pois agora é possível passar as propriedades para o `buttonProps` e `dropdownIcon`.

### Corrigido
- `QasPasswordInput`: Corrigido slot do hint que texto ficava em cima de conteúdos abaixo do input.
- `QasInput`: corrigido `errorMessage` que não deveria ser resetado ao usar a propriedade `use-remove-error-on-type`.
- [`loading.js`, `loading.scss`]: adicionado custom class `qas-loading` para só estilizar o loading quando existir esta classe.

## [3.7.0-beta.3] - 09-03-2023
## BREAKING CHANGES
- `QasPasswordInput`: removido propriedade `iconColor` uma vez que não deve ser possível mudar a cor do ícone.
- `QasPasswordStrengthChecker`: removido model `modelValue` pois não estava sendo repassado para o `QasPasswordInput`.

### Adicionado
- [`QasPasswordInput`, `QasPasswordStrengthChecker`]: model `currentLevel` que retorna o level atual.

### Modificado
- `QasPasswordInput`: Corrigido `QIcon` que foi substituído para um `QasBtn`.

### Corrigido
- `QasPasswordInput`: Corrigido slot do hint que texto ficava em cima de conteúdos abaixo do input.
- `QasInput`: corrigido `errorMessage` que não deveria ser resetado ao usar a propriedade `use-remove-error-on-type`.

### Removido
- `QasPasswordInput`: removido propriedade `iconColor` uma vez que não deve ser possível mudar a cor do ícone.
- `QasPasswordStrengthChecker`: removido model `modelValue` pois não estava sendo repassado para o `QasPasswordInput`.

## [3.7.0-beta.2] - 06-03-2023
## BREAKING CHANGES
- `QasActionsMenu`: removido propriedades [`useLabelOnSmallScreen`, `color`, `icon`] pois agora é possível passar as propriedades para o `buttonProps` e `dropdownIcon`.
- `QasActionsMenu`: como agora o componente não faz mais uso do `QasDelete`, mas sim do `Delete.js` muda um pouco a utilização, checar documentação.
- `QasNumericInput`: modificado o valor padrão da propriedade `use-negative` para `false`. Anteriormente por padrão era possível inserir valores negativos, porém com essa modificação será necessário passar a propriedade `use-negative` como `true` para ter o mesmo comportamento anterior.

### Adicionado
- `QasTableGenerator`: Adicionado prop `row-route-fn` caso queira que ao clicar em uma linha, vá para outra rota.
- `QasTableGenerator`: Adicionado prop `use-external-link` que é usado em conjunto com a prop `row-function-fn` quando há a necessidade da rota ser um link externo.
- `QasActionsMenu`: adicionado propriedade `splitName` que habilita o useSplit no QBtnDropdown internamente separando 2 ações no componente por uma barra.
-`Delete.js`: adicionado novo plugin para dar a possibilidade de utilização de deleção de items sem ser pelo uso do componente `QasDelete`, com isto é possível utilizar fora de componentes `vue`.
- `QasBtnDropdown`: adicionado novo componente semelhante ao QBtnDropdown, porém nossas regras, e estilos.
- `QasActionsMenu`: adicionado propriedade `dropdownIcon` para ser repassado para o `QasBtnDropdown`.
- `QasActionsMenu`: adicionado propriedade `buttonProps` para ser repassado para o `QasBtn` e `QasBtnDropdown` (dependendo da quantidade de itens dentro da prop `list`).
- `QasActionsMenu`: adicionado propriedade `splitName` que habilita o `useSplit` do `QasBtnDropdown` e também é responsável por sinalizar qual item da lista será o botão a esquerda do QasBtnDropdown.
- `QasBtn`: adicionadas propriedades [`icon`, `iconRight`], antes essas props vinha através do `$attrs`, porém por logica interna foi necessário fixar elas no componente.
- `ui/src/css/variables/separator.scss`: modificado cores do QSeparator.

### Modificado
- `QasActionsMenu`: modificado componente para utilizar nativamente o `QBtnDropdown`ao invés de fazer a logica manual com `QMenu`.
- `/ui/src/css/components/button.scss`: adicionado propriedade `box-shadow: none` para zerar o shadow em todos os casos.
- `QasDelete`: reimplementado componente para fazer utilização do plugin `Delete.js`.
- `QasActionsMenu`: refatorado código para troca no `QasDelete` pelo `Delete.js`.
- `QasActionsMenu`: refatorado código para utilização do `QasBtnDropdown`.
- `QasActionsMenu`: mudanças de comportamento.
- `QasNestedFields`: repassando todas propriedades do `QasActionsMenu` e não somente o `list`.
- `QasNumericInput`: modificado o valor padrão da propriedade `use-negative` para `false`.
- `QasDialog`: modificado a forma de repassar as props para o `QasActions`, para que sobrescreva os valores defaults.
- `QasActions`: modificado a lógica de inverter os botões a partir do momento que for passada a prop `useFullWidth`.

### Removido
- `QasActionsMenu`: removido propriedades [`useLabelOnSmallScreen`, `color`, `icon`] pois agora é possível passar as propriedades para o `buttonProps` e `dropdownIcon`.

## [3.7.0-beta.1] - 23-02-2023
### Corrigido
- [`loading.js`, `loading.scss`]: adicionado custom class `qas-loading` para só estilizar o loading quando existir esta classe.

## [3.7.0-beta.0] - 14-02-2023
### Adicionado
- [`app-extension/src/boot/loading.js`, `ui/src/css/plugins/loading.scss`]: adicionado novos arquivos para mudar o estilo do Loading.

### Modificado
- `Loading` adicionado estilos default para o Loading do `quasar`.

## [3.6.0] - 14-02-2023
## BREAKING CHANGES
- `QasBtn`: componente passou por muitas mudanças, é preciso repassar em **TODOS** os lugares que utilizam ele e rever as propriedades adicionando o comportamento / estilo correto.
- `QasCopy`: removido propriedade `size` uma vez que não é mais repassado pro `QasBtn`.
- `QasListItems`: removido propriedade `iconProps` para ser passado somente o nome ícone.
- `QasBtn`: não é repassado mais algumas propriedades para o quasar, elas são: [align, dense, fab, fabMini, flat, glossy, noWrap, outline, padding, push, ripple, round, size, square, stack, stretch, textColor, unelevated].
- `QasDelete`: fixado cor `grey-9` quando for tag `qas-btn`.

### Adicionado
- `QasBadge` adicionado novo componente wrapper do quasar para badges.
- `QasStatus`: adicionado componente circular de status.
- `typography.md`: adicionado documentação para classes de tipografia.
- `QasListItems`: adicionado nova propriedade `icon` para repassar o nome do ícone.
- `QasBtn`: adicionado propriedade `useHoverOnWhiteColor` para remover cor de hover quando a cor for `white` e variant `tertiary`, para resolver problemas de contrast em alguns casos específicos.
- `QasBtn`: adicionado propriedade `variant` para escolher comportamento / design do botão, sendo 3 possibilidades: `primary`, `secondary` e `tertiary` (default).
- `QasBtn`: adicionado no componente a propriedade `color` com 3 possibilidades: `primary`, `grey-9` e `white`, porem esta propriedade só funciona quando a variante for `tertiary`.
- `ui/src/css/components/button.scss`: adicionado classe `button.scss` para modificar o QasBtn, foi criado uma classe ao invés de modificar no componente para ser possível alterar o estilo do botão quando não for utilizado o QasBtn.
- `ui/src/css/mixins/set-button.scss`: adicionado novo mixin para forçar `QBtn` internos a terem mesmos estilos do `QasBtn`.
- `spacing.md`: adicionado documentação para espaçamentos.
- [`Forbidden`, `NotFound`, `ServerError`]: adicionado documentação das páginas de erros.

### Modificado
- `ui/src/index.scss`: modificado `--qas-generic-border-radius` para `4px`.
- `QasTabsGenerator`: utilizando `QasStatus` no lugar do `PvTabsGeneratorStatus`.
- [`QasSelect`, `QasSearchBox`]: removido `threshold: 0.1`, deixando o default do `fuse.js` (0.6), assim a busca fica menos precisa e mais fácil de filtrar o que deseja.
- `typography.scss`: alterado line-height fixo de `1.5rem` para o mesmo de cada `font-size`.
- `QasDelete`: fixado cor `grey-9` quando a prop `tag` for `qas-btn`.
- `QasActionsMenu`: recebendo propriedade `color` dentro dos itens do `list`, que sobrepõe a propriedade `color`, porém só é usado quando existe apenas um único item na lista.
- `QasBtn`: mudanças de design system, tanto de comportamento quando design.
- `QasBtn`: melhorado documentação.
- `QasActions.vue`: alterado espaçamento `top`.
- `QasBadge`: adicionado tamanho mínimo de `24px` para respeitar layout.
- `QasFormView`: modificado actions para usar `QasActions`.
- `QasListView`: modificado espaçamento usado na paginação.
- `QasPagination`: mudanças de responsividade.
- `QasSearchBox`: mudanças de estilo no ícone de input para ficar semelhante ao `QasSelect` quando tem busca.
- `ui/src/css/variables/button.scss`: modificado valores.
- [`ErrorComponent`, `Forbidden`, `Unauthorized`, `ServerError`]: modificado layout.
- `QasSelectList`: removido label dos botões de "Adicionar" e "Remover" para existir apenas ícones.
- `spacing.scss`: adicionado 2 novos tokens: `2xl` e `3xl`.
- modificações referentes as mudanças do `QasBtn`: [QasActionsMenu, QasAlert, QasAppBar, QasAppMenu, QasCard, QasCopy, QasDateTimeInput, QasDelete, QasDialog, QasFilters, QasFormView, QasGallery, PvGalleryCarouselDialog, QasListItems, QasNestedFields, QasPagination, QasSelectList, QasSignaturePad, QasSignatureUploader, QasTransfer, QasTreeGenerator, QasUploader, ErrorComponent].
- [`NotifyError`, `NotifySuccess`]: adicionado flag para diferenciar notifies de erro e sucesso.
- `QasFormView`: alterado mensagem de erro de "Existem campos no formulário que ainda não foram preenchidos. Complete todas as informações para avançar." para "Não conseguimos salvar as informações. Por favor, revise os campos e tente novamente."
- [`/`, `/docs`, `/ui`, `app-extension`]: atualizadas bibliotecas do quasar, @quasar/extras, @quasar/app-webpack, store-adapter e vue.

### Corrigido
- `QasTextTruncate`: corrigido bug quando o texto tinha como valor inicial `undefined`.
- `QasFilters`: corrigido model search que vinha vazio mesmo estando na URL quando usado propriedade `:use-filter-button="false"`.
- `QasFilters`: corrigido problema de style sendo aplicado a demais componentes com a classe `q-field` quando usado dentro do slot do QasFilters.
- `QasDateTimeInput`: corrigido ícone `q-icon` para `QasBtn` com ícone, já que existe uma ação.
- `QasDateTimeInput`: corrigido problema quando o input era `readonly` e isto não repassado para os ícones de date e time.
- `QasDialog`: corrigido espaçamento do `QasActions`.
- `QasTextTruncate`: corrigido texto de descrição quando vem por slot.
- `vue-plugin.js`: adicionado plugin de `Loading` para corrigir problema de variável global interna causado pela atualizações do quasar.
- `QasWelcome`: corrigido problema de data.
- `ErrorComponent`: adicionado prefixo `sym_r_`.

### Removido
- `PvTabsGeneratorStatus`: removido componente privado em favor do componente publico `QasStatus`.
- `text.md`: removido aquivo para ser unificado no `typography.md`.
- `QasCopy`: removido propriedade `size` uma vez que não é mais repassado pro `QasBtn`.
- `QasListItems`: removido propriedade `iconProps` para ser passado somente o nome ícone.
- `QasBtn`: não é repassado mais algumas propriedades para o quasar, elas são: [align, dense, fab, fabMini, flat, glossy, noWrap, outline, padding, push, ripple, round, size, square, stack, stretch, textColor, unelevated].
- `QasDelete`: fixado cor `grey-9` quando for tag `qas-btn`.
- `ui/src/asset/gear.svg`: removido ilustração.
- `Unauthorized`: removido uso da pagina de 401 já que ele nunca cai nela, o fluxo sempre leva para refazer login ou dar refresh no token.

## [3.6.0-beta.2] - 06-02-2023
### Modificado
- [`/`, `/docs`, `/ui`, `app-extension`]: atualizadas bibliotecas do quasar, @quasar/extras, @quasar/app-webpack, store-adapter e vue.

### Corrigido
- `vue-plugin.js`: adicionado plugin de `Loading` para corrigir problema de variável global interna causado pela atualizações do quasar.
- `QasWelcome`: corrigido problema de data.
- `ErrorComponent`: adicionado prefixo `sym_r_`.

## [3.6.0-beta.1] - 06-02-2023
## BREAKING CHANGES
- `QasBtn`: componente passou por muitas mudanças, é preciso repassar em **TODOS** os lugares que utilizam ele e rever as propriedades adicionando o comportamento / estilo correto.
- `QasCopy`: removido propriedade `size` uma vez que não é mais repassado pro `QasBtn`.
- `QasListItems`: removido propriedade `iconProps` para ser passado somente o nome ícone.
- `QasBtn`: não é repassado mais algumas propriedades para o quasar, elas são: [align, dense, fab, fabMini, flat, glossy, noWrap, outline, padding, push, ripple, round, size, square, stack, stretch, textColor, unelevated].
- `QasDelete`: fixado cor `grey-9` quando for tag `qas-btn`.

### Adicionado
- `QasListItems`: adicionado nova propriedade `icon` para repassar o nome do ícone.
- `QasBtn`: adicionado propriedade `useHoverOnWhiteColor` para remover cor de hover quando a cor for `white` e variant `tertiary`, para resolver problemas de contrast em alguns casos específicos.
- `QasBtn`: adicionado propriedade `variant` para escolher comportamento / design do botão, sendo 3 possibilidades: `primary`, `secondary` e `tertiary` (default).
- `QasBtn`: adicionado no componente a propriedade `color` com 3 possibilidades: `primary`, `grey-9` e `white`, porem esta propriedade só funciona quando a variante for `tertiary`.
- `ui/src/css/components/button.scss`: adicionado classe `button.scss` para modificar o QasBtn, foi criado uma classe ao invés de modificar no componente para ser possível alterar o estilo do botão quando não for utilizado o QasBtn.
- `ui/src/css/mixins/set-button.scss`: adicionado novo mixin para forçar `QBtn` internos a terem mesmos estilos do `QasBtn`.
- `spacing.md`: adicionado documentação para espaçamentos.
- [`Forbidden`, `NotFound`, `ServerError`]: adicionado documentação das páginas de erros.

### Modificado
- `QasDelete`: fixado cor `grey-9` quando a prop `tag` for `qas-btn`.
- `QasActionsMenu`: recebendo propriedade `color` dentro dos itens do `list`, que sobrepõe a propriedade `color`, porém só é usado quando existe apenas um único item na lista.
- `QasBtn`: mudanças de design system, tanto de comportamento quando design.
- `QasBtn`: melhorado documentação.
- `QasActions.vue`: alterado espaçamento `top`.
- `QasBadge`: adicionado tamanho mínimo de `24px` para respeitar layout.
- `QasFormView`: modificado actions para usar `QasActions`.
- `QasListView`: modificado espaçamento usado na paginação.
- `QasPagination`: mudanças de responsividade.
- `QasSearchBox`: mudanças de estilo no ícone de input para ficar semelhante ao `QasSelect` quando tem busca.
- `ui/src/css/variables/button.scss`: modificado valores.
- [`ErrorComponent`, `Forbidden`, `Unauthorized`, `ServerError`]: modificado layout.
- `QasSelectList`: removido label dos botões de "Adicionar" e "Remover" para existir apenas ícones.
- `spacing.scss`: adicionado 2 novos tokens: `2xl` e `3xl`.
- modificações referentes as mudanças do `QasBtn`: [QasActionsMenu, QasAlert, QasAppBar, QasAppMenu, QasCard, QasCopy, QasDateTimeInput, QasDelete, QasDialog, QasFilters, QasFormView, QasGallery, PvGalleryCarouselDialog, QasListItems, QasNestedFields, QasPagination, QasSelectList, QasSignaturePad, QasSignatureUploader, QasTransfer, QasTreeGenerator, QasUploader, ErrorComponent].
- [`NotifyError`, `NotifySuccess`]: adicionado flag para diferenciar notifies de erro e sucesso.
- `QasFormView`: alterado mensagem de erro de "Existem campos no formulário que ainda não foram preenchidos. Complete todas as informações para avançar." para "Não conseguimos salvar as informações. Por favor, revise os campos e tente novamente."

### Corrigido
- `QasDialog`: corrigido espaçamento do `QasActions`.
- `QasTextTruncate`: corrigido texto de descrição quando vem por slot.

### Removido
- `QasCopy`: removido propriedade `size` uma vez que não é mais repassado pro `QasBtn`.
- `QasListItems`: removido propriedade `iconProps` para ser passado somente o nome ícone.
- `QasBtn`: não é repassado mais algumas propriedades para o quasar, elas são: [align, dense, fab, fabMini, flat, glossy, noWrap, outline, padding, push, ripple, round, size, square, stack, stretch, textColor, unelevated].
- `QasDelete`: fixado cor `grey-9` quando for tag `qas-btn`.
- `ui/src/asset/gear.svg`: removido ilustração.
- `Unauthorized`: removido uso da pagina de 401 já que ele nunca cai nela, o fluxo sempre leva para refazer login ou dar refresh no token.

## [3.6.0-beta.0] - 31-01-2023
### Adicionado
- `QasBadge` adicionado novo componente wrapper do quasar para badges.
- `QasStatus`: adicionado componente circular de status.
- `typography.md`: adicionado documentação para classes de tipografia.

### Modificado
- `ui/src/index.scss`: modificado `--qas-generic-border-radius` para `4px`.
- `QasTabsGenerator`: utilizando `QasStatus` no lugar do `PvTabsGeneratorStatus`.
- [`QasSelect`, `QasSearchBox`]: removido `threshold: 0.1`, deixando o default do `fuse.js` (0.6), assim a busca fica menos precisa e mais fácil de filtrar o que deseja.
- `typography.scss`: alterado line-height fixo de `1.5rem` para o mesmo de cada `font-size`.

### Corrigido
- `QasTextTruncate`: corrigido bug quando o texto tinha como valor inicial `undefined`.
- `QasFilters`: corrigido model search que vinha vazio mesmo estando na URL quando usado propriedade `:use-filter-button="false"`.
- `QasFilters`: corrigido problema de style sendo aplicado a demais componentes com a classe `q-field` quando usado dentro do slot do QasFilters.
- `QasDateTimeInput`: corrigido ícone `q-icon` para `QasBtn` com ícone, já que existe uma ação.
- `QasDateTimeInput`: corrigido problema quando o input era `readonly` e isto não repassado para os ícones de date e time.

### Removido
- `PvTabsGeneratorStatus`: removido componente privado em favor do componente publico `QasStatus`.
- `text.md`: removido aquivo para ser unificado no `typography.md`.

## [3.5.0] - 31-01-2023
## BREAKING CHANGE
- `QasField`: removido propriedade `useSearch` que era repassado para o `QasSelect` já que agora o componente QasSelect já adiciona uma busca automática quando existem muitas opções, porém ainda é possível passar a propriedade `useSearch` mas não de forma automática, precisa setar manualmente.
- `QasField`: Alterado type `radio` par utilizar o novo componente `QasOptionGroup` e removido prop de erro pois não existe no componente `QOptionGroup`, testar bem para validar.
- Componentes de radio agora existe padronização, a partir do mobile componente segue comportamento de linha, em telas mobile segue comportamento de bloco, não sendo possível alterar este comportamento, verificar locais que utilizam para não quebrar o estilo.
- `QasTableGenerator`: pode haver breaking change de design no espaçamento embaixo do componente uma vez que foi removido a classe `q-mb-xl`.
- `QasActionsMenu`: removido propriedade `label`, agora o label sempre será fixo "Opções".
- `QasNestedFields`: mudanças de comportamento e estilo do nested, rever implementações.
- `QasFilters`: removido slot `filter-button`.
`QasAvatar`: removido propriedades `color` e `text-color` agora sempre vai ser background primary com cor de texto branca.
- `QasAvatar`: mudanças relacionadas a cor.
- `QasPageHeader`: adicionada nova propriedade `useHomeIcon` que habilita o ícone de início como primeiro nível do breadcrumbs, com default `true` para respeitar novo padrão de design, caso já tenha um nível de "início" declarado no breadcrumbs, remova.
- - `icons`: modificado biblioteca de ícones para `material-symbols-rounded`, agora é necessário alterar o prefixo dos ícones de `o_` para `sym_r_`.
- `QasTabsGenerator`: removido propriedades: `activeColor`, `counterProps`, `indicatorColor` e `tabClass` com intuito de padronizar novos estilos.
- `ui/src/css/utils/shadow.scss`: removido util shadow.scss para mudar shadow por variável.
- `QasDialog`: removido propriedade `cardProps` pois não utilizamos mais o `QCard`.
- `QasDialog`: removido propriedade `useCloseButton` pois agora o controle de mostrar o botão é feito automaticamente.

### Adicionado
- `QasFilters`: adicionado nova propriedade `fieldsProps` para repassar propriedades para os campos do filtro.
- `QasSelect`: adicionado busca automática quando existem pelo menos 10 opções.
- `QasOptionGroup`: adicionado novo componente wrapper do `QOptionGroup` do quasar, para deixar padronizado propriedade `inline` e deixar mais componentizado.
- `QasPagination`: adicionado novo componente de paginação que é um wrapper do `QPagination`.
- `QasField`: Adicionado `*` na label no caso do campo ser obrigatório com base na propriedade `required: true`.
- [`NotifySuccess`, `NotifyError`]: Adicionado botão de fechar.
- `shared`: Adicionado pasta para arquivos de configurações que iremos utilizar internamente.
- `plugins`: Adicionado pasta para plugins css.
- `notify.scss`: Adicionado arquivo de css para o novo padrão de layout dos notifies.
- `QasListView`: adicionado nova propriedade `use-auto-handle-on-delete` para controlar se o componente vai lidar automaticamente quando acontecer algum delete compatível com a listagem.
- `QasActionsMenu`: adicionada a propriedade `auto-close` para fechar o menu após a ação ser executada.
- `QasNestedFields`: adicionado propriedade `actions-menu-props` para repassar propriedades para o `QasActionsMenu`.
- `QasActionsMenu`: adicionado propriedade `useLabelOnSmallScreen`.
- `QasNestedFields`: adicionada nova propriedade `addFirstInputLabel` para modificar o texto do botão de adicionar o primeiro item.
- `QasNestedFields`: adicionada nova propriedade `useFirstInputButton` para usar um botão diferente para adicionar o primeiro item.
- `QasNestedFields`: adicionada nova propriedade `useStartsEmpty` para iniciar o componente sem nenhum item.
- `QasTableGenerator`: Suporte ao evento `rowClick`, nativo do `QTable`.
- `QasAppUser`: Novo componente para exibir informações do usuário logado.
-`ui/src/index.scss`: adicionado nova variável css para transição: `--qas-generic-transition: 300ms`.
- `border.scss`: adicionado nova cor de borda `border-grey`.
- `index.scss`: adicionado nova var css `--qas-border-grey`.
- `QasAvatar`: adicionado propriedade `size`.
- `QasAvatar`: adicionado propriedade color sendo possível passar 2 valores `primary` e `secondary-contrast`.
- `QasHeaderActions`: adicionado novo componente para trabalhar com descrição e ações.
- `set-typography.scss`: adicionado novo mixin para setar estilos de tipografia quando não é possível através das classes do quasar.
- `QasActions`: adicionado propriedade `use-full-width` para deixar as colunas 100%, com col-12.
- `QasActions`: adicionado propriedade `use-equal-width` para deixar as colunas 50% no desktop e 100% no mobile, col-12 col-sm-6.
`ui/src/css/variables/shadow.scss`: adicionado shadow.scss para modificar através de variável.
- `QasActionsMenu`: adicionado propriedade `useLabel` com default `true` para esconder o label em todas as telas necessárias.
- `QasWelcome`: adicionado novo componente de boas-vindas para uso na Home.
- `date-config.js`: adicionado arquivo para configurações de datas.

### Corrigido
- `QasNestedFields`: resolvido validação do `showDestroyBtn`.
- `QasFormView`: agora quando faz um submit com sucesso os erros são resetados.
- `QasField`: agora o label de required também é modificado caso passe através dos `$attrs`.
- `QasAppMenu`: adicionado validação na badge de desenvolvimento.
- `QasAppUser`: corrigido avatar.
- `QasAvatar`: corrigido $attrs.
- `QasActionsMenu`: corrigido problema de circular dependency entre as propriedades computadas `actions` e `hasMoreThanOneAction`.
- `QasTabsGenerator`: corrigido documentação.
- `QasTabsGenerator`: agora o model não é alterado internamente ao clicar em uma tab desabilitada.
- `QasUploader`: corrigido propriedade `color` do `QasAvatar` dentro do uploader.
- `QasPageHeader`: mudanças de layout e comportamento, agora caso o breadcrumbs tenha mais de 4 níveis é adicionado uma label "...".
- `typography.scss`: alterado `font-weight` do `$caption` para `400`.
- `QasPageHeader`: adicionada nova propriedade `useHomeIcon` que habilita o ícone de início como primeiro nível do breadcrumbs, com default `true` para respeitar novo padrão de design.
- `QasActionsMenu`: alterado valor default da propriedade `useLabelOnSmallScreen` para `false`.
- `QasTabsGenerator`: alteração de estilos.
- `QasTableGenerator`: modificado cores e fontes.
- `QasPagination`: modificado cor das paginas para `grey-8` e cor dos ícones de setas para `grey-9`.
- `QasDateTimeInput`: adicionado validações para datas invalidas.
- `icons`: modificado biblioteca de ícones para `material-symbols-rounded`, agora é necessário alterar o prefixo dos ícones de `o_` para `sym_r_`.
- [`QasFilters`, `QasSearchBox`]: alterado debounce de `500ms` para `1200ms`.
- `QasSelect`: alterado debounce de `500ms` (default) para `1200ms` e quando não tem `useLazyLoading` removido o debounce.
- `QasAppMenu`: corrigido tamanho do drawer, estava invertido, 320px deve ser no mobile e não desktop.
- `QasAppMenu`: corrigido botão de fechar drawer no mobile, não tinha nenhuma ação ao clicar nele.
- `item.scss`: corrigido cor quando o item está ativo, estava sobrescrevendo com a cor `grey-9` mesmo o item sendo ativo, agora não mais.

### Modificado
- `QasField`: alterado type `radio` par utilizar o novo componente `QasOptionGroup` e removido prop de erro pois não existe no componente `QOptionGroup`.
- `typography.scss`: alterado tipografia para seguir novo padrão de design.
- [`QasTextTruncate`, `QasDelete`, `QasCopy`]: adicionado modificador `.stop` nos eventos `@click.stop` para prevenir evento de click quando utilizado dentro da tabela.
- `QasNestedFields`: modificado o valor padrão da propriedade `useDestroyAlways` para ser um espelho da propriedade `useStartsEmpty` como valor default.
- [`NotifySuccess`, `NotifyError`]: Mudança de posição que será exibido(era bottom, agora será top).
- [`NotifySuccess`, `NotifyError`]: Mudança de cor, agora será `grey-9`.
- `generator.js`: Modificado o padrão da prop de gutter de `md` para `lg`.
- `QasActionsMenu`: modificado o estilo padrão do componente e comportamento quando há uma ação ou mais ações.
- `QasActionsMenu`: modificado a label padrão do botão para "Opções" e ícone para `o_more_vert`.
- `QasTableGenerator`: removido classe `q-mb-xl` para adaptação de layout, responsabilidade de espaçamento fica com quem implementa.
- `QasListView`: utilizando `QasPagination` no lugar do `QPagination` e adicionado de informação de quantos itens existem por página.
- `QasNestedFields`: agora usa o `QActionsMenu` para as ações exibidas no tipo bloco.
- `QasActionsMenu`: refatorado código, alterado estilos.
- `items.scss`: modificado classe global do `q-item` para adicionar `fonte-weight: 600` sempre que não estiver desativado.
- `spacing.scss`: modificado espaçamento do `lg` de 32px para 24px e do `xl` de 48px para 32px.
- `QasListView`: modificado estilo do `empty-results`.
- `QasFormView`: alterado valor default da propriedade `cancelButtonLabel` de "Cancelar" para "Voltar".
- `QasPageHeader`: removido botão de voltar ao lado do título da página.
- `QasSelect`: alterado ícone de busca para a esquerda ao invés da direita.
- `QasNestedFields`: alterado nome da computada `showDestroyBtn` para `showDestroyButton`.
- [`QasFormView`, `view.js`, `QasDelete`]: alterado mensagens padrão do nofity, e removido `exception` dos notifies.
- `notify.scss`: adicionado tamanho máximo de `560px`.
- [`QasLayout`, `QasAppBar`, `QasAppMenu`]: Modificado internamente em razão do novo layout.
- `QasAppMenu`: removido busca dos módulos.
- `QasFilters`: mudanças de design.
- `QasPageHeader`: alterado espaçamento de `q-mb-lg` para `q-mb-xl` para manter o que era anteriormente.
- `QasFormView`: modificado comportamento da propriedade `disable`, agora só desabilita o botão de salvar (submit), deixando o botão voltar habilitado.
- [`QasAlert`, `QasAvatar`, `QasBox`, `QasCard`, `QasTransfer`]: modificado cores referente a `primary-contrast` e `secondary-contrast`.
- `quasar.variables.scss`: modificado cores.
- QasAppMenu: adicionado `border-radius: 4px` no select de módulos.
- `shadow.scss`: modificado cor `shadow-2` do quasar.
- modificado cor `accent` para opacidade de `10%` ao invés de `20%`.
- `QasNumericInput`: adicionado manualmente prefixo `R$ ` com espaçamento a mais propositalmente.
- [`QasAppMenu`, `QasAppBar`, `QasAppUser`]: mudanças de layout.
- `QasActions`: modificado default da propriedade `gutter` para `lg` porém no mobile ela continua `md`.
- `QasDialog`: modificado estilos do dialog.
- [`QasDelete`, `delete.js`, `QasFormView`]: removido titulo do dialog.
- `QasTreeGenerator`: removido titulo do dialog de excluir ramo.
- `spacing.scss`: modificado variáveis de gutter para aplicar mudanças do spacing.
- `QasSignatureUploader`: modificado customização do template `actions` do `qas-dialog` para utilizar o default.
- `item.scss`: modificado cor do hover para `$primary-color`;
- `item.scss`: modificado cor do item quando clicável para `grey-9` e quando não clicável para `grey-8`.

### Removido
- `QasField`: removido propriedade `useSearch` que era repassado para o `QasSelect` já que agora o componente QasSelect já adiciona uma busca automática quando existem muitas opções, porém ainda é possível passar a propriedade `useSearch` mas não de forma automática, precisa setar manualmente.
- `QasActionsMenu`: removido propriedade `label`, agora o label sempre será fixo "Opções".
- `QasNestedFields`: modificado o valor padrão da propriedade `addInputLabel` para "Adicionar".
- `QasFilters`: removido slot `filter-button`.
`QasAvatar`: removido propriedades `color` e `text-color` agora sempre vai ser background primary com cor de texto branca.
- `QasTabsGenerator`: removido propriedades: `activeColor`, `counterProps`, `indicatorColor` e `tabClass` com intuito de padronizar novos estilos.
- `ui/src/css/utils/shadow.scss`: removido util shadow.scss para mudar shadow por variável.
- `QasDialog`: removido propriedade `cardProps` pois não utilizamos mais o `QCard`.
- `QasDialog`: removido propriedade `useCloseButton` pois agora o controle de mostrar o botão é feito automaticamente.

## [3.5.0-beta.15] - 24-01-2023
### Corrigido
- `item.scss`: corrigido cor quando o item está ativo, estava sobrescrevendo com a cor `grey-9` mesmo o item sendo ativo, agora não mais.

## [3.5.0-beta.14] - 17-01-2023
### Corrigido
- `QasAppMenu`: corrigido tamanho do drawer, estava invertido, 320px deve ser no mobile e não desktop.
- `QasAppMenu`: corrigido botão de fechar drawer no mobile, não tinha nenhuma ação ao clicar nele.

## [3.5.0-beta.13] - 17-01-2023
### Adicionado
- `QasActions`: adicionado propriedade `use-full-width` para deixar as colunas 100%, com col-12.
- `QasActions`: adicionado propriedade `use-equal-width` para deixar as colunas 50% no desktop e 100% no mobile, col-12 col-sm-6.
`ui/src/css/variables/shadow.scss`: adicionado shadow.scss para modificar através de variável.
- `QasActionsMenu`: adicionado propriedade `useLabel` com default `true` para esconder o label em todas as telas necessárias.
- `QasWelcome`: adicionado novo componente de boas-vindas para uso na Home.
- `date-config.js`: adicionado arquivo para configurações de datas.

### Modificado
- `QasNumericInput`: adicionado manualmente prefixo `R$ ` com espaçamento a mais propositalmente.
- [`QasAppMenu`, `QasAppBar`, `QasAppUser`]: mudanças de layout.
- `QasActions`: modificado default da propriedade `gutter` para `lg` porém no mobile ela continua `md`.
- `QasDialog`: modificado estilos do dialog.
- [`QasDelete`, `delete.js`, `QasFormView`]: removido titulo do dialog.
- `QasTreeGenerator`: removido titulo do dialog de excluir ramo.
- `spacing.scss`: modificado variáveis de gutter para aplicar mudanças do spacing.
- `QasSignatureUploader`: modificado customização do template `actions` do `qas-dialog` para utilizar o default.
- `item.scss`: modificado cor do hover para `$primary-color`;
- `item.scss`: modificado cor do item quando clicável para `grey-9` e quando não clicável para `grey-8`.

### Removido
- `ui/src/css/utils/shadow.scss`: removido util shadow.scss para mudar shadow por variável.
- `QasDialog`: removido propriedade `cardProps` pois não utilizamos mais o `QCard`.
- `QasDialog`: removido propriedade `useCloseButton` pois agora o controle de mostrar o botão é feito automaticamente.

## [3.5.0-beta.12] - 06-01-2023
## BREAKING CHANGES:
- `QasPageHeader`: adicionada nova propriedade `useHomeIcon` que habilita o ícone de início como primeiro nível do breadcrumbs, com default `true` para respeitar novo padrão de design, caso já tenha um nível de "início" declarado no breadcrumbs, remova.
- - `icons`: modificado biblioteca de ícones para `material-symbols-rounded`, agora é necessário alterar o prefixo dos ícones de `o_` para `sym_r_`.
- `QasTabsGenerator`: removido propriedades: `activeColor`, `counterProps`, `indicatorColor` e `tabClass` com intuito de padronizar novos estilos.

### Adicionado
- `QasHeaderActions`: adicionado novo componente para trabalhar com descrição e ações.
- `set-typography.scss`: adicionado novo mixin para setar estilos de tipografia quando não é possível através das classes do quasar.

### Modificado
- `QasPageHeader`: mudanças de layout e comportamento, agora caso o breadcrumbs tenha mais de 4 níveis é adicionado uma label "...".
- `typography.scss`: alterado `font-weight` do `$caption` para `400`.
- `QasPageHeader`: adicionada nova propriedade `useHomeIcon` que habilita o ícone de início como primeiro nível do breadcrumbs, com default `true` para respeitar novo padrão de design.
- `QasActionsMenu`: alterado valor default da propriedade `useLabelOnSmallScreen` para `false`.
- `QasTabsGenerator`: alteração de estilos.
- `QasTableGenerator`: modificado cores e fontes.
- `QasPagination`: modificado cor das paginas para `grey-8` e cor dos ícones de setas para `grey-9`.
- `QasDateTimeInput`: adicionado validações para datas invalidas.
- `icons`: modificado biblioteca de ícones para `material-symbols-rounded`, agora é necessário alterar o prefixo dos ícones de `o_` para `sym_r_`.
- [`QasFilters`, `QasSearchBox`]: alterado debounce de `800ms` para `1200ms`.
- `QasSelect`: alterado debounce de `500ms` (default) para `1200ms` e quando não tem `useLazyLoading` removido o debounce.

### Corrigido
- `QasTabsGenerator`: corrigido documentação.
- `QasTabsGenerator`: agora o model não é alterado internamente ao clicar em uma tab desabilitada.
- `QasUploader`: corrigido propriedade `color` do `QasAvatar` dentro do uploader.

### Removido
- `QasTabsGenerator`: removido propriedades: `activeColor`, `counterProps`, `indicatorColor` e `tabClass` com intuito de padronizar novos estilos.

## [3.5.0-beta.11] - 02-01-2023
### Modificado
- `shadow.scss`: modificado cor `shadow-2` do quasar.
- modificado cor `accent` para opacidade de `10%` ao invés de `20%`.

## [3.5.0-beta.10] - 30-12-2022
### Corrigido
- `QasActionsMenu`: corrigido problema de circular dependency entre as propriedades computadas `actions` e `hasMoreThanOneAction`.

## [3.5.0-beta.9] - 29-12-2022
### Corrigido
- `QasAvatar`: corrigido $attrs.

## [3.5.0-beta.8] - 28-12-2022
## BREAKING CHANGES
- `QasAvatar`: mudanças relacionadas a cor.

### Adicionado
- `QasAvatar`: adicionado propriedade `size`.
- `QasAvatar`: adicionado propriedade color sendo possível passar 2 valores `primary` e `secondary-contrast`.

### Modificado
- QasAppMenu: adicionado `border-radius: 4px` no select de módulos.

### Corrigido
- `QasAppUser`: corrigido avatar.

## [3.5.0-beta.7] - 28-12-2022
### Adicionado
- `border.scss`: adicionado nova cor de borda `border-grey`.
- `index.scss`: adicionado nova var css `--qas-border-grey`.

### Modificado
- [`QasAlert`, `QasAvatar`, `QasBox`, `QasCard`, `QasTransfer`]: modificado cores referente a `primary-contrast` e `secondary-contrast`.
- `quasar.variables.scss`: modificado cores.

### Corrigido
- `QasAppMenu`: adicionado validação na badge de desenvolvimento.

### Removido
`QasAvatar`: removido propriedades `color` e `text-color` agora sempre vai ser background primary com cor de texto branca.

## [3.5.0-beta.6] - 26-12-2022
### Modificado
- `QasFormView`: modificado comportamento da propriedade `disable`, agora só desabilita o botão de salvar (submit), deixando o botão voltar habilitado.

### Corrigido
- `QasField`: agora o label de required também é modificado caso passe através dos `$attrs`.

## [3.5.0-beta.5] - 26-12-2022
## BREAKING CHANGE
- `QasFilters`: removido slot `filter-button`.

### Adicionado
- `QasSelect`: adicionado documentação do `useSearch`.
-`ui/src/index.scss`: adicionado nova variável css para transição: `--qas-generic-transition: 300ms`;

### Modificado
- `QasFilters`: mudanças de design.
- `QasFilters`: alterado debounce de `500ms` para `800ms`.
- `QasPageHeader`: alterado espaçamento de `q-mb-lg` para `q-mb-xl` para manter o que era anteriormente.

### Removido
- `QasFilters`: removido slot `filter-button`.

### Corrigido
- `QasFormView`: agora quando faz um submit com sucesso os erros são resetados.

## [3.5.0-beta.4] - 22-12-2022
### Adicionado
- `QasSelect`: adicionado propriedade `useSearch` para caso que não queira busca automática do fuse, se não passar essa prop a busca vai depender da quantidade de options.

### Modificado
- `QasAppMenu`: removido busca dos módulos.

## [3.5.0-beta.3] - 22-12-2022
### Adicionado
- `QasAppUser`: Novo componente para exibir informações do usuário logado.

### Modificado
- [`QasLayout`, `QasAppBar`, `QasAppMenu`]: Modificado inteiramente em razão do novo layout.

## [3.5.0-beta.2] - 20-12-2022
### Modificado
- `QasFormView`: alterado valor default da propriedade `cancelButtonLabel` de "Cancelar" para "Voltar".
- `QasPageHeader`: removido botão de voltar ao lado do título da página.
- `QasSelect`: alterado ícone de busca para a esquerda ao invés da direita.
- `QasNestedFields`: alterado nome da computada `showDestroyBtn` para `showDestroyButton`.
- [`QasFormView`, `view.js`, `QasDelete`]: alterado mensagens padrão do nofity, e removido `exception` dos notifies.
- `notify.scss`: adicionado tamanho máximo de `560px`.

### Corrigido
- `QasNestedFields`: resolvido validação do `showDestroyBtn`.

## [3.5.0-beta.1] - 16-12-2022
## BREAKING CHANGE
- `QasTableGenerator`: pode haver breaking change de design no espaçamento embaixo do componente uma vez que foi removido a classe `q-mb-xl`.
- `QasActionsMenu`: removido propriedade `label`, agora o label sempre será fixo "Opções".
- `QasNestedFields`: mudanças de comportamento e estilo do nested, rever implementações.

### Adicionado
- `QasPagination`: adicionado novo componente de paginação que é um wrapper do `QPagination`.
- `QasField`: Adicionado `*` na label no caso do campo ser obrigatório com base na propriedade `required: true`.
- [`NotifySuccess`, `NotifyError`]: Adicionado botão de fechar.
- [`NotifySuccess`, `NotifyError`]: Adicionado ícones de sucesso e erro.
- `shared`: Adicionado pasta para arquivos de configurações que iremos utilizar internamente.
- `plugins`: Adicionado pasta para plugins css.
- `notify.scss`: Adicionado arquivo de css para o novo padrão de layout dos notifies.
- `QasListView`: adicionado nova propriedade `use-auto-handle-on-delete` para controlar se o componente vai lidar automaticamente quando acontecer algum delete compatível com a listagem.
- `QasActionsMenu`: adicionada a propriedade `auto-close` para fechar o menu após a ação ser executada.
- `QasNestedFields`: adicionado propriedade `actions-menu-props` para repassar propriedades para o `QasActionsMenu`.
- `QasActionsMenu`: adicionado propriedade `useLabelOnSmallScreen`.
- `QasNestedFields`: adicionada nova propriedade `addFirstInputLabel` para modificar o texto do botão de adicionar o primeiro item.
- `QasNestedFields`: adicionada nova propriedade `useFirstInputButton` para usar um botão diferente para adicionar o primeiro item.
- `QasNestedFields`: adicionada nova propriedade `useStartsEmpty` para iniciar o componente sem nenhum item.
- `QasTableGenerator`: Suporte ao evento `rowClick`, nativo do `QTable`.

### Modificado
- [`NotifySuccess`, `NotifyError`]: Mudança de posição que será exibido(era bottom, agora será top).
- [`NotifySuccess`, `NotifyError`]: Mudança de cor, agora será `grey-9`.
- `generator.js`: Modificado o padrão da prop de gutter de `md` para `lg`.
- `QasActionsMenu`: modificado o estilo padrão do componente e comportamento quando há uma ação ou mais ações.
- `QasActionsMenu`: modificado a label padrão do botão para "Opções" e ícone para `o_more_vert`.
- `QasTableGenerator`: removido classe `q-mb-xl` para adaptação de layout, responsabilidade de espaçamento fica com quem implementa.
- `QasListView`: utilizando `QasPagination` no lugar do `QPagination` e adicionado de informação de quantos itens existem por página.
- `QasNestedFields`: agora usa o `QActionsMenu` para as ações exibidas no tipo bloco.
- `QasActionsMenu`: refatorado código, alterado estilos.
- `items.scss`: modificado classe global do `q-item` para adicionar `fonte-weight: 600` sempre que não estiver desativado.
- `spacing.scss`: modificado espaçamento do `lg` de 32px para 24px e do `xl` de 48px para 32px.
- `QasListView`: modificado estilo do `empty-results`.

### Removido
- `QasActionsMenu`: removido propriedade `label`, agora o label sempre será fixo "Opções".
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
- [`QasTextTruncate`, `QasDelete`, `QasCopy`]: adicionado modificador `.stop` nos eventos `@click.stop` para prevenir evento de click quando utilizado dentro da tabela.

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
[3.5.0-beta.1]: https://github.com/bildvitta/asteroid/compare/v3.5.0-beta.0...v3.5.0-beta.1?expand=1
[3.5.0-beta.2]: https://github.com/bildvitta/asteroid/compare/v3.5.0-beta.1...v3.5.0-beta.2?expand=1
[3.5.0-beta.3]: https://github.com/bildvitta/asteroid/compare/v3.5.0-beta.2...v3.5.0-beta.3?expand=1
[3.5.0-beta.4]: https://github.com/bildvitta/asteroid/compare/v3.5.0-beta.3...v3.5.0-beta.4?expand=1
[3.5.0-beta.5]: https://github.com/bildvitta/asteroid/compare/v3.5.0-beta.4...v3.5.0-beta.5?expand=1
[3.5.0-beta.6]: https://github.com/bildvitta/asteroid/compare/v3.5.0-beta.5...v3.5.0-beta.6?expand=1
[3.5.0-beta.7]: https://github.com/bildvitta/asteroid/compare/v3.5.0-beta.6...v3.5.0-beta.7?expand=1
[3.5.0-beta.8]: https://github.com/bildvitta/asteroid/compare/v3.5.0-beta.7...v3.5.0-beta.8?expand=1
[3.5.0-beta.9]: https://github.com/bildvitta/asteroid/compare/v3.5.0-beta.8...v3.5.0-beta.9?expand=1
[3.5.0-beta.10]: https://github.com/bildvitta/asteroid/compare/v3.5.0-beta.9...v3.5.0-beta.10?expand=1
[3.5.0-beta.11]: https://github.com/bildvitta/asteroid/compare/v3.5.0-beta.10...v3.5.0-beta.11?expand=1
[3.5.0-beta.12]: https://github.com/bildvitta/asteroid/compare/v3.5.0-beta.11...v3.5.0-beta.12?expand=1
[3.5.0-beta.13]: https://github.com/bildvitta/asteroid/compare/v3.5.0-beta.12...v3.5.0-beta.13?expand=1
[3.5.0-beta.14]: https://github.com/bildvitta/asteroid/compare/v3.5.0-beta.13...v3.5.0-beta.14?expand=1
[3.5.0-beta.15]: https://github.com/bildvitta/asteroid/compare/v3.5.0-beta.14...v3.5.0-beta.15?expand=1
[3.5.0]: https://github.com/bildvitta/asteroid/compare/v3.4.0...v3.5.0?expand=1
[3.6.0-beta.0]: https://github.com/bildvitta/asteroid/compare/v3.5.0...v3.6.0-beta.0?expand=1
[3.6.0-beta.1]: https://github.com/bildvitta/asteroid/compare/v3.6.0-beta.0...v3.6.0-beta.1?expand=1
[3.6.0-beta.2]: https://github.com/bildvitta/asteroid/compare/v3.6.0-beta.1...v3.6.0-beta.2?expand=1
[3.6.0]: https://github.com/bildvitta/asteroid/compare/v3.5.0...v3.6.0?expand=1
[3.7.0-beta.0]: https://github.com/bildvitta/asteroid/compare/v3.6.0...v3.7.0-beta.0?expand=1
[3.7.0-beta.1]: https://github.com/bildvitta/asteroid/compare/v3.7.0-beta.0...v3.7.0-beta.1?expand=1
[3.7.0-beta.2]: https://github.com/bildvitta/asteroid/compare/v3.7.0-beta.1...v3.7.0-beta.2?expand=1
[3.7.0-beta.3]: https://github.com/bildvitta/asteroid/compare/v3.7.0-beta.2...v3.7.0-beta.3?expand=1
[3.7.0]: https://github.com/bildvitta/asteroid/compare/v3.6.0...v3.7.0?expand=1
[3.8.0-beta.0]: https://github.com/bildvitta/asteroid/compare/v3.7.0...v3.8.0-beta.0?expand=1
[3.8.0-beta.1]: https://github.com/bildvitta/asteroid/compare/v3.8.0-beta.0...v3.8.0-beta.1?expand=1
[3.8.0-beta.2]: https://github.com/bildvitta/asteroid/compare/v3.8.0-beta.1...v3.8.0-beta.2?expand=1
[3.8.0-beta.3]: https://github.com/bildvitta/asteroid/compare/v3.8.0-beta.2...v3.8.0-beta.3?expand=1
[3.8.0-beta.4]: https://github.com/bildvitta/asteroid/compare/v3.8.0-beta.3...v3.8.0-beta.4?expand=1
[3.8.0-beta.5]: https://github.com/bildvitta/asteroid/compare/v3.8.0-beta.4...v3.8.0-beta.5?expand=1
[3.8.0-beta.6]: https://github.com/bildvitta/asteroid/compare/v3.8.0-beta.5...v3.8.0-beta.6?expand=1
[3.8.0-beta.7]: https://github.com/bildvitta/asteroid/compare/v3.8.0-beta.6...v3.8.0-beta.7?expand=1
[3.8.0]: https://github.com/bildvitta/asteroid/compare/v3.7.0...v3.8.0?expand=1
[3.9.0-beta.0]: https://github.com/bildvitta/asteroid/compare/v3.8.0...v3.9.0-beta.0?expand=1
[3.9.0-beta.1]: https://github.com/bildvitta/asteroid/compare/v3.9.0-beta.0...v3.9.0-beta.1?expand=1