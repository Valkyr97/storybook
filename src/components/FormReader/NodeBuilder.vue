<script setup lang="ts">
import {FormKitSchema} from '@formkit/vue'
import {computed, ref} from "vue";
import {nodeBuilder} from "./schemaDefinition.ts";
import {comparisonOperatorValue, IConditions, IformType} from "./types/formBuilderTypes.ts";

const props = defineProps<{
  /**
   * Form Type ej.(text, radio, select, checkbox, etc...
   */
  elType: IformType
  /**
   * unique id of the form
   */
  id?: string
  /**
   * Label for the Form
   */
  label?: string
  /**
   * Placeholder for the Form
   */
  placeholder?: string
  /**
   * Options in case the element is a select, checkbox or radio type
   */
  options?: string[]
  /**
   * Conditions that should be meets to visualize the form
   */
  viewCondition?: IConditions[],
  /**
   * Validations to apply in the value
   */
  validation?: any,
  /**
   * List of condition that could accomplish the input value
   * And in such case, modifiers that must be applied to the price
   */
  priceModifiers?: {
    condOperator?: comparisonOperatorValue
    condValue?: any
    operation: string
  }[]
}>();

// State
const currentValue = ref()

// Getters
const schemaDefinition = computed(() => {
  return nodeBuilder(props.elType, {
    conditions: props.viewCondition,
    id: props.id,
    label: props.label,
    options: props.options,
    placeholder: props.placeholder,
    validation: props.validation
  })
})

</script>

<template>
  <FormKitSchema v-model="currentValue" :schema="schemaDefinition"/>
</template>

<style scoped>

</style>