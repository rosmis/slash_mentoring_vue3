<template>
  <div class="py-4 px-8" :class="[{ 'container mx-auto': container === true }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  container?: boolean;
}>();
</script>
