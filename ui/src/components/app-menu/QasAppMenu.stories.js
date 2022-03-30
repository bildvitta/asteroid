import QasAppMenu from './QasAppMenu.vue'

export default {
  component: QasAppMenu,
  title: 'Components/AppMenu',

  parameters: {
    docs: {
      description: {
        component: 'Creates a top-level drawer menu from an array of items.'
      }
    }
  },

  argTypes: {
    // Props
    itemClass: {
      description: 'CSS classes for each item on menu, including children.'
    },

    items: {
      description: 'Array of object with menu items. Can receive a children items with same structure (first level only).'
    },

    scrollAreaClass: {
      description: 'CSS classes for the scroll area component.'
    },

    value: {
      description: 'Controls drawer menu visibility.'
    },

    title: {
      description: 'Title for displaying inside "modules" as label when is in development (local).'
    },

    // Events
    input: {
      description: 'Fires when opening or closing the drawer menu.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasAppMenu },
  props: Object.keys(argTypes),
  template:
    `<q-layout class="shadow-1" container style="height: 300px" view="hHh Lpr lff">
      <qas-app-menu v-bind="$props" />
    </q-layout>`
})

export const Default = Template.bind({})
Default.args = {
  items: [
    { label: 'single item' },
    { label: 'with icon', icon: 'today' },
    {
      label: 'with children',
      children: [
        { label: 'children 1' },
        { label: 'children 2' }
      ]
    }
  ]
}
