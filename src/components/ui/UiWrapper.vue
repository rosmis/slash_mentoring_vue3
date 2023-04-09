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
            },
            {
                'py-12 px-8': padded === true,
            },
            {
                'rounded-3xl': rounded === true,
                'rounded-xl': rounded === 'sm',
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
    rounded?: boolean | string;
    padded?: boolean;
    shadow?: boolean;
}>();
</script>
