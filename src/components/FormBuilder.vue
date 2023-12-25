<script setup lang="ts">
import {FormKitSchema} from '@formkit/vue'
import {computed} from "vue";
import {nodeBuilder} from "../helpers/schemaDefinition.ts";
import {IConditions, IformType} from "../types/formBuilderTypes.ts";

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
  conditions?: IConditions[],

  validation?: any,
}>();

const schemaDefinition = computed(() => {
  return nodeBuilder(props.elType, {
    options: props.options,
    id: props.id,
    conditions: props.conditions,
    label: props.label,
    validation: props.validation
  })
})
</script>

<template>
  <FormKitSchema :schema="schemaDefinition"/>
</template>

<style scoped>

</style>