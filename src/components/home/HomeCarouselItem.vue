<template>
    <div
        class="bg-no-repeat bg-cover rounded-xl flex flex-col h-full min-h-100 gap-4 items-center justify-center"
        :style="{
            'background-image': `linear-gradient(0deg, rgba(26,9,140,0.4) 0%, rgba(16,14,81,0.4) 100%), url(${backgroundUrl})`,
        }"
    >
        <h1 class="font-semibold text-white text-2xl">
            {{ title }}
        </h1>
        <p class="text-white text-xl text-center" v-html="content"></p>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    title: string;
    content: string;
    backgroundUrl: string;
}>();
</script>
