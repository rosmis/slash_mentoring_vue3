<template>
    <ui-wrapper
        color="blue"
        rounded="sm"
        class="w-screen-lg"
        :class="{
            '!w-full': isMobile,
        }"
    >
        <TrainingSuggestionForm :is-mobile="isMobile" @close="$emit('close')" />
    </ui-wrapper>
</template>

<script lang="ts" setup>
defineProps<{
    isMobile: boolean;
}>();
</script>
