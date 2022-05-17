# Changelog
Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Para encontrar de uma forma mais detalhada todas as mudanças da `versão 2` para a `versão 3`, navegue até o arquivo `/docs/src/pages/start/upgrade-guide.md`.
Neste arquivo (CHANGELOG.MD) você encontrará somente as mudanças referentes a versão 3.

### Sobre os "BREAKING CHANGES"
Podemos ter pequenas breaking changes sem alterar o `major` version, apesar de serem pequenas, podem alterar o comportamento da funcionalidade caso não seja feita uma atualização, **preste muita atenção** nas breaking changes dentro das versões quando existirem.

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

### Alterado
- `QasSearchBox`: alterado valor default da prop `fuseOptions` para `{ threshold: 0.1, ignoreLocation: true }`. 
- `QasSelect`: alterado valor default da prop `fuseOptions` para `{ threshold: 0.1, ignoreLocation: true, keys: ['label', 'value'] }`.

### Corrigido
- Adicionado redirect para status code `> 500` (antes já existia a pagina para isto, mas não era redirecionado).
- `QasTableGenerator`: corrigido bug `Uncaught TypeError: this.scrollOnGrab.destroyEvents is not a function`.

## [3.0.0-beta.7] - 10-05-2022
### Adicionado
- `QasNumericInput`: adicionado novo evento "update-model" para disparar toda vez que acontece um novo input.

### Alterado
- `QasListView`: adicionado propriedade `deep` para o watch do `resultsModel`.
- `QasPasswordInput`: alterado valor `bottom-slots` para `false`.
- `QasFilters`: adicionado `max-with="240px"` e `full-width` dentro do `QMenu`.

### Corrigido
- `QasListView`: corrigido bug de filtros ao fazer o `fetchList`.
- `QasTransfer`: corrigido bug quando v-model já existe valor antes de existir `options`.
- `QasNumericInput`: corrigido bug no two-way data binding.

## [3.0.0-beta.6] - 05-06-2022
### Alterado
- Propriedade `hideLabelOnSmallScreen` só funciona quando o "rotulo" do botão é passado via prop `label` e não mais por slot default também.

### Corrigido
- Corrigido `QasBtn`, quando usa a prop `hideLabelOnSmallScreen` e utiliza o slot default, quando a tela está em tamanho pequeno, o botão remove o slot default, o problema disto é que se usar com um `QMenu` dentro do botão, o `QMenu` não é chamado pois não existe mais slot default.

[3.0.0-beta.9]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.8...v3.0.0-beta.9?expand=1
[3.0.0-beta.8]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.7...v3.0.0-beta.8?expand=1
[3.0.0-beta.7]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.6...v3.0.0-beta.7?expand=1
[3.0.0-beta.6]: https://github.com/bildvitta/asteroid/compare/v3.0.0-beta.5...v3.0.0-beta.6?expand=1
