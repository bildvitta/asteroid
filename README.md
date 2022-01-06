<img src="https://img.shields.io/npm/v/@bildvitta/quasar-ui-asteroid.svg?label=quasar-ui-asteroid">
<img src="https://img.shields.io/npm/v/@bildvitta/quasar-app-extension-asteroid.svg?label=quasar-app-extension-asteroid">

# Asteroid

This `App Extension` contains methods, components and styles that will assist in building a C.R.U.D. using *Vue* and *Quasar*. It was initially designed to be used in accordance with [our API] standards (http://github.com/bildvitta/api), but can be adapted to any _backend_ as long as it maintains the original standards.

Note: Some Quasar components must be imported manually inside [quasar.config.js](https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework) (e.g., when you are using `QasFormView` you have to import [QPage](https://quasar.dev/layout/page#Introduction)).


## Structure

* [/app-extension](app-extension) - Quasar app extension
* [/ui](ui) - standalone npm package

## Environment variables

| Variables | Description |
|:-|:-|
| `BUCKET_URL` | Hosting address of _assets_. |
| `SERVER_BASE_URL` | Base server access address. |

## Instalation

```
$ quasar ext add @bildvitta/asteroid
```

Open you `css`/`quasar.variables.scss` and put it at end of file:

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

# Donate

If you appreciate the work that went into this project, please consider [donating to Quasar](https://donate.quasar.dev).

# License

MIT (c) Bild & Vitta <systemteam@bild.com.br>
