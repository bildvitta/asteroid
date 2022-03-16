# Asteroid Docs

Esta é uma aplicação criada utilizando o Quasar com o objetivo de documentar todos os componentes, diretivas e plugins do Asteroid.

Neste leia-me você irá encontrar as informações sobre como instalar, rodar e escrever documentações.

## Instalando e inicializando a aplicação

Primeiramente, é necessário instalar as dependências.

``` bash
$ npm install
```

Agora é só inicializar a aplicação em modo de desenvolvimento.

``` bash
$ quasar dev
```

Pronto, escreva as suas documentações.

## Escrevendo documentações

Todas as documentações são escritas em Markdown, por isso é interessante estar familiarizado com a sintaxe, [veja este guia](https://www.markdownguide.org/) antes de começar a escrever.

Os documentos são criados na pasta `docs/src/pages` e o nome do arquivo será a rota da página na documentação. Por exemplo, se você criar um arquivo em `docs/src/pages/foo/bar.md`, a rota será `/foo/bar`.

Para adicionar ao menu, edite o arquivo `docs/src/assets/menu.js` e adicione o nome e a rota da página na posição desejada.

Como bons programadores, nós demos uma turbinada no Markdown, adicionando a possibilidade de criar uma "caixa personalizada" para alertas, avisos ou dicas. Veja abaixo como utilizar.

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

Outra turbinada é a possibilidade de utilizar componentes do Quasar direto no Markdown. Existem dois componentes escritos para isso, são eles:

### DocApi

``` html
<doc-api file="xpto/QasXpto" name="QasXpto" />
```

- `file`: é o caminho do arquivo YML de documentação do componente;
- `name`: é o nome do componente.

### DocExample

``` html
<doc-example file="QasXpto/Basic" title="Básico" />
```

- `file`: é o caminho do arquivo Vue com o exemplo (fica na pasta `src/examples`);
- `title`: é o título do exemplo.
