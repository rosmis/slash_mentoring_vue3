<template>
    <ui-page v-if="userSession" screen>
        <ui-wrapper>
            <DashboardHeader :user-infos="user.data" />

            <div class="rounded-3xl">
                <ui-level>
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
                            v-if="trainings"
                            class="w-full grid gap-8 grid-cols-2"
                        >
                            <TrainingCard
                                v-for="(training, index) in trainings.data.data"
                                :key="training.id"
                                :training="training"
                                :color="
                                    useTrainingCardColors()[
                                        index % useTrainingCardColors().length
                                    ]
                                "
                            />
                        </div>
                    </ui-level>
                    <div class="w-1/3"></div>
                </ui-level>
            </div>
        </ui-wrapper>
    </ui-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useTrainings } from "../../composables/trainings/useTrainings";
import { useTrainingCardColors } from "../../composables/utils/useTrainingCardColors";
import { userStore } from "../../store/user";
import { userSession } from "../../types/userSession";

const user = userStore();

const trainings = useTrainings();

onMounted(() => {
    user.handleUserSessionInfos();
});

let search = ref<string>("");
</script>
