<template>
  <div class="flex-grow flex relative items-center">
    <span
      v-if="icon"
      class="left-4 text-gray-400 absolute"
      @click="$emit('click-icon', $event)"
    >
      <i :class="[`mdi mdi-${icon}`, { 'mdi-24px': size === 'xl' }]"></i>
    </span>

    <input
      :placeholder="placeholder"
      :value="value"
      :required="required"
      :readonly="readonly"
      :type="type"
      class="outline-none w-full placeholder-gray-400 disabled:text-gray-500"
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
          : 'bg-white border hover:border-gray-300 focus-within:border-gray-300',
        {
          'pl-10': icon,
          'pr-10': reveal,
        },
        {
          'h-12 px-6 text-lg': size === 'lg',
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
      @input="$emit('input', $event.target.value)"
    />

    <span
      v-if="value && cancelable"
      class="text-gray-400 absolute hover:cursor-pointer hover:text-gray-600"
      @click="$emit('input', '')"
      :class="{
        'right-6': size === 'lg',
        'right-4': !size,
        'right-3': size === 'sm',
        'right-2': size === 'xs',
      }"
    >
      <i class="mdi mdi-close" :class="{ 'mdi-24px': size === 'xl' }"> </i>
    </span>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    accent?: string;
    placeholder?: string;
    value?: string | boolean | number;
    icon?: string;
    cancelable?: boolean;
    size?: string;
    readonly?: boolean;
    type?: string;
    required?: boolean;
    autocomplete?: boolean;
    reveal?: boolean;
    transparent?: boolean;
    rounded?: boolean;
  }>(),
  {
    accent: undefined,
    placeholder: undefined,
    value: undefined,
    icon: undefined,
    size: undefined,
    type: undefined,
    autocomplete: true,
    cancelable: false,
    readonly: false,
    required: false,
    reveal: false,
    transparent: false,
  }
);
</script>
