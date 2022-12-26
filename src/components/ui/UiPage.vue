<template>
  <div
    :class="[
      {
        'h-full': full,
        'h-screen': screen === true,
      },
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  full?: boolean;
  screen?: boolean;
}>();
</script>
