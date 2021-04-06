# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.6.0 - 2021-04-06

### Added
- Added navpi in `ui/dev`. Now it possible use CRUD Components of asteroid like `QasFormView`
- Added model `users.yml` in `ui/dev`
- Added `VuexStoreModule` in `ui/dev`
- Added `UsersCreate.vue` and `UsersList.vue` in `ui/dev`
- Added new computed and methods for working with validations internally in `QasInput`
- Click event in all header section

### Changed
- Changes in `ui/dev` for suporte `VuexStoreModule`
- Changed root element of `QasField` and `QasInput` to `div` for validations reasons
- `QasInput` refactored code
- Changed documentation
- Default class is text-bold for selected label in qas-tabs-generator
- Direction of item in file list

### Removed
- `commitlint.config.js`
- `.versionrc.json`

## 1.5.0 - 2021-04-01

### Added
- New prop added bgColorClass to be attributed to the background of tab
- New prop added colorClass to be attributed to the text of all tabs
- New prop added indicatorColor to be attributed to the indicator (the underline) of the active tab
- Add handleHistory in history.js
- Quasar project inside `ui/src/dev` for develop usage (don't need npm link anymore)
- Added new slot `empty-results` inside `QasListView`
- Added `.npmignore` inside `ui/src/dev`

### Changed
- Primary color is default color for all labels in qas-tabs-generetor


### Removed 
- Method pushHandler in historyHandler.js

### Fixed
- Method push in historyHandler


## 1.4.2 - 2021-03-03

### Added
- added vue to dependencies (`/ui`)

### Changed
- changelog to keepchangelog pattern

### Removed
- husky
- conventional commit
- commitizen
- peerDependencies (`/ui`)

### Fixed
- eslit errors

## 1.4.1 - 2021-03-02

### Added
- added quasar-ui-asteroid as dependency (`/app-extension`)

### Changed
- update doc for develop usage

## 1.4.0 - 2021-03-02

### Added
- added type "chore" to hidden true

### Changed
- changed standard-release config
- config conventional commit/standard-release/husky/commitlint
- changed documentation for develop usage
