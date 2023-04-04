<template>
    <ui-wrapper rounded :style="{ backgroundColor: color }" class="w-full">
        <ui-level class="flex-col w-full" vertical-align="top">
            <p>{{ training.attributes.title }}</p>
            <p>{{ moment(training.attributes.date).format("HH[h]mm") }}</p>
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
import moment from "moment";

defineProps<{
    training: any;
    color: string;
}>();
</script>
