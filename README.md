<img src="https://img.shields.io/npm/v/@bildvitta/quasar-ui-asteroid.svg?label=quasar-ui-asteroid">
<img src="https://img.shields.io/npm/v/@bildvitta/quasar-app-extension-asteroid.svg?label=quasar-app-extension-asteroid">

# Asteroid
Esta `App Extension` contém metodos, componentes e estilos para auxiliar o desenvolvimento de aplicativos com Quasar, principalmente C.R.U.D. (Create, Read, Update, Delete), seguindo nosso Design System.

Observação: Alguns componentes do Quasar precisam ser importados manualmente dentro de [quasar.config.js](https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework) (por exemplo quando usar o `QasFormView` terá que importar o [QPage](https://quasar.dev/layout/page#Introduction)).

## Estrutura
* [/app-extension](app-extension) - Quasar app extension
* [/ui](ui) - standalone npm package

## Variaveis de ambiente

| Variables | Description |
|:-|:-|
| `BUCKET_URL` | Endereço de hospedagem do _assets_. |
| `SERVER_BASE_URL` | Endereço de acesso do servidor base. |
| `SERVER_TIMEOUT` | Tempo de espera para API responder. |
| `MAPS_API_KEY` | Chave do Google Maps. |

## Instação

```
$ quasar ext add @bildvitta/asteroid
```

Na raiz do seu projeto, entre na pasta `src/css/quasar.variables.scss` e coloque este código no final do arquivo:

``` scss
// Asteroid
@mixin setBrand($name, $color) {
  :root {
    --q-color-#{$name}: #{$color};
  }

  .text-#{$name} {
    color: $color !important;
    color: var(--q-color-#{$name}) !important;
  }

  .bg-#{$name} {
    background: $color !important;
    background: var(--q-color-#{$name}) !important;
  }
}

$primary-contrast: #eaeaff;
$secondary-contrast: #ecffea;

@include setBrand(primary-contrast, $primary-contrast);
@include setBrand(secondary-contrast, $secondary-contrast);
```

## Usage

After the installation the app-extension is ready to be used, check [here](https://asteroid-og52m.ondigitalocean.app) the documentation.

## Development

```
$ git clone https://github.com/bildvitta/asteroid
```

Go to `/app-extension` folder:

```
$ npm i
```

Go to `/ui` folder:

```
$ npm i
```

Now in `ui/dev` folder:

```
$ npm i
$ quasar dev
```

Inside `ui/dev` you can test the app-extension.

#### Testing with npm link

In `root` folder:

```
$ npm i
```

Go to `/ui` folder:

```
$ npm i
$ npm link
```

Now go to `/app-extension` folder:

```
$ npm i
$ npm link
$ npm link @bildvitta/quasar-ui-asteroid
```

You have linked your app-extension and ui folder, go to the project that you are using `asteroid` and link them:

```
$ npm link @bildvitta/quasar-app-extension-asteroid
$ npm link @bildvitta/quasar-ui-asteroid
```

Now your project is linked with asteroid directory and not anymore with is installed within node_modules of project.

To unlink asteroid directory:

```
$ npm i
```

## Uninstall

```
$ quasar ext remove @bildvitta/asteroid
```

# License

MIT (c) Bild & Vitta <systemteam@bild.com.br>
