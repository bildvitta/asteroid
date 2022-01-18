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

### QasBox

Sincronizado em _19/10/2021 as 17h17_.

- Propriedade `formMode` removida em favor de `outlined` and `unelevated`;

### QasBreakLine

Sincronizado em _19/10/2021 as 17h17_.

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
- Alterado valor "default" da propriedade `label` para `Configurações.

### QasSelectList

Sincronizado em _13/01/2022 as 18h23_.

- Propriedade `options` nomeado para `list`.
- Alterado valor "default" da propriedade `label` para `Configurações.
- Propriedade `value` alterada para `modelValue`.
- Scoped Slot `item` e `item-action` agora só tem acesso aos metodos `add`, `handleClick`, `updateModel` e `remove`.
- Evento `input` alterado para `update:modelValue`.

### QasInput

Sincronizado em _18/01/2022 as 16h53_.

- Propriedade `value` alterada para `modelValue`.
- Evento `input` alterado para `update:modelValue`.

### QasListItems

Sincronizado em _18/01/2022 as 19h11_.

- Adicionado propriedade `useSectionActions` para controlar o "q-item-section side".
- Propriedade `useIconRedirect` alterada para `redirectOnIcon` com valor "default" `true`.

## Helpers

### label.js

Sincronizado em _19/10/2021 as 17h17_.

- Renomeado pata `addCounterSuffix`.