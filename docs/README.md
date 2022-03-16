# Asteroid Docs

Esta é uma aplicação criada utilizando o Quasar com o objetivo de documentar todos os componentes, diretivas e plugins do Asteroid. Aqui também é possível encontrar exemplos de uso de cada componente.

Neste documento você irá encontrar as informações sobre como instalar, rodar e escrever documentações.

## Instalando e inicializando a aplicação

Primeiramente, é necessário instalar as dependências.

``` bash
$ npm install
```

Agora basta iniciar a aplicação em modo de desenvolvimento.

``` bash
$ quasar dev
```

Pronto, agora é só você escrever as suas documentações.

## Escrevendo documentações

Todas as documentações são escritas utilizando Markdown, por isso é possível que você precise ler um pouco mais sobre a sintaxe [neste guia](https://www.markdownguide.org/) antes de começar a escrever.

Os documentos são criados na pasta `docs/src/pages` e o nome do arquivo será a rota da página na documentação, então se você criar um arquivo em `docs/src/pages/foo/bar.md`, a rota será `/foo/bar`.

Para adicionar ao menu, você deve editar o arquivo `docs/src/assets/menu.js` e adicionar o nome e a rota da página na posição que você quer a sua página apareça.

Como bons programadores, nós demos uma turbinada no Markdown, adicionando a possibilidade de criar uma "caixa personalizada" para alertas, avisos ou dicas. Para usar usas essas caixas, basta seguir o exemplo abaixo:

**Danger** (Perigo, caixa na cor vermelha).

``` md
::: danger
Cuidado ao utilizar **este componente**.
:::
```

**Tip** (Dica, caixa na cor verde).

``` md
::: tip
Olha só essa dica para utilizar **este componente**.
:::
```


**Warning** (Aviso, caixa na cor amarela).

``` md
::: warning
Atenção ao utilizar **este componente**.
:::
```

Outra turbinada é a possibilidade de utilizar componentes do Quasar direto no Markdown. Existem dois componentes mais utilizados:

**DocApi**

Use o DocApi desta forma:

``` html
<doc-api file="xpto/QasXpto" name="QasXpto" />
```

Onde `file` é o caminho do arquivo YML de documentação do componente e `name` é o nome do componente.

**DocExample**

Use o DocExample desta forma:

``` html
<doc-example file="QasXpto/Basic" title="Básico" />
```

Onde `file` é o caminho do arquivo Vue com o exemplo (fica na pasta `src/examples`) e `title` é o título do exemplo.
