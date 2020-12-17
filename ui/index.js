import Vue from 'vue'

// TODO: Importar tudo para fins de testes e Storybook.
import Quasar, {
  QAvatar,
  QIcon,
  QImg,
  QTabs,
  QTab,
  QRouteTab,
  QBadge
} from 'quasar'

Vue.use(Quasar, {
  components: {
    QAvatar,
    QIcon,
    QImg,
    QTabs,
    QTab,
    QRouteTab,
    QBadge
  }
})
