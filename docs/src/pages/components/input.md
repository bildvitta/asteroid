---
title: QasInput
---

Componente para input que implementa o "QasInput" repassando propriedades, slots e eventos.

<doc-api file="input/QasInput" name="QasInput" />

:::warning
Neste componente é um "wrapper" do [QInput](https://quasar.dev/vue-components/input#introduction) o que significa que ele repassa todos os slots, eventos e propriedades.
:::

:::tip
Propriedade `mask` vem do `QInput` e serve para definir um máscara para o input, porem nosso componente implementa algumas mascaras pré-definidas, como:

```bash
- company-document (CNPJ) -> ##.###.###/####-##
- document (CPF/CNPJ) -> ###.###.###-### | ##.###.###/####-##
- personal-document (RG) -> ##.###.###-##
- phone (Telefone) -> (##) ####-##### | (##) #####-####
- postal-code (CEP) -> #####-###
```

Caso seja passado uma mask que não seja essas acima, será usado a que foi passada.
:::

## Uso

<doc-example file="QasInput/Basic" title="Básico" />
<doc-example file="QasInput/Masks" title="Mascaras" />
