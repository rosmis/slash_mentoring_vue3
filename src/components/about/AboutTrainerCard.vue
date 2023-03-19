<template>
    <ui-wrapper
        rounded
        color="white"
        class="bg-cover h-100 w-80"
        :style="{
            backgroundImage: `linear-gradient(0deg, #100E51 0%, rgba(16,14,81,0.3) 100%),
                            url(${trainer.attributes.profilePicture.data.attributes.url})`,
        }"
    >
        <ui-level
            class="flex-col h-full"
            space="xs"
            vertical-align="top"
            align="right"
        >
            <p class="text-lg text-center text-white uppercase">
                {{ trainer.attributes.firstName }}
                {{ trainer.attributes.lastName }}
            </p>
            <p class="text-center text-white mb-4">
                {{ trainer.attributes.educationLevel }}
            </p>
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
defineProps<{
    trainer: any;
}>();
</script>
