<template>
    <router-link
        :to="{ name: 'Training', params: { id: training.id } }"
        class="w-full"
    >
        <ui-wrapper
            rounded="sm"
            :style="{ backgroundColor: color }"
            class="cursor-pointer w-full transition-shadow hover:shadow-lg"
        >
            <ui-level class="flex-col w-full" vertical-align="top" space="xs">
                <p v-if="training.attributes.trainer.data" class="text-white">
                    Avec
                    {{
                        useFullName(
                            training.attributes.trainer.data.attributes
                                .firstName,
                            training.attributes.trainer.data.attributes.lastName
                        )
                    }}
                </p>
                <p class="text-white text-lg">
                    {{ training.attributes.title }}
                </p>
                <p class="text-white">
                    {{ moment(training.attributes.date).format("HH[h]mm") }}
                </p>
            </ui-level>
        </ui-wrapper>
    </router-link>
</template>

<script lang="ts" setup>
import moment from "moment";
import { useFullName } from "../../composables/utils/useFullName";

defineProps<{
    training: any;
    color: string;
}>();
</script>
