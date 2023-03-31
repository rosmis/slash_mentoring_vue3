<template>
    <h1
        class="leading-tight"
        :class="[
            {
                'text-lg': !size,
                'text-xl': size === 'xl',
                'text-2xl': size === '2xl',
                'text-3xl': size === '3xl',
                'text-4xl': size === '4xl',
                'text-5xl': size === '5xl',
            },

            {
                'text-[#313A56]': color === 'dark-blue',
                'text-white': !color,
            },
        ]"
    >
        <slot />
    </h1>
</template>

<script lang="ts" setup>
defineProps<{
    color?: string;
    size?: string;
}>();
</script>
