# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Changes
- `QasField` changed emit value when field is type number.

### Added

- Added `QasGallery`
- Width prop in QasTooltip

### Fixed

- Fix import filterObject in helpers
- Added cloned value for `field` in computed `children` inside `QasNestedFields`

## 2.2.0 - 2021-05-26

### Added
- Added `formMixin`
- Added new slot `custom-slot` inside `QasUploader`.
- Added `readonly` and` maxFiles` properties in` QasField` for `QasUploader`.
- Header added `Content-Disposition: Attachment` for all uploads made with `QasUploader`.
- Added margin prop in `QasLabel`.

### Changed
- Adjustments on `QasCopy` icon size to respect design system.
- Change the `QasAvatar` image prop, not running into asset function.
- Change `QasAvatar` letter weight to bold.
- CSS classes now have `!important` flag.

### Removed
- Remove `.q-pa-sm` actions slot in `QasCard`.
- Remove require prop `QasLabel`.
- Remove position absolute in `QasSettings`.

### Fixed
- `QasUploader` now support multiple uploads.
- iconSize in `QasSettings`.
- Fixed import of `filterObject` helper.

## 2.1.0 - 2021-05-15

### Added
- Added `primary-contrast` and `secondary-contrast` colors.
- Added `unset` CSS class to reset styles of an element (useful for buttons).
- Added `border-top`, `border-left`, `border-bottom` and `border-right` CSS classes.
- Added type `Object` to prop `errors` in `QasNestedFields`.

### Changes
- New `QasAvatar` to respect design system.
- Changed `QasCard` image prop name.

## 2.0.1 - 2021-05-13

### Added
- Added `border-primary` and `border-secondary` classes to create a outlined 1px border.
- Added `QasCard` component.
- Added icon size in `QasSettingsMenu`.

### Changes
- `QasBox` now uses border and shadow global CSS classes.
- Now arrow colors is primary for all `QTabs` instead of `QasTabsGenerator` only.
- Style `QasSettingsMenu`.

## 2.0.0 - 2021-05-04

### Added
- Added `QasTooltip` component
- Added `filterObject` helper
- Added `index.js` in `/mixins` for importing mixins
- Added `asteroid.js` in `in ui/src` for importing mixins and helpers
- Added background CSS classes: `.bg-no-repeat`, `.bg-size-contain`, `.bg-size-cover`, `.bg-position-bottom`, `.bg-position-center`, `.bg-position-left`, `.bg-position-right` and `.bg-position-top`.
- Added border CSS classes: `.rounded-borders-sm` and `.rounded-borders-lg`.
- Added shadow mixin and `.shadow-primary` CSS class.
- Added design system's specific styles, like gradients.

### Changed
- Layout arrows in `QasTabs`
- Changed `QasProfile` layout and structure
- Added class `.qas-table--mobile` modifier
- Changed `app-extension/src/index.js` path for mixins and helpers
- Renamed `.text-decoration-none` to `.text-no-decoration`
- Renamed `.border-radius-sm` to `.rounded-borders`
- Renamed `.border-radius-xs` to `.rounded-borders-sm`
- Renamed `.border-radius-lg` to `.rounded-borders-lg`
- Renamed `.box-shadow-1` to `.shadow-primary`

### Removed
- Removed `.join(\n)` in `/helpers/filters.js`

### Fixed
- Fixed imports of news components, `QasTip` and `QasTextTruncate`

## 1.9.0 - 2021-04-29

### Added
- Added mixin `screen`
- Added `QasTextTruncate` component in `ui/src/component`
- Added `QasNestedFields` in `ui/src/component`
- Added method in historyHandler for destroy routes by names list

## 1.8.0 - 2021-04-22

### Added
- Added component `qas-tip` in `ui/src/components`
- Added Montserrat as default font
- Added `Forbidden` and `NotFound` error pages
- Automatic import of error pages
- Added `v-model` in `QasSingleView`

### Changed
- Start using `expanded-icon` on `QasAppMenu`
- Changes in `ui/dev`

### Removed
- Removed `#q-app` background-color

### Fixed
- Prefix all icons with `o_` to force Material Icons Outlined

## 1.7.0 - 2021-04-13

### Added
- Added component tag `q-form` in `QasDialog` if prop `useForm` is `true`
- Added trigger validate `q-form` if prop `useForm` and emit value
- Added example page in `ui/dev` with name `DialogForm.vue`

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
