<template>
    <ui-page v-if="userSession">
        <ui-wrapper>
            <DashboardHeader :user-infos="user.data" />

            <div class="rounded-3xl">
                <ui-level vertical-align="top" class="relative" space="lg">
                    <ui-level
                        class="flex-col w-2/3"
                        vertical-align="top"
                        space="lg"
                    >
                        <ui-input
                            v-model="search"
                            placeholder="Rechercher une formation..."
                            class="w-full"
                        />

                        <div
                            v-if="
                                filteredTrainings && filteredTrainings.data.data
                            "
                            class="w-full grid gap-8 grid-cols-2"
                        >
                            <template
                                v-for="(training, index) in filteredTrainings
                                    .data.data"
                                :key="training.id"
                            >
                                <TrainingCard
                                    :training="training"
                                    :color="
                                        useTrainingCardColors()[
                                            index %
                                                useTrainingCardColors().length
                                        ]
                                    "
                                />
                            </template>
                        </div>
                    </ui-level>
                    <TrainingPlanningCard class="w-1/3" />
                </ui-level>
            </div>
        </ui-wrapper>
    </ui-page>
</template>

<script lang="ts" setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useQuery } from "vue-query";
import { headerOptions } from "../../composables/auth/useHeadersToken";
import { useTrainingCardColors } from "../../composables/utils/useTrainingCardColors";
import { userStore } from "../../store/user";
import { userSession } from "../../types/userSession";

const user = userStore();

const search = ref("");

const { data: trainings } = useQuery(["trainings"], () =>
    axios.get(
        `${import.meta.env.VITE_STRAPI_URL}/api/trainings?populate=*`,
        headerOptions
    )
);

const filteredTrainings = computed(() => {
    if (!trainings.value) return undefined;

    if (!search.value) return trainings.value;

    return trainings.value.data.data.filter((training) =>
        training.attributes.title.toLowerCase().includes(search.value)
    );
});

onMounted(() => {
    user.handleUserSessionInfos();
});
</script>
