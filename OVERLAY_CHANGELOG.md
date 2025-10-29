## BREAKING CHANGES
- **Possíveis breaking changes**: mudanças referentes ao overlay pode quebrar alguns componentes a nível de rota, ou então a nível de layout.
- adicionado validação `isBackgroundOverlay` no watch da rota por conta do overlay navigation.
  - `QasChartView`.
  - `QasFilters`.
  - `QasListView`.
  - `QasSingleView`.
- `mixins/view.js`: removido computada `mx_componentClass` em favor de usar o componente `QasContainer`.
- `composables/use-view.js`. removido computada `componentClass` em favor de usar o componente `QasContainer`.
- `QasBox`: modificado valores padrões das props `outlined` e `unelevated` para quando estiver dentro de um overlay (vai ficar com borda).

### Adicionado
- Adicionado alterações e recursos para overlay navigation.
- Adicionado novo composable `useOverlayNavigation`.
- `QasCard`:
  - adicionado prop `useSelection`.
  - adicionado slot `header`. ([#1408](https://github.com/bildvitta/asteroid/issues/1408))
  - adicionado model `selected`.
  - adicionado prop `trueValue`.
  - adicionado prop `falseValue`.
- Adicionado novo componente `QasContainer`.
- `QasAlert`:
  - adicionado novo status `success`.
  - modificado controle do QasBox para controle automático de overlay navigation.
- `QasBtn`: adicionado nova propriedade `tooltip`.
- `QasDrawer`: adicionado novo slot `header` (usado no overlay).
- `QasFormView`:
  - adicionado validação interna para travar o dialog de overlay quando estiver fazendo um submit.
  - adicionado validação para remover botão de voltar automaticamente quando estiver dentro de um o overlay.
- `QasPageHeader`: adicionado validação para remover breadcrumbs automaticamente quando estiver dentro de um overlay.
- `QasTabsGenerator`: adicionado nova propriedade `querySlug` para controle automático de mudança de query na rota.

### Modificado
- `QasBox`: modificado valores padrões das props `outlined` e `unelevated` para quando estiver dentro de um overlay (vai ficar com borda).
- `QasBtn`: alterado default da prop `size` interna para `sm` quando o botão estiver dentro de um `QasBtn` e for variante `primary` ou `secondary`.
- `QasCard`: removido elemento HTML header e espaçamento do header quando não tiver slot header, title ou prop title.
- `QasTooltip`: modificado tipografia para `text-caption`.
- adicionado validação `isBackgroundOverlay` no watch da rota por conta do overlay navigation.
  - `QasChartView`.
  - `QasFilters`.
  - `QasListView`.
  - `QasSingleView`.
- `ui/src/mixins/context.js` | `ui/src/composables/use-context.js`: modificado uso do `route` do vue-router para usar `route` `useOverlayNavigation`.

### Removido
- `mixins/view.js`: removido computada `mx_componentClass` em favor de usar o componente `QasContainer`.
- `composables/use-view.js`. removido computada `componentClass` em favor de usar o componente `QasContainer`.
