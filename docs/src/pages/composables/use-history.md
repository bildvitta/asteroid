---
title: useHistory
---

O useHistory contém todo o controle de histórico de rotas dentro do ciclo de vida da aplicação

```js
import { useHistory } from 'asteroid'

const { addRoute, destroyRoutes, getPreviousRoute, history, hasPreviousRoute } = useHistory()

addRoute(this.$route) 
// Adiciona a rota atual no histórico de rotas

getPreviousRoute(this.$route) 
// Retorna a rota anterior em relação a rota atual

destroyRoutes([this.$route, { name: 'MinhaRotaDeExemplo' }]) 
// Remove do histórico a rota atual e a "MinhaRotaDeExemplo"

history.list
// Retorna todo o histórico de rotas salvas

hasPreviousRoute 
// Retorna true caso tenha mais de 1 rota no history.list
```