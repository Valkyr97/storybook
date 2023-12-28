<script setup lang="ts">
import {FormKitSchema} from '@formkit/vue'
import {computed, ref, watch} from "vue";
import {nodeBuilder} from "./schemaDefinition.ts";
import {comparisonOperatorValue, IConditions, IformType} from "./types/formBuilderTypes.ts";
import {conditionValidator, operatorToSymbol} from "./helpers.ts";

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
    condOperator: comparisonOperatorValue
    condValue: string
    operation: string
  }[]
}>();

const emits = defineEmits<{
  (e: 'addModifier', operation: string, id?: string): void
  (e: 'removeModifier', operation: string, id?: string): void
}>();

// State
const currentValue = ref()

// Getters
const schemaDefinition = computed(() => {
  return nodeBuilder(props.elType, {
    options: props.options,
    id: props.id,
    conditions: props.viewCondition,
    label: props.label,
    validation: props.validation
  })
})

const activeModifiers = ref(Array(props.priceModifiers?.length).fill(false))

// Actions
// const handleInput = (value: any) => {
//   previousValue.value = currentValue.value
//   currentValue.value = value
// };

watch(() => currentValue.value, () => {
  if (!props.priceModifiers) return

  props.priceModifiers.forEach((mod, index) => {
    const condition = `"${currentValue.value}" ${operatorToSymbol[mod.condOperator]} "${mod.condValue}"`
    if (!conditionValidator.test(condition)) return false

    if (eval(condition) && !activeModifiers.value[index]) {
      console.log('add from component')
      emits('addModifier', mod.operation, props.id)
      activeModifiers.value[index] = true
    }
    if (!eval(condition) && activeModifiers.value[index]) {
      console.log('remove from component')
      emits('removeModifier', mod.operation, props.id)
      activeModifiers.value[index] = false
    }
  })
})
</script>

<template>
  <FormKitSchema v-model="currentValue" :schema="schemaDefinition"/>
</template>

<style scoped>

</style>