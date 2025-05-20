## BREAKING CHANGES
- Todos locais que usarem component dinâmico `<component :is="QasBtn" />` do asteroid, precisa ser importado do asteroid `import { QasBtn } from 'asteroid'`, porque o auto import não consegue identificar o componente sozinho.
- Removido opção "thirdPartyComponents" e "autoRemoveThirdDependencies", agora precisa instalar/desinstalar manualmente as libs necessárias para o `QasMap` e `QasChartView`.
- Instalar dependências manualmente para os componentes `QasMap` e `QasChartView`.
