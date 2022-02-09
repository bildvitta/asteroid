# Changelog

## Components

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

Sincronizado em _19/10/2021 as 17h17_.

- Propriedade `value` alterada para `modelValue`.
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

Sincronizado em _10/01/2022 as 18h34_.

- Propriedade `bgColorClass` removida (pode fazer o controle passando `class` direto no componente).
- Propriedade `colorClass` alterada para `tabClass` (pode passar mais classes além de cores).
- Propriedade `value` alterada para `modelValue`.
- Adicionado propriedade `counterProps`.
- Evento `input` alterado para `update:modelValue`.

### QasSearchBox

Sincronizado em _13/01/2022 as 14h46_.

- Propriedade `hideEmptySlot` alterada para `useEmptySlot`.
- Propriedade `value` alterada para `modelValue`.
- Slot `empty` alterado para `empty-result`.
- Evento `input` alterado para `update:modelValue`.
- Evento `emptyResult` alterado para `empty-result`.

### QasCard

Sincronizado em _13/01/2022 as 15h13_.

- Adicionado propriedade `formMode` (era usada no código mas não existia a propriedade).

### QasActionsMenu

Sincronizado em _13/01/2022 as 18h23_.

- Propriedade `hideLabel` removido (para remover o label é só não passar ele).
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

Sincronizado em _19/01/2022 as 16h02_.

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
- Propriedade sync `isEmpty` removida e alterada para `v-model:emptyModel`.
- Biblioteca `signature_pad` versão `^3.0.0-beta.4` atualizada para a versão `^4.0.1`.
- Evento `update:emptyModel` adicionado.

### QasSortable (*)

Sincronizado em _20/01/2022 as 18h30_.

- Propriedade `options` alterada para `sortableOptions`.
- Slot scoped `sorted` removido e adicionado `v-model:sortedModel` (usado somente para ter acesso reativo da lista sorteada, não é um two way data bind).
- Biblioteca `sortablejs` versão `^1.12.0` atualizada para a versão `^1.14.0`.
- Evento `update:sortedModel` adicionado.
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

Sincronizado em _08/02/2022 as 16h10_.

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

## Helpers

### label.js

Sincronizado em _19/10/2021 as 17h17_.

- Renomeado para `addCounterSuffix`.

## Mixins

### GeneratorMixin
- Adicionado padrão `$_` nos metodos e computada.
- metodo `breakpoint` renomeado para `$_getBreakpoint`.

## Plugins

### Dialog

- Adicionado novo pluing de Dialog, `this.$qas.dialog()`.
