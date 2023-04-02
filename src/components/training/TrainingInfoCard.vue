<template>
    <ui-level class="flex-col" align="center" space="sm">
        <ui-level
            class="rounded-lg flex-col h-22 p-2 w-22"
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
            <p
                :class="{
                    'text-[#DB5784]': cardContent.color === 'pink',
                    'text-[#4540EA]': cardContent.color === 'light-blue',
                    'text-[#55C9A7]': cardContent.color === 'green',
                    'text-[#1A098C]': cardContent.color === 'dark-blue',
                }"
            >
                {{ cardContent.content }}
            </p>
        </ui-level>

        <div
            class="border-b pb-1"
            :class="{
                'border-b-[#DB5784]': cardContent.color === 'pink',
                'border-b-[#4540EA]': cardContent.color === 'light-blue',
                'border-b-[#55C9A7]': cardContent.color === 'green',
                'border-b-[#1A098C]': cardContent.color === 'dark-blue',
            }"
        >
            <p
                :class="{
                    'text-[#DB5784]': cardContent.color === 'pink',
                    'text-[#4540EA]': cardContent.color === 'light-blue',
                    'text-[#55C9A7]': cardContent.color === 'green',
                    'text-[#1A098C]': cardContent.color === 'dark-blue',
                }"
            >
                {{ cardContent.title }}
            </p>
        </div>
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
