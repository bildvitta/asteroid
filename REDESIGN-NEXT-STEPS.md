## BREAKING CHANGES
- Todos locais que usarem component dinâmico `<component :is="QasBtn" />` do asteroid, precisa ser importado do asteroid `import { QasBtn } from 'asteroid'`, porque o autoimport não consegue identificar o componente sozinho.
- Removido opção "thirdPartyComponents", agora precisa instalar manualmente as libs necessárias para o `QasMap` e `QasChartView`.

