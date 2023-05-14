<template>
    <div
        v-if="modelValue"
        class="flex flex-col bg-black/25 inset-0 z-40 fixed overflow-y-auto backdrop-filter backdrop-blur-sm"
        :class="[
            {
                'p-8': padded && !isMobile,
            },
        ]"
        @click="emit('update:modelValue', false)"
    >
        <div class="top-4 right-4 absolute">
            <ui-button
                icon="close"
                transparent
                @click="emit('update:modelValue', false)"
            />
        </div>
        <!-- Extra div to allow centering + overflowing at the same time, didn't find another way -->
        <div
            class="flex flex-col min-h-full shadow-xl w-full items-center justify-center"
            @click.stop="emit('update:modelValue', false)"
        >
            <div :class="{ 'w-full': expanded, 'h-full': full }" @click.stop>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    model: {
        prop: "modelValue",
        event: "update:modelValue",
    },
};
</script>

<script lang="ts" setup>
defineProps<{
    modelValue?: boolean;
    full?: boolean;
    padded?: boolean;
    expanded?: boolean;
    isMobile?: boolean;
}>();

const emit = defineEmits<{
    (event: "update:modelValue", modelValue: boolean): void;
}>();
</script>
