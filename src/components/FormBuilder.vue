<script setup lang="ts">
import {FormKitSchema} from '@formkit/vue'
import {computed} from "vue";

const props = defineProps<{
  /**
   * Label for the Form
   */
  label: string
  /**
   * Form Type ej(text, radio, select, checkbox, etc...
   */
  elType: 'text' | 'select' | 'number'
  /**
   * String that will define the type of the form, is necessary only in some elTypes
   */
  elSubtype?: 'select' | 'radio' | 'checkbox'
  /**
   * Options in case the element is a select type
   */
  options?: string[]
}>();

const schemaDefinition = computed(() => ({
  $formkit: props.elSubtype || props.elType,
  label: props.label,
  options: props.options || []
}))
</script>

<template>
  <FormKitSchema :schema="schemaDefinition"/>
</template>

<style scoped>

</style>