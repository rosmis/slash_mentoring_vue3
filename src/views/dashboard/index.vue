<template>
    <ui-wrapper v-if="userSession">
        <ui-level class="flex-col" vertical-align="top">
            <UiLoader v-if="!isSubscribedTrainingsFetched" />
            <DashboardHeader
                v-else
                :user-infos="user.data"
                :subscribed-trainings="subscribedTrainings.data.data"
                :is-mobile="isMobile"
                @day-click="selectedDate = $event"
                @clear="selectedDate = undefined"
            />

            <ui-level vertical-align="top" class="w-full relative" space="lg">
                <ui-level
                    class="flex-col w-full"
                    vertical-align="top"
                    :class="{ 'w-2/3': !isMobile }"
                >
                    <ui-button
                        v-if="isMobile"
                        accent="secondary"
                        class="w-full"
                        icon="account-clock-outline"
                        @click="isSuggestedTrainingModalOpen = true"
                    >
                        Proposer un nouveau cours
                    </ui-button>

                    <ui-input
                        v-model="search"
                        placeholder="Rechercher une formation..."
                        class="w-full"
                        icon="magnify"
                        size="lg"
                        cancelable
                    />

                    <UiLoader v-if="!isFetched" />
                    <div
                        v-if="
                            filteredTrainings &&
                            filteredTrainings.data.data.length
                        "
                        :class="{
                            'w-full grid gap-8 grid-cols-2': !isMobile,
                            'flex flex-col items-start gap-4 w-full': isMobile,
                        }"
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

                    <p v-else class="text-sm text-center w-full text-gray-400">
                        Aucuns tutorats de programmés, veuillez revenir plus
                        tard !
                    </p>
                </ui-level>

                <UiLoader v-if="!isSubscribedTrainingsFetched" />
                <TrainingPlanning
                    v-else-if="!isMobile"
                    :subscribed-trainings="subscribedTrainings.data.data"
                    :selected-date="selectedDate"
                    class="w-1/3"
                    @modalOpen="isSuggestedTrainingModalOpen = true"
                />
            </ui-level>
        </ui-level>

        <ui-modal v-model="isSuggestedTrainingModalOpen">
            <TrainingSuggestionModal
                :is-mobile="isMobile"
                @close="isSuggestedTrainingModalOpen = false"
            />
        </ui-modal>
    </ui-wrapper>
</template>

<script lang="ts" setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useQuery } from "vue-query";
import { headerOptions } from "../../composables/auth/useHeadersToken";
import { useMobileBreakpoint } from "../../composables/mobile/useMobileBreakpoints";
import { useTrainingCardColors } from "../../composables/utils/useTrainingCardColors";
import { userStore } from "../../store/user";
import { userSession } from "../../types/userSession";

const user = userStore();

const search = ref("");
const selectedDate = ref<Date>();

const isMobile = useMobileBreakpoint("md");
const isSuggestedTrainingModalOpen = ref(false);

const { data: trainings, isFetched } = useQuery(
    ["trainings"],
    () =>
        axios.get(
            `${
                import.meta.env.VITE_STRAPI_URL
            }/api/trainings?filters[date][$gt]=${new Date().toISOString()}&populate=trainer.profilePicture,backgroundImage`,
            headerOptions
        ),
    {
        refetchOnWindowFocus: false,
    }
);

const { data: subscribedTrainings, isFetched: isSubscribedTrainingsFetched } =
    useQuery(
        ["subscribedTrainings", userSession.value.user.email],
        () =>
            axios.get(
                `${
                    import.meta.env.VITE_STRAPI_URL
                }/api/trainings?filters[user_trainings][user][$eq]=${
                    userSession.value.user.email
                }&populate=trainer`,
                headerOptions
            ),
        {
            refetchOnWindowFocus: false,
        }
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
