import {Meta, StoryObj} from "@storybook/vue3";
import FormView from "../../pages/formView.vue";

const meta: Meta<typeof FormView> = {
    title: 'Pages/FormView',
    component: FormView,
    render: (args) => ({
        components: {FormView},
        setup() {
            return {args}
        },
        template: '<form-view v-bind="args" />'
    }),
    argTypes: {},
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof FormView>

export const Default: Story = {
    args: {}
}
