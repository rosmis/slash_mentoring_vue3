<template>
    <h1
        class="leading-tight"
        :class="[
            {
                'text-lg': !size,
                'text-xl': size === 'xl',
                'text-2xl': size === '2xl',
            },

            {
                'text-[#313A56]': !color,
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
