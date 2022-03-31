---
title: QasPasswordStrengthChecker
---

Componente para checar nível de força da senha.

<doc-api file="password-strength-checker/QasPasswordStrengthChecker" name="QasPasswordStrengthChecker" />

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

<doc-example file="QasPasswordStrengthChecker/Basic" title="Básico" />
