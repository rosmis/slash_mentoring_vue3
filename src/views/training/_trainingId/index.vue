<template>
    <ui-page>
        <ui-level class="h-full h-130" space="none">
            <!-- <ui-wrapper padded class="w-3/5 relative"> -->
            <ui-level
                v-if="training"
                class="flex-col h-full px-8 w-3/5 test relative"
                align="center"
                space="lg"
            >
                <ui-title size="4xl" color="dark-blue">{{
                    training.data.data.attributes.title
                }}</ui-title>

                <ui-level space="lg">
                    <TrainingInfoCard
                        v-for="(card, index) in trainingCardContent"
                        :key="`card-${index}`"
                        :card-content="card"
                    />
                </ui-level>

                <ui-button
                    v-if="!userTraining.data.data.length"
                    @click="createUserTraining()"
                    :loading="loading"
                >
                    Je suis intéréssé
                </ui-button>
                <ui-level
                    v-else-if="
                        userTraining.data.data.length &&
                        !userTraining.data.data[0].attributes.didUserPay
                    "
                >
                    <ui-button
                        outlined
                        :loading="unsubscribeLoading"
                        @click="unSubscribe()"
                    >
                        Se desinscrire
                    </ui-button>
                    <ui-button @click="payTraining()" :loading="loading">
                        Payer avec Lydia
                    </ui-button>
                </ui-level>
                <p v-else>Vous êtes bien inscrit monsieur</p>
                <UiSlash size="lg" position="right" />
            </ui-level>
            <UiLoader v-else />

            <ui-level class="h-full w-2/5">
                <div
                    v-if="training"
                    class="bg-no-repeat bg-cover h-full w-full"
                    :style="{
                        backgroundImage: `url(${training.data.data.attributes.backgroundImage.data.attributes.url})`,
                    }"
                ></div>
                <n-skeleton v-else class="h-130 w-full" />
            </ui-level>
        </ui-level>
    </ui-page>
</template>

<script lang="ts" setup>
import axios from "axios";
import moment from "moment";
import { NSkeleton, useMessage } from "naive-ui";
import { computed, ref, watch } from "vue";
import { useQuery } from "vue-query";
import { useRoute } from "vue-router";
import { headerOptions } from "../../../composables/auth/useHeadersToken";
import { useUserTraining } from "../../../composables/trainings/useUserTraining";
import { useLydiaStore } from "../../../store/lydia";
import { userSession } from "../../../types/userSession";

const route = useRoute();
const message = useMessage();
const lydiaStore = useLydiaStore();

let loading = ref(false);
let unsubscribeLoading = ref(false);

let { data: training, refetch } = useQuery(
    ["training", route.params.id],
    () =>
        axios.get(
            `${import.meta.env.VITE_STRAPI_URL}/api/trainings/${Number(
                route.params.id
            )}?populate=*`,
            headerOptions
        ),
    {
        refetchOnWindowFocus: false,
    }
);

const trainingCardContent = computed(() => [
    {
        title: "date",
        content: moment(training?.value.data.data.attributes.date).format(
            "DD/MM"
        ),
        color: "pink",
        icon: "calendar",
    },
    {
        title: "heure",
        content: moment(training?.value.data.data.attributes.date).format(
            "HH[h]mm"
        ),
        color: "light-blue",
        icon: "clock",
    },
    {
        title: "durée",
        content: training?.value.data.data.attributes.duration,
        color: "green",
        icon: "timing",
    },
    {
        title: "places",
        content: `${training?.value.data.data.attributes.maxUserTrainings} MAX`,
        color: "dark-blue",
        icon: "seats",
    },
]);

const { userTraining, refetchUserTraining } = useUserTraining(+route.params.id);

watch(
    userTraining,
    async () => {
        if (
            userTraining &&
            userTraining.value.data.data[0].attributes.request_uuid
        ) {
            const response = await lydiaStore.checkPayementStatus(
                userTraining.value.data.data[0].attributes.request_uuid
            );

            if (response.state === 1) {
                await axios.put(
                    `${import.meta.env.VITE_STRAPI_URL}/api/user-trainings/${
                        userTraining.value.data.data[0].id
                    }`,
                    {
                        data: {
                            didUserPay: true,
                        },
                    },
                    headerOptions
                );
            }
        }
    },
    { deep: true }
);

async function createUserTraining() {
    if (!training) return;

    const userTraining = ref({
        user: userSession.value.user.email,
        trainingId: Number(route.params.id),
        didUserPay: false,
    });
    const userTrainingId = ref();

    loading.value = true;
    try {
        await axios
            .post(
                `${import.meta.env.VITE_STRAPI_URL}/api/user-trainings`,
                {
                    data: userTraining.value,
                },
                headerOptions
            )
            .then((response) => (userTrainingId.value = response.data.data.id));

        await axios.put(
            `${import.meta.env.VITE_STRAPI_URL}/api/trainings/${Number(
                route.params.id
            )}?populate=*`,

            {
                data: {
                    user_trainings: {
                        connect: [userTrainingId.value],
                    },
                },
            },
            headerOptions
        );
        message.success("Vous êtes bien pré-inscrit au tutorat !");

        refetch.value();
        refetchUserTraining.value();
        loading.value = false;
    } catch (error) {
        console.error(error);
    }
}

async function unSubscribe() {
    unsubscribeLoading.value = true;
    try {
        await axios.put(
            `${import.meta.env.VITE_STRAPI_URL}/api/trainings/${Number(
                route.params.id
            )}?populate=*`,

            {
                data: {
                    user_trainings: {
                        disconnect: [userTraining.value.data.data[0].id],
                    },
                },
            },
            headerOptions
        );

        await axios.delete(
            `${import.meta.env.VITE_STRAPI_URL}/api/user-trainings/${
                userTraining.value.data.data[0].id
            }`,
            headerOptions
        );

        unsubscribeLoading.value = false;
        message.success("Vous êtes bien desinscrit");

        refetchUserTraining.value();
        refetch.value();
    } catch (error: any) {
        console.error(error);
    }
}

async function payTraining() {
    loading.value = true;
    try {
        const lydiaResponse = await lydiaStore.makeLydiaPayement(
            training.value.data.data.attributes.price
        );

        await axios.put(
            `${import.meta.env.VITE_STRAPI_URL}/api/user-trainings/${
                userTraining.value.data.data[0].id
            }`,
            {
                data: {
                    request_uuid: lydiaResponse.request_uuid,
                },
            },
            headerOptions
        );

        window.location.href = lydiaResponse.mobile_url;

        loading.value = false;
        message.success("Vous êtes bien inscrit monsieur");
        refetchUserTraining.value();
    } catch (error) {
        console.error(error);
    }
}
</script>
