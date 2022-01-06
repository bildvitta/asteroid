# Changelog

## Components

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

Sincronizado em _19/10/2021 as 17h17_.

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

### QasPasswordStrengthChecker

Sincronizado em _19/10/2021 as 17h17_.

- Propriedade `value` alterada para `password`.
- Propriedade `weak` alterada para `minlength`.
- Propriedade `pattern` removida em favor de `useLowercase`, `useNumbers`, `useSpecial` e `useUppercase`.
- Propriedade `specials` adicionada para definir os caracteres especiais.
- Evento `password-success` alterado para `update:modelValue`.

## Helpers

### label.js

Sincronizado em _19/10/2021 as 17h17_.

- Renomeado pata `addCounterSuffix`.