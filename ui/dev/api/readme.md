# api

A **naVpi** application.

## Run

If this application is new, please generate models, migrate and synchronize before running the server.

``` shell
$ npx navpi serve
```

## Create

### Generate

``` shell
$ npx navpi generate model post title description:textarea
```

### Migrate

``` shell
$ npx navpi db:migrate
$ npx navpi db:migrate --reset
```

### Seed

``` shell
$ npx navpi db:seed
$ npx navpi db:seed --entries 30
```
