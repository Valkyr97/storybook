import MyLabel from "../../components/MyLabel.vue";
import {Meta, StoryObj} from "@storybook/vue3";

const meta: Meta<typeof MyLabel> = {
    title: 'UI/Labels',
    component: MyLabel,
    render: (args) => ({
        components: {MyLabel},
        setup() {
            return {args}
        },
        template: '<my-label v-bind="args" />'
    }),
    argTypes: {
        size: {options: ['normal', 'h1', 'h2']}
    },
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof MyLabel>

export const Test: Story = {
    args: {}
}
