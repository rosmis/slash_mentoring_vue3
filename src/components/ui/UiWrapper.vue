<template>
    <div
        class="py-4 px-8"
        :class="[
            {
                'container mx-auto': container === true,
            },
            {
                'bg-[#ECF1FE]': color === 'light-blue',
                'bg-[#0F0D2B]': color === 'blue',
                'bg-white': color === 'white',
                'rounded-3xl': rounded === true,
            },
            {
                'py-12 px-8': padded === true,
            },
            {
                'shadow-md': shadow === true,
            },
        ]"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    container?: boolean;
    color?: string;
    rounded?: boolean;
    padded?: boolean;
    shadow?: boolean;
}>();
</script>
