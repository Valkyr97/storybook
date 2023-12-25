import {Meta, StoryObj} from "@storybook/vue3";
import {ComponentProps} from "vue-component-type-helpers";

import FormBuilder from "../../components/FormBuilder.vue";

type FormPropsAndCustomArgs = ComponentProps<typeof FormBuilder> & CustomArgs
type CustomArgs = {
    min?: number,
    max?: number,
    integer?: boolean,
    subtype?: 'radio' | 'select' | 'checkbox'
}

const meta: Meta<FormPropsAndCustomArgs> = {
    title: 'Builders/FormView',
    component: FormBuilder,
    argTypes: {
        elType: {options: ['text', 'number', 'select']},
        subtype: {options: ['radio', 'select', 'checkbox'], if: {arg: 'elType', eq: 'select'}},
        min: {
            control: 'number',
            if: {arg: 'elType', eq: 'number'}
        },
        max: {
            control: 'number',
            if: {arg: 'elType', eq: 'number'}
        },
        integer: {
            control: 'boolean',
            if: {arg: 'elType', eq: 'number'}
        }
    },
    parameters: {
        controls: {
            exclude: ['id', 'conditions', 'validation'],
        },
    },
    render: (args) => {

        const props = {...args}

        return {
            components: {FormBuilder},
            setup() {
                return {args, props}
            },
            template: '<form-builder :key="`${args.elType}-${args.subtype}`" v-bind="args" :validation="{min: args.min, max: args.max, integer: args.integer}" />'
        }
    },
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof FormBuilder>

export const Main: Story = {
    name: 'Select type arrays',
    args: {
        elType: 'select',
        label: 'Form Label',
        options: ['First Option', 'Second Option']
    },
    // argTypes: {
    //     elType: {options: ['select', 'radio', 'checkbox']}
    // }
}
export const Default: Story = {
    name: 'Normal Inputs',
    args: {
        elType: 'text',
        label: 'Form Label',
    },
    argTypes: {
        elType: {options: ['number', 'text']}
    },
    parameters: {
        controls: {
            exclude: ['id', 'conditions', 'validation', 'options']
        }
    }
}
