<script setup lang="ts">
import {computed, ref} from "vue";
import {FormKitProvider} from '@formkit/vue'
import {FormKitOptions, getNode} from '@formkit/core'
import config from './formkit.config.ts'
import FormBuilder from "./NodeBuilder.vue";
import {
  FormCondition,
  FormCostItem,
  IConditions,
  IformType,
  IPriceModifier,
  mathOperator,
  mathOperatorValue
} from "./types/formBuilderTypes.ts";
import {conditionValidator, operatorToSymbol} from "./helpers.ts";


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
    conditions: IConditions[],
    type: IformType,
    validation?: any
  }[]
}

defineOptions({
  inheritAttrs: false
})


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
   * Options to configure the form
   */
  options: {
    /**
     * Determine if the form should use the submit default button
     */
    defaultAction?: boolean
    /**
     * Classes for the node component
     */
    nodeClasses?: string
    /**
     *  Personalized classes for sections styling
     */
    sectionClasses?: string
    /**
     * Personalized classes for sections wrappers
     */
    sectionWrapperClasses?: string
    /**
     * Custom Formkit Config
     */
    customFormkitConfig?: FormKitOptions
    /**
     * Global price modifiers
     */
    priceModifiers?: IPriceModifier[]
  }
}>(), {
  initialPrice: 0,
  defaultAction: true
});

// State
const modifiers = ref([] as any[])
const activeModifiers = ref(Array(props.options?.priceModifiers?.length).fill(false))
const formkitConfig: FormKitOptions = props.options?.customFormkitConfig || config
const modifierIds = new Set(props.options?.priceModifiers?.flatMap(mod => {
  const ids = mod.conditions.map(cond => cond.name)
  if (mod.field) {
    ids.push(mod.field)
  }
  return ids
}))

// Getters

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

const handleChange = (id: string) => {
  if (!props.options.priceModifiers || props.options.priceModifiers.length < 1) return
  if (!modifierIds?.has(id)) return

  const priceModifiers = props.options.priceModifiers

  for (let i = 0; i < priceModifiers.length; i++) {

    const allConditionsEval = priceModifiers[i].conditions.every(cond => {
      if (!cond?.name) return false

      const node = getNode(cond.name)?._value as number

      let condition = `${isNaN(node)
          ? `"${node}"` : `${Number(node)}`}
           ${operatorToSymbol[cond.operator]}
           ${isNaN(cond.value) ? `"${cond.value}"` : `${cond.value}`}`

      if (!conditionValidator.test(condition)) return false

      return (eval(condition))
    })

    if (allConditionsEval) {
      activeModifiers.value[i] = true

      const value = Number(priceModifiers[i].field && getNode(priceModifiers[i].field!)?._value)

      if (value) {
        const finalValue = priceModifiers[i].operator === mathOperator.Add
            ? value + Number(priceModifiers[i].value)
            : priceModifiers[i].operator === mathOperator.Mul && value * Number(priceModifiers[i].value)

        addModifier(`${mathOperator.Add} ${finalValue}`, i)
      } else if (!priceModifiers[i].field) {
        addModifier(`${priceModifiers[i].operator} ${priceModifiers[i].value}`, i)
      }

      modifiers.value = modifiers.value.sort((a, b) => a.id - b.id);
    }

    if (!allConditionsEval && activeModifiers.value[i]) {
      activeModifiers.value[i] = false
      removeModifier(i)
    }
  }
}

const addModifier = (operation: string, id: number) => {
  const newModifiers = []
  let exist = false
  for (let mod of modifiers.value) {
    if (mod.id === id) {
      exist = true
      newModifiers.push({operation, id})
    } else {
      newModifiers.push(mod)
    }
  }
  if (exist) {
    modifiers.value = newModifiers
  } else {
    modifiers.value = [...modifiers.value, {operation, id}]
  }
}

const removeModifier = (id: number) => {
  modifiers.value = modifiers.value.filter(m => (m.id !== id))
}

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
    <div :class="options?.sectionWrapperClasses">
      <div :class="options?.sectionClasses" v-for="section in sections">
        <h1 class="section-title" v-if="section.title">{{ section.title }}</h1>
        <template v-for="field in section.fields">
          <form-builder
              v-bind="field"
              :el-type="field.type"
              :id="field.name"
              :viewCondition="field.conditions"
              :priceModifiers="priceModifiersAdjust(field.cost)"
              @input="() => {handleChange(field.id)}"
          />
        </template>
      </div>
    </div>
    <slot name="priceZone" :price="price">
          <span>
            Price: {{ price }}
          </span>
    </slot>
  </FormKitProvider>

</template>

<style scoped>

</style>