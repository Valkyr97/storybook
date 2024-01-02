import {Meta, StoryObj} from "@storybook/vue3";
import {FormView} from "../../../index.ts";
import {FormField, FormSection} from "../../../components/FormBuilder/types/formBuilderTypes.ts";
import {ComponentProps} from "vue-component-type-helpers";

const adjustSections = (sections: {
                            title: string,
                            fields: FormField[]
                        }[]
) =>
    sections.map(section => (
        {
            ...section,
            fields: section.fields.map((field) => {
                return {
                    ...field,
                    id: field.name,
                    options: field.options?.map((o: any) => typeof o === 'object' ? o.value : o),
                    conditions: field.conditions?.map((c) => ({
                        ...c,
                        id: c.name
                    }))
                }
            })
        }
    ))

const sectionsData: FormSection[] = [
    {
        "title": "",
        "fields": [
            {
                "name": "lqo46usg_gs3075kl",
                "label": "Edad",
                "type": "number",
                "mutable": true,
                "private": false,
                "conditions": [],
                "options": [],
                "cost": [
                    {
                        "condition": {
                            "name": "lqo46usg_gs3075kl",
                            "operator": "GREATER_EQUAL",
                            "value": "18"
                        },
                        "operator": "ADD",
                        "value": "2"
                    }
                ]
            },
            {
                "name": "lqo46vfs_f2b02lo0",
                "label": "Bebida preferida",
                "type": "radio",
                "mutable": true,
                "private": false,
                "conditions": [
                    {
                        "name": "lqo46usg_gs3075kl",
                        "operator": "GREATER_EQUAL",
                        "value": "18"
                    }
                ],
                "options": [
                    {
                        "key": "0",
                        "value": "Ron"
                    },
                    {
                        "key": "1",
                        "value": "Cerveza"
                    }
                ],
                "cost": [
                    {
                        "condition": {
                            "name": "lqo46vfs_f2b02lo0",
                            "operator": "EQUAL",
                            "value": "Ron"
                        },
                        "operator": "ADD",
                        "value": "4"
                    },
                    {
                        "condition": {
                            "name": "lqo46vfs_f2b02lo0",
                            "operator": "EQUAL",
                            "value": "Cerveza"
                        },
                        "operator": "ADD",
                        "value": "3"
                    }
                ]
            }
        ]
    }
]

type FormViewAndCustomArgs = ComponentProps<typeof FormView> & CustomArgs
type CustomArgs = {
    formSections: FormSection[]
}

const meta: Meta<FormViewAndCustomArgs> = {
    title: 'Pages/Form',
    component: FormView,
    render: (args) => {
        const adjustedSections = adjustSections(args.formSections || sectionsData)
        return {
            components: {FormView},
            setup() {
                return {args, sections: adjustedSections}
            },
            template: '<form-view v-bind="args" :sections="sections" />'
        }
    },
    argTypes: {
        initialPrice: {control: 'number'},
    },
    parameters: {
        controls: {
            exclude: ['priceZone', 'customFormkitConfig']
        }
    },
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof FormView>

export const Default: Story = {
    args: {
        initialPrice: 24,
        //@ts-ignore
        sections: adjustSections(sectionsData)
    }
}
