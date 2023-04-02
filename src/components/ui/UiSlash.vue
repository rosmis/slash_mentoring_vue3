<template>
    <div
        class="h-full bg-[#1a098c1a] skew top-0 bottom-0 -z-1 absolute"
        :class="[
            {
                'w-70': !size,
                'w-50': size === 'lg',
            },
            {
                'right-55': !position,
                'right-0': position === 'right',
            },
        ]"
    ></div>
</template>

<script lang="ts" setup>
defineProps<{
    size?: string;
    position?: string;
}>();
</script>

<style scoped>
.skew {
    transform: skewX(-40deg);
}
</style>
