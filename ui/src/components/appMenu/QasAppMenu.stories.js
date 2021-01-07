import QasAppMenu from './QasAppMenu.vue'

export default {
  title: 'Components/AppMenu',
  component: QasAppMenu,
  parameters: {
    docs: { 
      description: { 
        component: 'Component that creates a dynamic menu receiving an array'
      } 
    }
  },

  argTypes: {
    items: {
      name: 'items',
      description: 'Array of items in menu, can have icons and children'
    },
    value: {
      name: 'value',
      description: 'Controls component value'
    },
    scrollAreaClass: {
      name: 'scrollAreaClass',
      description: 'Class for the scroll area'
    },
    itemClass: {
      name: 'itemClass',
      description: 'Class for the menu items'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasAppMenu },
  template:
   `<q-layout view="hHh Lpr lff" container style="height: 300px" class="shadow-2 rounded-borders">
      <qas-app-menu v-bind="$props" />
    </q-layout>
   `
})

export const Default = Template.bind({})
Default.args = {
  items: [{label: "single item"}, {label: "with icon", icon: "today"}, {label: "with children", children: [{label: "children 1"}, {label: "children 2"}]}]
}