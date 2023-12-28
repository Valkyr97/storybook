import {Meta, StoryObj} from "@storybook/vue3";
import FormView from "../../../components/FormBuilder/formView.vue";

const meta: Meta<typeof FormView> = {
    title: 'Pages/Form',
    component: FormView,
    render: (args) => ({
        components: {FormView},
        setup() {
            return {args}
        },
        template: '<form-view v-bind="args" />'
    }),
    argTypes: {
        initialPrice: {control: 'number'}
    },
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof FormView>

export const Default: Story = {
    args: {
        initialPrice: 24
    }
}
