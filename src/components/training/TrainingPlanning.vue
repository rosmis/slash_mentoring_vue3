<template>
    <ui-wrapper rounded color="white" shadow class="top-0 sticky">
        <ui-level class="flex-col" vertical-align="top">
            <ui-title color="dark-blue">Mon Planning</ui-title>

            <ui-level
                v-if="subscribedTrainings && subscribedTrainings.length"
                class="flex-col w-full"
            >
                <TrainingPlanningCard
                    v-for="(training, index) in subscribedTrainings"
                    :key="`training-${index}`"
                    :training="training"
                    :color="
                        useTrainingCardColors()[
                            index % useTrainingCardColors().length
                        ]
                    "
                />
            </ui-level>

            <p v-else>Vous n'êtes inscrit à aucuns cours</p>
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
import { useTrainingCardColors } from "../../composables/utils/useTrainingCardColors";

defineProps<{
    subscribedTrainings: any[];
}>();
</script>
