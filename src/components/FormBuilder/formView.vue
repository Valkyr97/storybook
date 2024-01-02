<script setup lang="ts">
import {computed, ref} from "vue";
import {FormKitProvider} from '@formkit/vue'
import {FormKitOptions} from '@formkit/core'
import config from './formkit.config.ts'
import FormBuilder from "./NodeBuilder.vue";
import {
  comparisonOperatorValue,
  FormCondition, FormCostItem, IformType,
  mathOperator, mathOperatorValue
} from "./types/formBuilderTypes.ts";


export interface ISection {
  title: string,
  fields: {
    private?: boolean,
    cost?: Array<FormCostItem>,
    mutable?: boolean,
    name: string,
    options: string[] | undefined,
    label?: string,
    id: string,
    conditions: { id: string, value: string, operator: comparisonOperatorValue }[],
    type: IformType,
    validation?: any
  }[]
}

[]


const props = withDefaults(defineProps<{
  /**
   * Initial Price that could vary according to the values selected in the inputs
   */
  initialPrice?: number
  /**
   * Sections that will determine the form.
   */
  sections: ISection[]
  /**
   * Determine if the form should use the submit default button
   */
  defaultAction?: boolean
  /**
   * Classes for the node component
   */
  nodeClasses?: string
  /**
   * Custom Formkit Config
   */
  customFormkitConfig?: FormKitOptions
}>(), {
  initialPrice: 0,
  defaultAction: true
});

// State
const modifiers = ref([] as any[])
const formkitConfig: FormKitOptions = props.customFormkitConfig || config

// Getters
const addModifier = (operation: string, id?: string) => {
  if (!id) return
  modifiers.value = [...modifiers.value, {id, operation}]
}

const removeModifier = (operation: string, id?: string) => {
  if (!id) return
  modifiers.value = modifiers.value.filter(m => (m.operation !== operation))
}

const price = computed(() => {
  return modifiers.value.reduce((previousValue, currentValue) => {
    const [operator, value] = currentValue.operation.split(' ')
    switch (operator) {
      case mathOperator.Set:
        return Number(value)
      case mathOperator.Add:
        return Number(previousValue) + Number(value)
      case mathOperator.Mul:
        return Number(previousValue) * Number(value)
    }
  }, props.initialPrice)
})

// Actions
const priceModifiersAdjust = (modifiers?: Array<{
  condition?: FormCondition;
  operator: mathOperator | mathOperatorValue;
  value: string
}> | undefined) => {
  return modifiers?.map(m => ({
    condOperator: m.condition?.operator,
    condValue: m.condition?.value,
    operation: `${m.operator} ${m.value}`
  }))
}
</script>

<template>
  <!--    <FormKitSchema :schema="schema"/>-->
  <FormKitProvider :config="formkitConfig">
    <FormKit type="form" :actions="defaultAction">
      <div v-for="section in sections">
        <h1 class="form-title" v-if="section.title">{{ section.title }}</h1>
        <template v-for="field in section.fields">
          <form-builder :id="field.name"
                        :el-type="field.type"
                        :label="field.label"
                        :options="field.options"
                        :viewCondition="field.conditions"
                        :priceModifiers="priceModifiersAdjust(field.cost)"
                        @add-modifier="(operation, id) => addModifier(operation, id)"
                        @remove-modifier="(operation, id) => removeModifier(operation, id)"
          />
        </template>
      </div>
      <slot name="priceZone" :price="price">
          <span>
            Price: {{ price }}
          </span>
      </slot>
    </FormKit>
  </FormKitProvider>

</template>

<style scoped>

</style>