<template>
    <ui-wrapper
        rounded
        color="white"
        shadow
        class="w-full max-h-130 top-0 sticky overflow-y-scroll"
    >
        <ui-level class="flex-col" vertical-align="top">
            <ui-title
                v-if="!showPreviousTrainings"
                color="dark-blue"
                class="mb-2"
                size="xl"
                >Mon Planning</ui-title
            >

            <ui-level
                v-if="sortedSubscribedDates && sortedSubscribedDates.length"
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

            <p v-else-if="props.selectedDate">
                Vous n'êtes inscrit à aucun cour ce jour
            </p>
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
    selectedDate?: Date;
    showPreviousTrainings?: boolean;
}>();

// TODO type this shit correctly
const sortedSubscribedDates = computed(() => [
    ...Object.values(
        // pretty nasty way of filtering single date for each day, tried to use uniq lodash but didn't work
        props.subscribedTrainings
            .map((training) => training.attributes.date)
            .filter(
                (date) =>
                    (props.showPreviousTrainings
                        ? moment(date).isBefore(moment(), "day")
                        : moment(date).isAfter(moment(), "day")) &&
                    (props.selectedDate
                        ? useFrenchFormattedDate(date) ===
                          useFrenchFormattedDate(props.selectedDate)
                        : date)
            )
            .sort((a, b) => moment(a).diff(moment(b)))
            .reduce((acc, date) => {
                const dateOnly = moment(date).format("YYYY-MM-DD");
                acc[dateOnly] = date;
                return acc;
            }, {})
    ),
]);
</script>
