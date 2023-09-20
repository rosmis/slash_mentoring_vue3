<template>
    <ui-wrapper padded>
        <ui-level class="flex-col" vertical-align="top">
            <ui-title color="dark-blue"> Contact </ui-title>

            <AboutContactForm :is-mobile="isMobile" />
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
defineProps<{
    isMobile: boolean;
}>();
</script>
