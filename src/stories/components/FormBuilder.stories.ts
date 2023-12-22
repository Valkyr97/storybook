import {Meta, StoryObj} from "@storybook/vue3";
import FormBuilder from "../../components/FormBuilder.vue";

const meta: Meta<typeof FormBuilder> = {
    title: 'Builders/FormView',
    component: FormBuilder,
    render: (args) => ({
        components: {FormBuilder},
        setup() {
            return {args}
        },
        template: '<form-builder v-bind="args" />'
    }),
    argTypes: {
        elType: {options: ['text', 'select', 'number']},
        options: {
            control: 'array',
            if: {arg: 'elType', eq: 'select'},
        },
        elSubtype: {
            options: ['select', 'radio', 'checkbox'],
            if: {arg: 'elType', eq: 'select'}
        }
    },
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof FormBuilder>

export const TextForm: Story = {
    args: {
        elType: 'text',
        label: 'Text Form'
    }
}
export const RadioForm: Story = {
    args: {
        elType: 'select',
        elSubtype: 'select',
        label: 'Selection Form',
        options: ['First Option', 'Second Option']
    }
}
