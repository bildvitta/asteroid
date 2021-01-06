import Vue from 'vue'

// TODO: Importar tudo para fins de testes e Storybook.
import Quasar, {
  QAvatar,
  QIcon,
  QImg,
  QField,
  QUploader,
  QSpinner,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QBtn,
  QUploaderAddTrigger
  
  
} from 'quasar'

Vue.use(Quasar, {
  components: {
    QAvatar,
    QIcon,
    QImg,
    QField,
    QUploader,
    QSpinner,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QBtn,
    QUploaderAddTrigger
  }
})
