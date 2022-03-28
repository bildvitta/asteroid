# Changelog

## Components

### QasAvatar
Sincronizado em _14/03/2022 as 11h00_.

- Logica das propriedades `text-color` e `color` invertida, antes text-color alterava o bg-color e color o text-color, agora text-color altera comente o texto e color o background.

### QasActions (QasBtnActions)

Sincronizado em _13/01/2022 as 10h56_.

- Propriedade `btnCol` removida.

### QasAlert (QasTip)

Sincronizado em _10/01/2022 as 17h20_.

- Renomeado de "QasTip" para "QasAlert".
- Adicionado `modelValue`.
- Logica das cores alterada, sempre que a `color` for `primary` ou `secondary`, a cor `contrast` será definida como cor de fundo.
- Removido propriedade `bgColor` (você ainda pode usar classes CSS para este fim).

### QasAppBar

Sincronizado em _11/02/2022 as 15h00_.

### QasAppMenu

Sincronizado em _16/03/2022 as 19h00_.

- Propriedade `itemClass` removida (não estava sendo utilizada).
- Propriedade `value` alterada para `modelValue`.
- Evento `input` alterado para `update:modelValue`.

### QasLayout

Sincronizado em _24/02/2022 as 14h30_.

- Propriedade `value` alterada para `modelValue`.
- Propriedade `appBarEvents` removida (todos os eventos são passados pelo $attrs).
- Propriedade `appMenuEvents` removida (todos os eventos são passados pelo $attrs).
- Evento `input` alterado para `update:modelValue`.

### ~~QasAppsBar~~ (removido)

- Componente era utilizado para navegação de aplicativos (módulos), mas isto foi alterado, agora essa navegação é feita por um select no menu lateral dentro do `QasAppMenu`.

### QasBox

Sincronizado em _19/10/2021 as 17h17_.

- Propriedade `formMode` removida em favor de `outlined` and `unelevated`;

### QasBreakline (QasBreakLine)

Sincronizado em _19/10/2021 as 17h17_.

- Renomeado de `QasBreakLine` para `QasBreakline`.
- Removido o parente (graças ao multi-root do Vue 3).
- Removido parentTag, tagClass e tagStyle (classes e estilos repassados automaticamente).

### QasBtn

Sincronizado em _23/01/2021 as 18h23_.

- Propriedade `hideMobileLabel` renomeada para `hideLabelOnSmallScreen`;

### QasCopy

Sincronizado em _19/10/2021 as 17h17_.

- Propriedade `label` renomeada para `text`.

### QasLabel

Sincronizado em _19/10/2021 as 17h17_.

- Propriedade `quantity` renomeada para `count`.
- Slot `formattedLabel` renomeado para `labelWithSuffix`.

### QasNumericInput (QasDecimalInput)

Sincronizado em _19/10/2021 as 17h17_.

- Renomeado de "QasDecimalInput" para "QasNumericInput".
- Propriedade `value` alterada para `modelValue`.
- Evento `input` alterado para `update:modelValue`.

### QasSelect

Sincronizado em _19/10/2021 as 17h17_.

- Lógica alterada para funcionar com a v6 da biblioteca Fuse.js.
- Propriedade `value` alterada para `modelValue`.
- Evento `input` alterado para `update:modelValue`.

### QasPasswordInput

Sincronizado em _13/01/2022 as 18h23_.

- Propriedade `value` alterada para `modelValue`.
- Evento `input` alterado para `update:modelValue`.
- Propriedades referentes ao `QasPasswordStrengthChecker`.

### QasPasswordStrengthChecker

Sincronizado em _19/10/2021 as 17h17_.

- Propriedade `value` alterada para `password`.
- Propriedade `weak` alterada para `minlength`.
- Propriedade `pattern` removida em favor de `useLowercase`, `useNumbers`, `useSpecial` e `useUppercase`.
- Propriedade `specials` adicionada para definir os caracteres especiais.
- Evento `password-success` alterado para `update:modelValue`.

### QasTabsGenerator

Sincronizado em _17/03/2022 as 17h50_.

- Propriedade `bgColorClass` removida (pode fazer o controle passando `class` direto no componente).
- Propriedade `colorClass` alterada para `tabClass` (pode passar mais classes além de cores).
- Propriedade `value` alterada para `modelValue`.
- Adicionado propriedade `counterProps`.
- Evento `input` alterado para `update:modelValue`.

### QasSearchBox

Sincronizado em _13/01/2022 as 14h46_.

- Propriedade `hideEmptySlot` alterada para `useEmptySlot`.
- Propriedade `value` alterada para `modelValue`.
- Adicionado `v-model:results` para recuperar os resultados da pesquisa.
- Removido scope `results`.
- Slot `empty` alterado para `empty-result`.
- Evento `input` alterado para `update:modelValue`.
- Evento `emptyResult` alterado para `empty-result`.
- Adicionado evento `@update:results`.

### QasCard

Sincronizado em _13/01/2022 as 15h13_.

- Adicionado propriedade `formMode` (era usada no código mas não existia a propriedade).

### QasActionsMenu

Sincronizado em _23/03/2022 as 16h00_.

- Propriedade `hideLabel` removido (para remover o label é só não passar ele).
- Adicionado propriedade `deleteLabel` (para definir o label do botão de exclusão).
- Adicionado propriedade `deleteIcon` (para definir o ícone do botão de exclusão).
- Adicionado propriedade `deleteProps` para repassar para o componente `QasDelete` e controlar quando tem ou não botão de exclusão por padrão.
- Alterado valor "default" da propriedade `label` para `Configurações`.

### QasSelectList

Sincronizado em _13/01/2022 as 18h23_.

- Propriedade `options` nomeado para `list`.
- Alterado valor "default" da propriedade `label` para `Configurações.
- Propriedade `value` alterada para `modelValue`.
- Scoped Slot `item` e `item-action` agora só tem acesso aos metodos `add`, `handleClick`, `updateModel` e `remove`.
- Evento `input` alterado para `update:modelValue`.

### QasInput

Sincronizado em _08/02/2022 as 17h00_.

- Propriedade `value` alterada para `modelValue`.
- Evento `input` alterado para `update:modelValue`.
- Adicionado propriedade `unmaskedValue` com default `true` para controle da máscara.
### QasListItems

Sincronizado em _18/01/2022 as 19h11_.

- Adicionado propriedade `useSectionActions` para controlar o "q-item-section side".
- Propriedade `useIconRedirect` alterada para `redirectOnIcon` com valor "default" `true`.

### QasTransfer

Sincronizado em _17/03/2022 as 14h00_.

- Propriedade `value` alterada para `modelValue`.
- Propriedade `hideEmptySlot` alterada para `useEmptySlot`.
- Alterado logica de onde chamar o `update:modelValue`.
- Evento `input` alterado para `update:modelValue`.

### ~~QasTooltip~~ (removido)
- O componente está conceituralmente incorreto, pois não é um componente de tooltip, mas sim um componente de icon com tooltip dentro, e um comportamento de notify.
- Utilizar o [QTooltip](https://quasar.dev/vue-components/tooltip#introduction) do próprio quasar nestes casos.

### QasSignaturePad

Sincronizado em _20/01/2022 as 15h10_.

- Propriedade `options` alterada para `signatureOptions`.
- Propriedade sync `isEmpty` removida e alterada para `v-model:empty`.
- Biblioteca `signature_pad` versão `^3.0.0-beta.4` atualizada para a versão `^4.0.1`.
- Evento `update:empty` adicionado.

### QasSortable (*)

Sincronizado em _20/01/2022 as 18h30_.

- Propriedade `options` alterada para `sortableOptions`.
- Slot scoped `sorted` removido e adicionado `v-model:sorted` (usado somente para ter acesso reativo da lista sorteada, não é um two way data bind).
- Biblioteca `sortablejs` versão `^1.12.0` atualizada para a versão `^1.14.0`.
- Evento `update:sorted` adicionado.
- Obs: O metodo `replace` ainda não foi testado pois não temos uma API para testar.

### QasDialog

Sincronizado em _07/02/2022 as 16h25_.

- Propriedade `value` alterada para `modelValue`.
- Propriedade `btnActions` alterada para `btnActionsProps`.
- Propriedade `usePlugin` adicionada para utilizar o componente no `this.$qas.dialog` como "custom dialog".
- Adicionado propriedade `useCloseIcon` para controlar o icone de fechar.
- Removido computada e metodos referente `QDialog`, utilizar os metodos como `show()` pegando direto a referencia do componente `QasDialog`.
- Evento `input` alterado para `update:modelValue`.

### QasTextTruncate

Sincronizado em _07/02/2022 as 17h40_.

- Propriedade `dialog` alterada para `dialogProps`.

### QasTableGenerator

Sincronizado em _08/02/2022 as 15h50_.

- Propriedade `value` com default `true` para fazer o scroll na lista quando o usuário arrasta o mouse.
- Adicionado propriedade `emptyResultText` default `-` para controlar o texto quando não tiver valor.
- Adicionado componente `QasBox` como default.
- Removido propriedade `order` (não estava sendo utilizada).

### QasCheckboxGroup

Sincronizado em _25/03/2022 as 12h10_.

- Corrigido bug quando não tinha children.
- Propriedade `value` alterada para `modelValue`.
- Evento `input` alterado para `update:modelValue`.

### QasDateTimeInput

Sincronizado em _08/02/2022 as 16h16_.

- Propriedade `value` alterada para `modelValue`.
- Propriedade `dateOptions` alterada para `dateProps`.
- Propriedade `timeOptions` alterada para `timeProps`.
- Removido evento `mounted` você pode escutar o hook mounted do componente pelo `@vnode-mounted`
- Evento `input` alterado para `update:modelValue`.

### QasGridGenerator

Sincronizado em _09/02/2022 as 9h15_.

- Propriedade `value` alterada para `modelValue`.
- Propriedade `dateOptions` alterada para `dateProps`.
- Propriedade `timeOptions` alterada para `timeProps`.
- Removido evento `mounted` você pode escutar o hook mounted do componente pelo `@vnode-mounted`.
- Evento `input` alterado para `update:modelValue`.

### QasGallery

Sincronizado em _09/02/2022 as 14h00_.

- Propriedade `items` alterada para `images`.
- Alterado nomenclatura interna do componente.

### QasDialogRouter

Sincronizado em _10/02/2022 as 13h50_.

### QasUploader

Sincronizado em _15/02/2022 as 18h50_.

- Propriedade `value` alterada para `modelValue`.
- Adicionada nova propriedade `uploading` para ser usada como `v-model:uploading`.
- Alguns nomes internos alterados.
- Evento `input` alterado para `update:modelValue`.
- Novo evento `update:uploading`.

### ~~QasCustomUploader~~ (removido)

- Componente era para ser utilizado como wrapper do [QUploader](https://quasar.dev/vue-components/uploader#introduction), extendendo ele e sobreescrevendo funcionalidades para criar um resize antes de fazer o upload. Porém na v2 do quasar, isto não funcionava mais, então a logica foi movida para dentro do `QasUploader`, tirando a necessidade de existencia deste componente.

### QasSignaturePad

Sincronizado em _15/02/2022 as 18h50_.

- Propriedade `value` alterada para `modelValue`.
- Evento `input` alterado para `update:modelValue`.

### QasField

Sincronizado em _16/02/2022 as 10h43_.

- Adicionado `QasInput` como campo para `type number`.
- Adicionado `QasInput` como campo para `type textarea`.
- Propriedade `value` alterada para `modelValue`.
- Evento `input` alterado para `update:modelValue`.

### QasFormGenerator

Sincronizado em _16/02/2022 as 10h43_.

- Propriedade `value` alterada para `modelValue`.
- Propriedade `fieldsEvents` removida.
- Evento `input` alterado para `update:modelValue`.

### QasFormView

Sincronizado em _23/03/2022 as 16h00_.

- Propriedade `value` alterada para `modelValue`.
- Adicionado propriedade `ignoreKeysInUnsavedChanges` para ignorar chaves na validação de quando sai da tela com alterações não salvas.
- Classes `container` e `spaced` já vem como padrão quando a propriedade `dialog` é "false".
- Slot `header`, removido os escopos `(fields, metadata, errors)`.
- Slot `default`, removido os escopos `(fields, metadata, errors)`.
- Slot `actions`, removido os escopos `(fields, metadata, errors)`.
- Slot `footer`, removido os escopos `(fields, metadata, errors)`.
- Adicionado `v-model:errors` (não reativa `markRaw`, com intuito facilitar o uso no script).
- Adicionado `v-model:fields` (não reativa `markRaw`, com intuito facilitar o uso no script).
- Adicionado `v-model:metadata` (não reativa `markRaw`, com intuito facilitar o uso no script).
- Adicionado `v-model:fetching`.
- Adicionado `v-model:submiting`.
- Adicionado evento `update:fetching`.
- Adicionado evento `update:submiting`.
- Adicionado evento `update:errors`.
- Adicionado evento `update:fields`.
- Adicionado evento `update:metadata`.
- Evento `input` alterado para `update:modelValue`.

### QasDelete

Sincronizado em _24/02/2022 as 14h00_.

- Alguns nomes internos alterados.
- Repassando todos os slots de todos os componentes dinâmicos.
- Propriedade `dialog` alterada para `dialogProps`.
- Adicionado `v-model:deleting`.
- Adicionado evento `update:deleting`.
- Adicionado evento `delete-succes` ao `window` com os payloads: `{ id, entity, url }` para controle interno no `QasFormView`.

### QasSingleView

Sincronizado em _23/03/2022 as 16h00_.

- Propriedade `value` alterada para `result`.
- Classes `container` e `spaced` já vem como padrão quando a propriedade `dialog` é "false".
- Slot `header`, removido os escopos `(fields, metadata, result, errors)`.
- Slot `default`, removido os escopos `(fields, metadata, result, errors)`.
- Adicionado parametro `params` para o metodo `fetchSingle`.
- Adicionado `v-model:errors` (não reativa `markRaw`, com intuito facilitar o uso no script).
- Adicionado `v-model:fields` (não reativa `markRaw`, com intuito facilitar o uso no script).
- Adicionado `v-model:metadata` (não reativa `markRaw`, com intuito facilitar o uso no script).
- Adicionado `v-model:fetching`.
- Adicionado evento `update:fetching`.
- Adicionado evento `update:errors`.
- Adicionado evento `update:fields`.
- Adicionado evento `update:metadata`.
- Evento `input` alterado para `update:result`.

### QasListView

Sincronizado em _23/03/2022 as 16h00_.

- Propriedade `noFilter` alterada para `useFilter`.
- Classes `container` e `spaced` já vem como padrão quando a propriedade `dialog` é "false".
- Slot `header`, removido os escopos `(fields, metadata, results)`.
- Slot `filter`, removido os escopos `(fields, metadata, results, entity)`.
- Slot `default`, removido os escopos `(fields, metadata, results)`.
- Slot `empty-results`, removido os escopos `(fields, metadata)`.
- Escopo `errors` removido do slot `filter` (consegue acessar pelo `v-model:errors`).
- Adicionado parametro `filters` para o metodo `fetchList` ele vai sobreescrever a prop `filters` que já é repassada hoje.
- Adicionado `v-model:results` (não reativa `markRaw`, com intuito facilitar o uso no script).
- Adicionado `v-model:errors` (não reativa `markRaw`, com intuito facilitar o uso no script).
- Adicionado `v-model:fields` (não reativa `markRaw`, com intuito facilitar o uso no script).
- Adicionado `v-model:metadata` (não reativa `markRaw`, com intuito facilitar o uso no script).
- Adicionado `v-model:fetching`.
- Adicionado evento `update:results`.
- Adicionado evento `update:fetching`.
- Adicionado evento `update:errors`.
- Adicionado evento `update:fields`.
- Adicionado evento `update:metadata`.

### QasFilters

Sincronizado em _24/02/2022 as 19h00_.

- Propriedade `badges` alterada para `useChips`
- Propriedade `noSearch` alterada para `useSearch` com default `true`.
- Propriedade `noFilterButton` alterada para `useFilterButton` com default `true`.
- Propriedade `searchOnType` alterada para `useSearchOnType` .

### QasMap

Sincronizado em _04/03/2022 as 14h20_.

- Propriedade `hasSearch` removida (não estava sendo utilizada).
- Alterado biblioteca `gmap-vue` para `@fawmi/vue-google-maps` pois o gmap-vue não tem suporte para o `vue 3`.

### QasPageHeader

Sincronizado em _03/03/2022 as 12h00_.

- Propriedade `noBreadcrumbs` alterada para `useBreadcrumbs`.

### QasProfile

Sincronizado em _25/02/2022 as 11h00_.

- Propriedade `hideStatus` removida (não estava sendo utilizada).
- Repassado todos os slots do `QasGridGenerator`.

## Helpers

### label.js

Sincronizado em _19/10/2021 as 17h17_.

- Renomeado para `addCounterSuffix`.

### ~~historyHandler.js~~ (removido)

Sincronizado em _03/03/2022 as 12h00_.

Removido de `helpers` e adicionado no folder `store` para ser utilizado como uma store com `reactive`.

## Mixins

### FormMixin

- Removido computada `$_resolvedRoute` não estava sendo utilizada.

### GeneratorMixin

- Adicionado padrão `mx_` nos metodos e computada.
- metodo `breakpoint` renomeado para `mx_getBreakpoint`.

### ~~uploaderMixin~~ (removido)

- `QasCustomUploader` foi removido tirando a necessidade de exitir este mixin.

### ~~usavedChangesMixin~~ (removido)

- Agora o componente `QasFormView` é responsável por verificar se há alterações não salvas, não havendo mais necessidade de um mixin externo.

### ~~mapMarkersMixin~~ (removido)

- Mixin estava muito ligado a logica do negocio e não estava generico, por hora vms deixar ele fora do asteroid.

## Plugins

### Dialog

- Adicionado novo plugin de Dialog, `this.$qas.dialog()`.

## Store

### history.js (historyHandler.js)

Sincronizado em _03/03/2022 as 12h00_.

- Arquivo renomeado para `history.js`.
- Arquivo exporta agora o `history` (proxy), `getPreviousRoute`, `addRoute` e `destroyRoutes`.
