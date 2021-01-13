import QasProfile from './QasProfile.vue'

const noSummary = {
  type: { summary: null }
}

export default {
  component: QasProfile,
  title: 'Components/Profile',
  parameters: {
    docs: {
      description: {
        component: 'Component for creating profile structure.'
      }
    }
  },

  argTypes: {
    icon: {
      description: 'Avatar icon.'
    },

    iconic: {
      description: 'Force Icon in Avatar.'
    },

    image: {
      description: 'Avatar image.'
    },

    title: {
      description: 'Profile title..'
    },

    // slots
    afterTitle: {
      description: 'Slot to access after the title.',
      table: noSummary
    },

    beforeTitle: {
      description: 'Slot to access before the title.',
      table: noSummary
    },

    meta: {
      description: 'Slot to access meta.',
      table: noSummary
    }
  }
}

const template =
  `
    <template v-slot:afterTitle>
      Here is <strong>afterTitle</strong> slot.
    </template>
    <template v-slot:beforeTitle>
      Here is <strong>beforeTitle</strong> slot.
    </template>
    <template v-slot:meta>
      Here is <strong>meta</strong> slot.
    </template>
  `

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasProfile },
  template:
    `<qas-profile v-bind="$props">${template}</qas-profile>`
})

export const Default = Template.bind({})
Default.args = { title: 'Profile title!' }

Default.parameters = {
  docs: {
    source: { code: `<qas-profile>${template}</qas-profile>` }
  }
}
