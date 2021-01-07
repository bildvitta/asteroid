import Vue from 'vue'

// TODO: Importar tudo para fins de testes e Storybook.
import Quasar, {
  QAvatar,
  QIcon,
  QImg,
  QDrawer,
  QScrollArea,
  QList,
  QExpansionItem,
  QItem,
  QItemSection,
  QItemLabel,
  QLayout
} from 'quasar'

Vue.use(Quasar, {
  components: {
    QAvatar,
    QIcon,
    QImg,
    QDrawer,
    QScrollArea,
    QList,
    QExpansionItem,
    QItem,
    QItemSection,
    QItemLabel,
    QLayout
  }
})
