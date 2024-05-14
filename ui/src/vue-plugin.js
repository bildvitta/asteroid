import QasActions from './components/actions/QasActions.vue'
import QasActionsMenu from './components/actions-menu/QasActionsMenu.vue'
import QasAlert from './components/alert/QasAlert.vue'
import QasAppBar from './components/app-bar/QasAppBar.vue'
import QasAppMenu from './components/app-menu/QasAppMenu.vue'
import QasAppUser from './components/app-user/QasAppUser.vue'
import QasAvatar from './components/avatar/QasAvatar.vue'
import QasBadge from './components/badge/QasBadge.vue'
import QasBoardGenerator from './components/board-generator/QasBoardGenerator.vue'
import QasBox from './components/box/QasBox.vue'
import QasBreakline from './components/breakline/QasBreakline.vue'
import QasBtn from './components/btn/QasBtn.vue'
import QasBtnDropdown from './components/btn-dropdown/QasBtnDropdown.vue'
import QasCard from './components/card/QasCard.vue'
import QasCardImage from './components/card-image/QasCardImage.vue'
import QasCheckboxGroup from './components/checkbox-group/QasCheckboxGroup.vue'
import QasCopy from './components/copy/QasCopy.vue'
import QasDate from './components/date/QasDate.vue'
import QasDateTimeInput from './components/date-time-input/QasDateTimeInput.vue'
import QasDebugger from './components/debugger/QasDebugger.vue'
import QasDelete from './components/delete/QasDelete.vue'
import QasDialog from './components/dialog/QasDialog.vue'
import QasDialogRouter from './components/dialog-router/QasDialogRouter.vue'
import QasDrawer from './components/drawer/QasDrawer.vue'
import QasEmptyResultText from './components/empty-result-text/QasEmptyResultText.vue'
import QasExpansionItem from './components/expansion-item/QasExpansionItem.vue'
import QasField from './components/field/QasField.vue'
import QasFilters from './components/filters/QasFilters.vue'
import QasFormGenerator from './components/form-generator/QasFormGenerator.vue'
import QasFormView from './components/form-view/QasFormView.vue'
import QasGallery from './components/gallery/QasGallery.vue'
import QasGalleryCard from './components/gallery-card/QasGalleryCard.vue'
import QasGrabbable from './components/grabbable/QasGrabbable.vue'
import QasGridGenerator from './components/grid-generator/QasGridGenerator.vue'
import QasHeaderActions from './components/header-actions/QasHeaderActions.vue'
import QasInfiniteScroll from './components/infinite-scroll/QasInfiniteScroll.vue'
import QasInput from './components/input/QasInput.vue'
import QasLabel from './components/label/QasLabel.vue'
import QasLayout from './components/layout/QasLayout.vue'
import QasListItems from './components/list-items/QasListItems.vue'
import QasListView from './components/list-view/QasListView.vue'
import QasNestedFields from './components/nested-fields/QasNestedFields.vue'
import QasNumericInput from './components/numeric-input/QasNumericInput.vue'
import QasOptionGroup from './components/option-group/QasOptionGroup.vue'
import QasPageHeader from './components/page-header/QasPageHeader.vue'
import QasPagination from './components/pagination/QasPagination.vue'
import QasPasswordInput from './components/password-input/QasPasswordInput.vue'
import QasPasswordStrengthChecker from './components/password-strength-checker/QasPasswordStrengthChecker.vue'
import QasProfile from './components/profile/QasProfile.vue'
import QasResizer from './components/resizer/QasResizer.vue'
import QasSearchBox from './components/search-box/QasSearchBox.vue'
import QasSearchInput from './components/search-input/QasSearchInput.vue'
import QasSelect from './components/select/QasSelect.vue'
import QasSelectList from './components/select-list/QasSelectList.vue'
import QasSelectListDialog from './components/select-list-dialog/QasSelectListDialog.vue'
import QasSignaturePad from './components/signature-pad/QasSignaturePad.vue'
import QasSignatureUploader from './components/signature-uploader/QasSignatureUploader.vue'
import QasSingleView from './components/single-view/QasSingleView.vue'
import QasSortable from './components/sortable/QasSortable.vue'
import QasStatus from './components/status/QasStatus.vue'
import QasStepper from './components/stepper/QasStepper.vue'
import QasStepperFormView from './components/stepper-form-view/QasStepperFormView.vue'
import QasTableGenerator from './components/table-generator/QasTableGenerator.vue'
import QasTabsGenerator from './components/tabs-generator/QasTabsGenerator.vue'
import QasTextTruncate from './components/text-truncate/QasTextTruncate.vue'
import QasTimeline from './components/timeline/QasTimeline.vue'
import QasTransfer from './components/transfer/QasTransfer.vue'
import QasTreeGenerator from './components/tree-generator/QasTreeGenerator.vue'
import QasUploader from './components/uploader/QasUploader.vue'
import QasWelcome from './components/welcome/QasWelcome.vue'
import QasWhatsappLink from './components/whatsapp-link/QasWhatsappLink.vue'

import { Notify, Loading, Quasar, Dialog as QuasarDialog } from 'quasar'

import { getAction } from '@bildvitta/store-adapter'

// Plugins
import {
  Delete,
  Dialog,
  NotifyError,
  NotifySuccess,
  Screen
} from './plugins'

import packageInfo from '../package.json'

// Directives
import Test from './directives/Test.js'

const version = packageInfo.version

async function install (app) {
  app.use(Quasar, { plugins: { Notify, Loading, QuasarDialog, Dialog } })

  app.config.globalProperties.$qas = {
    delete: params => Delete.call(app.config.globalProperties, params),
    dialog: Dialog,
    error: NotifyError,
    screen: Screen(),
    success: NotifySuccess
  }

  app.provide('qas', {
    delete: params => Delete.call(app.config.globalProperties, params),

    getAction: params => getAction.call(app.config.globalProperties, params)
  })

  app.directive(Test.name, Test)
}

export {
  version,

  // components
  QasActions,
  QasActionsMenu,
  QasAlert,
  QasAppBar,
  QasAppMenu,
  QasAppUser,
  QasAvatar,
  QasBadge,
  QasBoardGenerator,
  QasBox,
  QasBreakline,
  QasBtn,
  QasBtnDropdown,
  QasCard,
  QasCheckboxGroup,
  QasCopy,
  QasDate,
  QasDateTimeInput,
  QasDebugger,
  QasDelete,
  QasDialog,
  QasDialogRouter,
  QasDrawer,
  QasEmptyResultText,
  QasExpansionItem,
  QasField,
  QasFilters,
  QasFormGenerator,
  QasFormView,
  QasGallery,
  QasGalleryCard,
  QasGrabbable,
  QasGridGenerator,
  QasHeaderActions,
  QasInfiniteScroll,
  QasInput,
  QasLabel,
  QasLayout,
  QasListItems,
  QasListView,
  QasNestedFields,
  QasNumericInput,
  QasOptionGroup,
  QasPageHeader,
  QasPagination,
  QasPasswordInput,
  QasPasswordStrengthChecker,
  QasProfile,
  QasResizer,
  QasSearchBox,
  QasSearchInput,
  QasSelect,
  QasSelectList,
  QasSelectListDialog,
  QasSignaturePad,
  QasSignatureUploader,
  QasSingleView,
  QasSortable,
  QasStatus,
  QasStepper,
  QasStepperFormView,
  QasTableGenerator,
  QasTabsGenerator,
  QasTextTruncate,
  QasTimeline,
  QasTransfer,
  QasTreeGenerator,
  QasUploader,
  QasWelcome,
  QasWhatsappLink,
  QasCardImage,

  // plugins
  Dialog,
  NotifyError,
  NotifySuccess,
  Screen,

  install
}
