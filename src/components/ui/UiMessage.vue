<template>
    <div
        class="border rounded-xl"
        v-bind="$attrs"
        :class="[
            {
                'p-4': !size,
                'px-3 py-2': size === 'sm',
            },
            {
                'text-sm': size === 'sm',
                'text-lg': size === 'lg',
                'text-xl': size === 'xl',
                'text-2xl': size === '2xl',
            },

            {
                'text-blue-700': color === 'blue',
                'text-green-700': color === 'green',
                'text-red-700': color === 'red',
                'text-yellow-700': color === 'yellow',
                'text-gray-700': color === 'gray',
            },
            {
                'bg-blue-50': color === 'blue',
                'bg-green-50': color === 'green',
                'bg-red-50': color === 'red',
                'bg-yellow-50': color === 'yellow',
                'bg-gray-50': color === 'gray',
            },
            {
                'border-blue-100': color === 'blue',
                'border-green-100': color === 'green',
                'border-red-100': color === 'red',
                'border-yellow-100': color === 'yellow',
                'bg-gray-50': color === 'gray',
            },
            {
                'flex flex-col gap-2': title,
            },
        ]"
    >
        <p v-if="title" class="flex gap-2 items-center">
            <UiIcon v-if="icon" :size="size" :icon="icon" />
            <UiIcon v-else-if="iconPath" :size="size" :path="iconPath" />

            <span class="text-xs tracking-widest uppercase">
                {{ title }}
            </span>
        </p>

        <template v-else>
            <UiIcon v-if="icon" :size="size" :icon="icon" />
            <UiIcon v-else-if="iconPath" :size="size" :path="iconPath" />
        </template>

        <slot>
            {{ value }}
        </slot>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    icon?: string;
    iconPath?: string;
    value?: string;
    size?: string;
    color?: string;

    title?: string;
}>();
</script>
