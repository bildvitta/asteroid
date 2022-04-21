# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added
- Added new prop `forceRefetch` to `QasFilters`.

## 2.17.1 - 2022-04-11

### Fixed
- In `app-extension/package.json` changed `"@bildvitta/quasar-ui-asteroid": "latest"` to `"@bildvitta/quasar-ui-asteroid": "^2.x"`.

## 2.17.0 - 2022-04-08

### Add
- Add new function `formatPercent` in `filters.js` to apply `%` percent mask to percent fields as default in humanize.

## 2.16.0 - 2022-03-31

### Added
- Added new prop `emptyResultText` to `QasTableGenerator` and `QasGridGenerator`.

### Changed
- Validation logic in `humanize` function inside `filters.js` file.

## 2.15.0 - 2022-03-23

### Added
- Added new prop `paramKey` to `QasListItems`.

### Changed
- `QasResizer` changed baseURL `'https://d17ouzaofz81f3.cloudfront.net/'` to `'https://image-resize.nave.dev/'`

## 2.14.1 - 2022-03-21

### Fixed
- Removed `this.file = []` in method `__addFiles` in `QasCustomUploader`.

## 2.14.0 - 2021-02-11

### Added
- Added new prop `title` to `QasAppMenu`.

### Changed
- Logic of handling modules inside `QasAppMenu`.

### Removed
- Removed prop `currentModule` from `QasAppMenu`, now the "currentModule" it's handled inside the component (it's not a breaking change).

## 2.13.0 - 2021-01-12

### Added
- Added template for pull requests.
- New component `QasLayout`.

### Changed
- `QasAppMenu` design.
- `QasAppBar` design.
- `body` background to `#f5f5f5`.

### Removed
- `apps` prop inside in `QasAppBar`.

## 2.12.4 - 2021-12-22

### Changed
- Added `div` as parent tag in `QasDecimalInput` for rules validation when submiting a form.

## 2.12.3 - 2021-12-10

### Fixed
- Added `normalizeValues` method on `activeFilters` computed to correct string values when they should be string array values.
- Added an extra verification at the helper `filter` to prevent calling mask methods without a value.

## 2.12.2 - 2021-12-09

### Changed
- When selecting multiple items in the select filter, the q-chip displays `label = "item1, item2"` in `QasFilters`.

### Removed
- Remove padding in `QasAppMenu`.

## 2.12.1 - 2021-11-10

### Fixed
- Fixed return value from `labelValue` in `QasActionsMenu`.

## 2.12.0 - 2021-11-09

### Changed
- Renamed component name from `QasSettingsMenu` to `QasActionsMenu`.
- Changed the function name of items from `handle` to `handler`.

### Added
- Added new property `hideLabel` in `QasActionsMenu`.
- Added new property `icon` in `QasActionsMenu`.

## 2.11.1 - 2021-11-02

### Added
- Adjustments on QasDateTime input, and adding GMT prop.

### Fixed
- On $_createMarkers mixin, the marker is now draggable on 'create' and 'replace' pages

## 2.11.0 - 2021-10-19

### Added
- Added new `filtersProps` in `QasListView` for sending to `QasFilter`.
- Added new component `QasListItems`.
- Added new component `QasNumericInput`.

### Removed
- Removed `QasDecimalInput` in favor of `QasNumericInput`.

### Fixed
- Adjusting `QasInput` toogle mask value when value is null.

## 2.10.1 - 2021-10-07

### Changed
- Changed q-carousel dotnav icons on qas-card to highlight visible image.

### Fixed
- Fixed `__addFiles` from `QasCustomUploader`.
- Added `:use-resize="false"` to `QasUploader` inside `QasSignatureUploader`.

## 2.10.0 - 2021-10-06

### Added
- New resize feature to `QasUploader` (auto resize).
- `QasUploader` new props: (acceptResizeTypes, picaResizeOptions, sizeLimit, useResize).

### Changed
- Changed slot name `tab-slot-[tab.label]` to `tab-after-[tab.value]`.
- Changed slot `tab-[tab.label]` to `tab-[tab.value]`.
- Updated `vue` and `vue-template-compiler` to `v2.6.14` for fixing storybook error.

## 2.9.6 - 2021-09-22

### Added
- Mixin changes on `unsaved-changes` for not show the edit dialog when is a delete action

## 2.9.5 - 2021-09-21

### Fixed
- NestedFields reference changes to fix scroll and focus behaviour
- NestedFields update-value on slot to stop vuex errors
- On filter objects helper, fields starts with a blank object
- Lint on map-makers.js

### Changed
- Now when an image has an error in `QasGallery` it will be removed from displayed.
- Removed required title in `QasAppBar`.

## 2.9.4 - 2021-09-08

### Fixed
- Fixed `QasSelect` on updated options list.

## 2.9.3 - 2021-09-08

### Fixed
- Fixed `QasSelect` options.

## 2.9.2 - 2021-09-03

### Fixed
- Fixed default value in `QasSelect`.

### Changed
- On `nested-fields`, adjusting the destoy method when row does not have uuid

## 2.9.1 - 2021-09-02

### Changed
- changes in behavior of "v-model" in `QasSelect`.

### Fixed
- Fixed duplicated input event in `QasSelect`.

## 2.9.0 - 2021-09-01

### Added
- Props `noOptionLabel` to `QasSelect`.
- Props `searchable` to `QasSelect` to enable the search field.
- Added the possibility to pass slots from the quasar select to our `QasSelect` component.

### Changed
- Change the component name from `QasAutoComplete` to `QasSelect`.

## 2.8.1 - 2021-09-01

### Fixed
- Card image width size

## 2.8.0 - 2021-08-27

### Added
- Props `readonly` to `QasSignatureUploader`.
- Helper to translate plain string object to a complete object
- Using helper on nested fields to translate errors
- `QasNestedFields` enumerate labels.
- Slot carousel header in component (`QasCard`). 

## 2.7.4 - 2021-08-25

### Fixed
- Fixed `map-markers.js` icon import was breaking build on other applications due to non existing file.

## 2.7.3 - 2021-08-24

### Added
- DataCy prop to `qas-field`.
- DataCy prop to buttons at `qas-form-view`

### Changed
- Changed implementation of `destroy` on `QasDelete` component. Now it receives an `url prop` to override the destroy URL.
- Changed implementation of `$_createMarkers` on `map-markers.js` mixin

## 2.7.2 - 2021-08-06

### Fixed
- Fixed `time` type format in `filters.js`.
- Fixed props `items` in `QasGallery` documentation.
- Fixed validation to show button "show more" in `QasGallery`.

## 2.7.1 - 2021-08-05

### Added
- Menu default expanded when a children is selected
- Color adjustments

## 2.7.0 - 2021-07-27

### Added
- New component QasMap.
- New mixin mapMarkerMixin
- Create class `.opaque`
- Plugin Autoprefixer
- `QasNestedFields` changes to get row index.
- Mask money in `filters.js`
- Mask square area in `filters.js`
- Mask decimal in `filters.js`

### Fixed
- `Qastip` computed and close icon ajusted.

## 2.6.1 - 2021-07-01

### Added
- Added ref `form` to `q-form` in component (`QasFormView`).

## 2.6.0 - 2021-06-29

### Added
- Create class `.opaque`.
- Plugin Autoprefixer.
- Added events `added` and `removed` in `QasSelectList` component.

### Fixed
- Storybook fix in npm run storybook
- Postcss update to version 8.3.5

## 2.5.1 - 2021-06-23

### Fixed
- Fixed computed `hasNotifications` in component (`QasAppBar`).

## 2.5.0 - 2021-06-22

### Added
- Added new type `signatureUpload` to `QasField`.
- Handling errors in the `QasSignatureUploader` component.
- Added the functionality to open the subscription modal by clicking on the header in `QasSignatureUploader` component.
- Now component (`QasField`) pass along all slots and scoped slots available on it.
- Added `type` prop in `QasSignatureUploader`.

### Changed
- Modifications on notifications in AppBar, just to not show on almobi products
- Added a medium margin left on notifications icon and changed on AppsBar component
- Background color on qas-box when is outside forms

### Fixed
- In Qas-field password input, if it doesn't have pattern as an atribute, it will hide password strength by default

## 2.4.2 - 2021-06-15

### Added
- Added `signature_pad` to the `dependencies` key of `package.json`.

### Removed
- Removed `signature_pad` to the `devDependencies` key of `package.json`.

## 2.4.1 - 2021-06-15

### Added
- Added `signature_pad` as a dependency in `/ui/`.

### Removed
- Removed `signature_pad` as a dependency in `/ui/dev/`.

## 2.4.0 - 2021-06-14

### Added
- Added a new signature component (`QasSignaturePad`).
- Added a new signature upload component (`QasSignatureUploader`).
- Added header and list slot in uploader component (`QasUploader`).
- Added type `radio` to humanize filter.

### Changed
- `QasAvatar` only adds background color when it's not image.

### Fixed
- Adding empty array check on `formattedFields` function component (`QasGridGenerator`).

## 2.3.3 - 2021-06-08

### Fixed
- Adding the tag `disable` on `QasField`.
- Adding the tag `hideStrengthChecker` on `QasField`.

## 2.3.2 - 2021-05-31

### Fixed
- Fixed `QasAppMenu` bug with router active classes.

## 2.3.1 - 2021-05-31

### Fixed
- Fixed `QasAppMenu` error with router active classes.

## 2.3.0 - 2021-05-31

### Added
- Added `rounded-borders-top`, `rounded-borders-right`, `rounded-borders-bottom` and `rounded-borders-left` CSS classes.
- Added `QasGallery`.
- Added `width` prop in `QasTooltip`.
- Added `unsavedChangesMixin`.

### Changed
- `QasAppBar` and `QasAppMenu` default style.
- `QasField` emits value as a `Number` when it is originally a number.

### Fixed
- Fix import `filterObject` in helpers.
- Added cloned value for `field` in computed `children` inside `QasNestedFields`.
- System scrollbar height.

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
