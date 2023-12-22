<script setup lang="ts">
withDefaults(defineProps<{
  /**
   * Label text that will be used
   */
  label: string
}>(), {
  label: 'Hello World',
})
</script>

<template>
  <h1>{{ label }}</h1>
</template>

<style scoped>

</style>