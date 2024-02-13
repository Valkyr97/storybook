<script setup lang="ts">
import {ref} from "vue";
import draggable from 'vuedraggable'

const formElements = ref([])
const handlerClassName = 'handler'
</script>

<template>
  <draggable
      v-model="formElements"
      group="people"
      item-key="id"
      handle=".handler"
  >
    <template #item="{element}">
      <slot :element="element" :handlerClass="handlerClassName" >

      </slot>
    </template>
  </draggable>
</template>

<style scoped>

</style>