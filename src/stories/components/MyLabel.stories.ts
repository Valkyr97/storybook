import MyLabel from "../../components/MyLabel.vue";
import {Meta, StoryObj} from "@storybook/vue3";

const meta: Meta<typeof MyLabel> = {
    // title: 'Example',
    component: MyLabel,
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof MyLabel>

export const Test: Story = {
    render: (args) => ({
        components: {MyLabel},
        setup() {
            return {args}
        },
        template: '<my-label v-bind="args" />'
    }),
    args: {}
}
