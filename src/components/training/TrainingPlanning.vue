<template>
    <ui-wrapper rounded color="white" shadow class="top-0 sticky">
        <ui-level class="flex-col" vertical-align="top">
            <ui-title color="dark-blue" class="mb-2">Mon Planning</ui-title>

            <ui-level
                v-if="subscribedTrainings && subscribedTrainings.length"
                class="flex-col w-full"
                vertical-align="top"
            >
                <template
                    v-for="(
                        sortedSubscribedDate, dateIndex
                    ) in sortedSubscribedDates"
                    :key="`date-${dateIndex}`"
                >
                    <p class="text-[#1A098C]">
                        {{ useFrenchFormattedDate(sortedSubscribedDate) }}
                    </p>

                    <TrainingPlanningCard
                        v-for="(training, index) in subscribedTrainings.filter(
                            (training) =>
                                useFrenchFormattedDate(
                                    training.attributes.date
                                ) ===
                                useFrenchFormattedDate(sortedSubscribedDate)
                        )"
                        :key="`training-${index}`"
                        :training="training"
                        :color="
                            useTrainingCardColors()[
                                dateIndex % useTrainingCardColors().length
                            ]
                        "
                    />
                </template>
            </ui-level>

            <p v-else>Vous n'êtes inscrit à aucuns cours</p>
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
import moment from "moment";
import { computed } from "vue";
import { useFrenchFormattedDate } from "../../composables/utils/useFrenchFormattedDate";
import { useTrainingCardColors } from "../../composables/utils/useTrainingCardColors";

const props = defineProps<{
    subscribedTrainings: any[];
}>();

const sortedSubscribedDates = computed(() => [
    ...new Set( // we use Set here to have a collection of values that only occur once
        props.subscribedTrainings
            .map((training) => training.attributes.date)
            .filter((date) => moment(date).isAfter(moment(), "day"))
            .sort((a, b) => moment(a).diff(moment(b)))
    ),
]);
</script>
