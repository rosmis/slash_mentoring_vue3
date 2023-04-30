<template>
    <ui-wrapper rounded color="white" class="shadow-lg self-stretch">
        <ui-level class="flex-col" space="sm">
            <img
                :src="`https://res.cloudinary.com/dlirhziq5/image/upload/v1682856319/${cardContent.icon}_icon.svg`"
                :alt="cardContent.icon"
            />
            <p class="text-lg text-black text-center">
                {{ cardContent.title }}
            </p>
            <p class="text-black text-center">{{ cardContent.content }}</p>
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
defineProps<{
    cardContent: {
        icon: string;
        title: string;
        content: string;
    };
}>();
</script>
