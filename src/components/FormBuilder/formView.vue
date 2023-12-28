<script setup lang="ts">
import {computed, ref} from "vue";
import FormBuilder from "./NodeBuilder.vue";
import {comparisonOperatorValue, IformType} from "./types/formBuilderTypes.ts";

interface response {
  data: {
    parcelService: {
      form: {
        sections: {
          title: string,
          fields: ({
            name: string,
            label: string,
            type: IformType,
            mutable: boolean,
            private: boolean,
            conditions: ICondition[],
            cost: IPriceModifiers[],
            options?: any[]
          })[]
        }[]
      }
    }
  }
}

interface IPriceModifiers {
  condition: ICondition,
  operator: string,
  value: string
}

interface ICondition {
  name?: string,
  operator: comparisonOperatorValue,
  value: string
}


const data: response =
    {
      "data": {
        "parcelService": {
          "form": {
            "sections": [
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
          }
        }
      }
    }


const props = defineProps<{
  initialPrice: number
}>();

// const selectInputs = ['radio', 'select', 'checkbox']

const sections = computed(() =>
    data.data.parcelService.form.sections.map(section => (
        {
          ...section,

          fields: section.fields.map(field => {
            return {
              ...field,
              id: field.name,
              options: field.options?.map(o => o.value),
              conditions: field.conditions.map(({name, ...c}) => ({
                ...c,
                id: name
              }))
            }
          })
        }
    ))
)

const priceModifiersAdjust = (modifiers: IPriceModifiers[]) => {
  return modifiers.map(m => ({
    condOperator: m.condition.operator,
    condValue: m.condition.value,
    operation: `${m.operator} ${m.value}`
  }))
}

const modifiers = ref([] as any[])

const addModifier = (operation: string, id?: string) => {
  console.log('add')
  if (!id) return
  modifiers.value = [...modifiers.value, {id, operation}]
}

const removeModifier = (operation: string, id?: string) => {
  console.log('remove')
  if (!id) return
  modifiers.value = modifiers.value.filter(m => (m.operation !== operation))
}

const price = computed(() => {
  return modifiers.value.reduce((previousValue, currentValue) => {
    console.log(currentValue)
    const [operator, value] = currentValue.operation.split(' ')
    switch (operator.toUpperCase()) {
      case 'SET':
        return Number(value)
      case 'ADD':
        return Number(previousValue) + Number(value)
      case 'MUL':
        return Number(previousValue) * Number(value)
    }
  }, props.initialPrice)
})
</script>

<template>
  <div class="flex flex-col">
    <!--    <FormKitSchema :schema="schema"/>-->
    <div v-for="section in sections">
      <FormKit type="form">
        <template v-for="field in section.fields">
          <form-builder :id="field.name"
                        :el-type="field.type"
                        :label="field.label"
                        :options="field.options || []"
                        :viewCondition="field.conditions"
                        :priceModifiers="priceModifiersAdjust(field.cost)"
                        @add-modifier="(operation, id) => addModifier(operation, id)"
                        @remove-modifier="(operation, id) => removeModifier(operation, id)"
          />
        </template>
      </FormKit>
    </div>
    <div>
      {{ price }}
    </div>
  </div>

</template>

<style scoped>

</style>