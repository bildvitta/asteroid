---
title: QasPasswordInput
---

<div class="flex q-gutter-x-md">
  <doc-link title="Componente" name="QasInput" to="/components/input" />
  <doc-link title="Componente" name="QasPasswordStrengthChecker" to="/components/password-strength-checker" />
  <doc-link title="Quasar Componente" name="QIcon" href="https://quasar.dev/vue-components/icon#introduction" />
</div>

Componente para input de senhas que implementa o "QasInput" repassando todos os slots menos "#hint" e todos os eventos.

<doc-api file="password-input/QasPasswordInput" name="QasPasswordInput" />

:::warning
Neste componente é um "wrapper" do `QasInput` o que significa que ele repassa todos os slots **menos** o `#hint` que é fixo e todos os outros eventos e propriedades.
:::

:::tip
Propriedade `specials` serve para definir caracteres especiais que serão aceitos na senha, por exemplo:
O valor default é:

**/[!@#$%^&*()_+\-=[\]{}|;:'",<.>/?`~]/g**


Ele aceita os seguintes caracteres:

**! @ # $ % ^ & * ( ) _ + \ - = [ ] { } | ; : ' " , < . > / ? ` ~**


:::

:::tip
Propriedade `levels` é um objeto de objetos, onde a chave dentro deste objeto representa o nível de segurança, indo de 0 a 4, onde 0 é o nível mais fraco e 4 o mais forte.
Valor default:

```js
{
  0: {
    color: 'negative',
    label: 'Muito fraco',
    progress: 0.05,
    textClass: 'text-negative'
  },

  1: {
    color: 'warning',
    label: 'Fraco',
    progress: 0.25,
    textClass: 'text-warning'
  },

  2: {
    color: 'warning',
    label: 'Bom',
    progress: 0.5,
    textClass: 'text-warning'
  },

  3: {
    color: 'positive',
    label: 'Forte',
    progress: 0.75,
    textClass: 'text-positive'
  },

  4: {
    color: 'positive',
    label: 'Muito forte',
    progress: 1,
    textClass: 'text-positive'
  }
}
```
:::

## Uso

<doc-example file="QasPasswordInput/Basic" title="Básico" />
