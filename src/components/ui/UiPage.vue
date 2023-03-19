<template>
    <div
        :class="[
            {
                'h-full': full,
                'h-[91vh]': screen === true,
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
