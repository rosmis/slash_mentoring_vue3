<template>
    <div class="flex-grow flex relative items-center">
        <span
            v-if="icon"
            class="left-4 text-gray-400 absolute"
            @click="$emit('click-icon', $event)"
        >
            <mdicon :name="icon" width="20" height="20" />
        </span>

        <input
            :placeholder="placeholder"
            :value="modelValue"
            :required="required"
            :readonly="readonly"
            :disabled="disabled"
            :type="type"
            class="outline-none w-full placeholder-gray-400 disabled:text-gray-500"
            @keyup.enter="emit('enter')"
            :class="[
                {
                    'text-white': accent === 'white',
                    'text-gray-800': accent !== 'white',
                    'bg-white text-gray-800': !accent,
                    'bg-gray-50 text-gray-700': accent === 'light',
                    'bg-gray-900 text-white': accent === 'dark',
                },
                transparent
                    ? 'bg-transparent hover:bg-black/5 focus-within:bg-black/5'
                    : 'bg-white border border-gray-400 hover:border-black focus-within:border-black',
                {
                    'pl-10': icon,
                    'pr-10': reveal,
                },
                {
                    'border-b-white border-b !rounded-none': outlined,
                },
                {
                    'h-12 px-6': size === 'lg',
                    'h-10 px-4': !size,
                    'h-8 px-3 text-sm': size === 'sm',
                    'h-6 px-2 text-xs': size === 'xs',
                },
                !rounded && {
                    'rounded-2xl': size === 'lg',
                    'rounded-xl': !size,
                    'rounded-lg': size === 'sm',
                    'rounded-md': size === 'xs',
                },
                {
                    '!rounded-full': rounded,
                },
            ]"
            @input="$emit('update:modelValue', $event.target.value)"
        />

        <span
            v-if="modelValue && cancelable"
            class="text-gray-400 absolute hover:cursor-pointer hover:text-gray-600"
            @click="$emit('update:modelValue', '')"
            :class="{
                'right-6': size === 'lg',
                'right-4': !size,
                'right-3': size === 'sm',
                'right-2': size === 'xs',
            }"
        >
            <mdicon name="close" width="15" height="15" class="text-black" />
        </span>
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
withDefaults(
    defineProps<{
        accent?: string;
        placeholder?: string;
        modelValue?: string | boolean | number;
        icon?: string;
        cancelable?: boolean;
        size?: string;
        readonly?: boolean;
        type?: string;
        required?: boolean;
        outlined?: boolean;
        autocomplete?: boolean;
        reveal?: boolean;
        transparent?: boolean;
        rounded?: boolean;
        disabled?: boolean;
    }>(),
    {
        accent: undefined,
        placeholder: undefined,
        modelValue: undefined,
        icon: undefined,
        size: undefined,
        type: undefined,
        autocomplete: true,
        cancelable: false,
        readonly: false,
        required: false,
        reveal: false,
        transparent: false,
        disabled: false,
    }
);

const emit = defineEmits<{
    (event: "update:modelValue", modelValue: string | boolean | number): void;
    (event: "enter"): void;
}>();
</script>
