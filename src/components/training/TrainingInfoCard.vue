<template>
    <ui-level class="flex-col" align="center" space="sm">
        <ui-level
            class="rounded-lg flex-col h-20 w-20"
            align="center"
            space="sm"
            :class="{
                'bg-[#FAE6ED]': cardContent.color === 'pink',
                'bg-[#E2E2FC]': cardContent.color === 'light-blue',
                'bg-[#E5F7F2]': cardContent.color === 'green',
                'bg-[#CFCCE6]': cardContent.color === 'dark-blue',
            }"
        >
            <img
                :src="`https://res.cloudinary.com/dlirhziq5/image/upload/v1680278364/${cardContent.icon}.svg`"
                class="w-8"
            />
            <p>{{ cardContent.content }}</p>
        </ui-level>

        <p>{{ cardContent.title }}</p>
    </ui-level>
</template>

<script lang="ts" setup>
defineProps<{
    cardContent: {
        title: string;
        content: string;
        color: string;
        icon: string;
    };
}>();
</script>
