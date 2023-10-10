---
title: QasAppUser
---

Componente utilizado no `QasAppBar` e `QasAppMenu` para exibir o nome do usuário e a foto de perfil.

<doc-api file="app-user/QasAppUser" name="QasAppUser" />

:::info
A funcionalidade de troca de vínculo de empresa é ativada quando existe mais de 1 opção na prop `companiesOptions`, é executado uma API com o seguinte endpoint:

`PATCH -> users/me`

Enviando para o body da requisição o novo `companies`.

Quando existe apenas uma opção, é exibido o select como forma de informação de vinculo atual.
:::

## Uso
<doc-example file="QasAppUser/Basic" title="Básico" />
