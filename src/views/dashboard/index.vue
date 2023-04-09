<template>
    <ui-wrapper v-if="userSession">
        <ui-level class="flex-col" vertical-align="top">
            <DashboardHeader :user-infos="user.data" />

            <ui-level vertical-align="top" class="w-full relative" space="lg">
                <ui-level class="flex-col w-2/3" vertical-align="top">
                    <ui-input
                        v-model="search"
                        placeholder="Rechercher une formation..."
                        class="w-full"
                    />

                    <UiLoader v-if="!isFetched" />
                    <div
                        v-if="filteredTrainings && filteredTrainings.data.data"
                        class="w-full grid gap-8 grid-cols-2"
                    >
                        <template
                            v-for="(training, index) in filteredTrainings.data
                                .data"
                            :key="training.id"
                        >
                            <TrainingCard
                                :training="training"
                                :color="
                                    useTrainingCardColors()[
                                        index % useTrainingCardColors().length
                                    ]
                                "
                            />
                        </template>
                    </div>
                </ui-level>

                <UiLoader v-if="!isSubscribedTrainingsFetched" />
                <TrainingPlanning
                    v-else
                    :subscribed-trainings="subscribedTrainings.data.data"
                    class="w-1/3"
                />
            </ui-level>
        </ui-level>
    </ui-wrapper>
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

const { data: trainings, isFetched } = useQuery(["trainings"], () =>
    axios.get(
        `${
            import.meta.env.VITE_STRAPI_URL
        }/api/trainings?populate=trainer.profilePicture,backgroundImage`,
        headerOptions
    )
);

const { data: subscribedTrainings, isFetched: isSubscribedTrainingsFetched } =
    useQuery(["subscribedTrainings", userSession.value.user.email], () =>
        axios.get(
            `${
                import.meta.env.VITE_STRAPI_URL
            }/api/trainings?filters[user_trainings][user][$eq]=${
                userSession.value.user.email
            }&populate=trainer`,
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
