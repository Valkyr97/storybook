import {Meta, StoryObj} from "@storybook/vue3";
import {FormView} from "../../../index.ts";
import {FormField, FormSection} from "../../../components/FormReader/types/formBuilderTypes.ts";
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
                "name": "lrr2p7u9_j129ndfp",
                "label": "Edad",
                "type": "number",
                "mutable": true,
                "private": false,
                "conditions": [],
                "options": [],
                "validation": {
                    "required": null,
                    "alpha": null,
                    "alpha_spaces": null,
                    "alpha_numeric": null,
                    "confirm": null,
                    "contains": null,
                    "date_after": null,
                    "date_before": null,
                    "date_format": null,
                    "is": [
                        "float"
                    ],
                    "length": null,
                    "matches": null,
                    "max": null,
                    "min": null,
                    "not": null,
                    "url": null
                }
            },
            {
                "name": "lrr2qkij_nautg1yf",
                "label": "Bebida preferida",
                "type": "radio",
                "description": undefined,
                "mutable": true,
                "private": false,
                "conditions": [
                    {
                        "name": "lrr2p7u9_j129ndfp",
                        "operator": "GREATER_EQUAL",
                        "connector": 'AND',
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
                "validation": {
                    "required": null,
                    "alpha": null,
                    "alpha_spaces": null,
                    "alpha_numeric": null,
                    "confirm": null,
                    "contains": null,
                    "date_after": null,
                    "date_before": null,
                    "date_format": null,
                    "is": null,
                    "length": null,
                    "matches": null,
                    "max": null,
                    "min": null,
                    "not": null,
                    "url": null
                }
            }
        ]
    }
]


const costMods = [
    {
        "conditions": [],
        "field": null,
        "operator": "SET",
        "value": "16"
    },
    {
        "conditions": [
            {
                "name": "lrr2p7u9_j129ndfp",
                "operator": "GREATER_EQUAL",
                "conector": null,
                "isNegation": null,
                "value": "16"
            }
        ],
        "field": null,
        "operator": "ADD",
        "value": "4"
    },
    {
        "conditions": [
            {
                "name": "lrr2p7u9_j129ndfp",
                "operator": "GREATER_EQUAL",
                "conector": null,
                "isNegation": null,
                "value": "1"
            }
        ],
        "field": 'lrr2p7u9_j129ndfp',
        "operator": "MUL",
        "value": "4"
    },
    {
        "conditions": [
            {
                "name": "lrr2qkij_nautg1yf",
                "operator": "EQUAL",
                "conector": null,
                "isNegation": null,
                "value": "Ron"
            }
        ],
        "field": null,
        "operator": "ADD",
        "value": "10"
    },
    {
        "conditions": [
            {
                "name": "lrr2qkij_nautg1yf",
                "operator": "EQUAL",
                "conector": null,
                "isNegation": null,
                "value": "Cerveza"
            }
        ],
        "field": null,
        "operator": "ADD",
        "value": "6"
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
        initialPrice: 16,
        //@ts-ignore
        sections: adjustSections(sectionsData),
        options: {
            //@ts-ignore
            priceModifiers: costMods
        }
    }
}