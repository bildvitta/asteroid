---
title: rules
---

Conjunto de funções para serem usadas como validações na prop `rules` dos componentes que aceitam.

Funções: `required`

- [asset](/helpers/rules/#required)

### Funções

#### Required
Função para validar se um campo está com valor.

```html
import { required } from 'asteroid'

<qas-input :rules=[required] />
<qas-input :rules=[value => required(value, 'Minha mensagem customizada para quando der erro')] />
```
