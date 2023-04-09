<template>
    <Component
        is="button"
        :class="[
            'outline-none flex-shrink-0  z-0 gap-2 relative inline-flex items-center select-none focus:outline-none justify-center cursor-pointer disabled:cursor-default transition',

            {
                '!rounded-full': rounded,
                'ring-1 ring-[#1A098C] !text-[#1A098C] !bg-opacity-0 !not-disabled:hover:bg-opacity-20':
                    outlined,
            },

            {
                xl: ['h-16 text-xl px-8', { 'rounded-3xl': !rounded }],
                lg: ['h-12 text-lg px-6', { 'rounded-lg': !rounded }],
                base: ['h-10 px-8 py-4', { 'rounded-lg': !rounded }],
                sm: ['h-8 text-sm px-3', { 'rounded-lg': !rounded }],
                xs: ['h-6 text-xs px-2', { 'rounded-md': !rounded }],
            }[size],

            {
                'text-white bg-[#1A098C] not-disabled:hover:bg-[#4540EA]':
                    !accent || accent === 'primary',
                '!text-white bg-[#00C4B3] not-disabled:hover:bg-[#71E2C1]':
                    accent === 'secondary',
                '!text-black bg-white not-disabled:hover:bg-[#71E2C1]':
                    accent === 'white',
            },
        ]"
    >
        <ui-level space="sm">
            <slot></slot>
            <mdicon
                v-if="loading"
                name="loading"
                width="40"
                class="mdi-spin"
                :class="{
                    'text-white': !outlined,
                    'text-[#1A098C]': outlined,
                }"
            />
        </ui-level>
    </Component>
</template>

<script lang="ts" setup>
withDefaults(
    defineProps<{
        outlined?: boolean;
        rounded?: boolean;
        loading?: boolean;
        accent?: string;
        size?: string;
    }>(),
    {
        size: "base",
        accent: "primary",
        rounded: false,
        loading: undefined,
        outlined: false,
    }
);
</script>
