<img src="https://img.shields.io/npm/v/@bildvitta/quasar-ui-asteroid.svg?label=quasar-ui-asteroid">
<img src="https://img.shields.io/npm/v/@bildvitta/quasar-app-extension-asteroid.svg?label=quasar-app-extension-asteroid">

# Asteroid
This `App Extension` contains methods, components and styles that will assist in building a C.R.U.D. using *Vue* and *Quasar*. It was initially designed to be used in accordance with [our API] standards (http://github.com/bildvitta/api), but can be adapted to any _back-end_ as long as it maintains the original standards.

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

## Usage
After the installation the app-extension is ready to be used, check [here](https://asteroid-og52m.ondigitalocean.app) the documentation.

## Develop usage
```
$ git clone https://github.com/bildvitta/asteroid
```

In `root` folder:
```
$ npm i
```

Go to `/app-extension` folder:
```
$ npm i
$ npm link
```

Now go to `/ui` folder:
```
$ npm i
$ npm link
```

You have linked your app-extension and ui folder,  go to the project that you are using `asteroid` and link them.
Inside your project:

```
$ npm link @bildvitta/quasar-app-extension-asteroid
$ npm link @bildvitta/quasar-ui-asteroid
```

Now your project is linked with asteroid directory and not anymore with is installed within node_modules of project.
For unlink asteroid directory, inside your project:

```
$ npm i
```

## Storybook and Jest develop usage
```
$ git clone https://github.com/bildvitta/asteroid
```

Go to `/ui` folder:
```
$ npm i
```

[Storybook](https://storybook.js.org/docs/vue/get-started/introduction) and [Jest](https://vue-test-utils.vuejs.org) needs vue as a dependency, to install it run the code inside `/ui` folder:
```
$ npm run install-peer
```

Run storybook:
```
$ npm run storybook
```

Run all tests:
```
$ npm run test
```

Run tests in watch mode:
```
$ npm run test:watch
```

Note: If asteroid is linked with some project and you run `npm run install-peer` the components will stop working inside the project because of vue dependency, to make they work again, inside the `/ui` folder run:
```
$ npm i
```

But now you have lost the link, run again:
```
$ npm link
```

## Uninstall

```
$ quasar ext remove @bildvitta/asteroid
```

# Donate
If you appreciate the work that went into this project, please consider [donating to Quasar](https://donate.quasar.dev).

# License
MIT (c) Caio Tarifa <caiotarifa@gmail.com>
