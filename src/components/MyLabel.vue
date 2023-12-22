<script setup lang="ts">
withDefaults(defineProps<{
  /**
   * Label text that will be used
   */
  label: string
  /**
   * Define the size of the label
   */
  size?: 'normal' | 'h1' | 'h2'
  /**
   * Used to determine if the text is capitalized
   */
  cap?: boolean
}>(), {
  label: 'Hello World',
})
</script>

<template>
  <h1 class="text-6xl">{{ label }}</h1>
</template>

<style scoped>

</style>