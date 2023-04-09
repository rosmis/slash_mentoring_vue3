<template>
    <ui-level class="h-80 w-full" space="lg">
        <ui-wrapper class="h-full w-2/3" color="blue" rounded>
            <h1 class="font-semibold text-white text-2xl">
                Bonjour, {{ userInfos.full_name }}
            </h1>
            <h2 class="text-white text-xl">
                Aujourd'hui, le {{ moment().locale("fr").format("LL") }}, vous
                n'avez aucun cours de prévu.
            </h2>
        </ui-wrapper>

        <ui-wrapper shadow rounded class="w-1/3">
            <ui-title color="dark-blue" size="xl">Mon Agenda</ui-title>
            <VCalendar
                :attributes="attrs"
                expanded
                borderless
                @dayclick="emit('day-click', $event.date)"
                @dayfocusout="emit('clear')"
            />
        </ui-wrapper>
    </ui-level>
</template>

<script lang="ts" setup>
import moment from "moment";
import "moment/dist/locale/fr";
import { ref } from "vue";

const props = defineProps<{
    userInfos: {
        username: string;
        website: string;
        avatar_url: string;
        full_name: string;
    };
    subscribedTrainings: any[];
}>();

const emit = defineEmits<{
    (event: "day-click", value: Date): void;
    (event: "clear"): void;
}>();

const attrs = ref([
    {
        key: "today",
        highlight: {
            fillMode: "outline",
        },
        dates: new Date(),
    },

    ...props.subscribedTrainings.map((training) => {
        return {
            dates: training.attributes.date,
            dot: {
                color: "blue",
            },
            popover: {
                label: training.attributes.title,
            },
        };
    }),
]);
</script>
