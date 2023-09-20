<template>
    <ui-page>
        <UiLevel
            class="h-screen-md"
            space="none"
            :class="{ 'flex-col-reverse': isMobile }"
        >
            <UiLevel
                v-if="training"
                class="flex-col h-full w-full px-8 relative"
                :align="isMobile ? 'left' : 'center'"
                space="lg"
                :class="{ '!w-3/5': !isMobile, 'pt-8': isMobile }"
            >
                <UiLevel
                    v-if="isMobile"
                    space="sm"
                    class="cursor-pointer top-4 left-4 absolute"
                    @click="router.back()"
                >
                    <mdicon
                        name="arrow-left"
                        width="15"
                        class="text-[#313A56]"
                    />
                    <p class="text-[#313A56]">Retour</p>
                </UiLevel>

                <UiTitle size="4xl" color="dark-blue">{{
                    training.data.data.attributes.title
                }}</UiTitle>

                <UiLevel space="lg" wrapped align="center">
                    <TrainingInfoCard
                        v-for="(card, index) in trainingCardContent"
                        :key="`card-${index}`"
                        :card-content="card"
                    />
                </UiLevel>
                <template v-if="userTraining">
                    <UiButton
                        v-if="!userTraining.data.data.length"
                        @click="createUserTraining()"
                        :loading="loading"
                    >
                        Je suis intéréssé
                    </UiButton>
                    <UiLevel
                        v-else-if="
                            userTraining.data.data.length &&
                            !userTraining.data.data[0].attributes.didUserPay
                        "
                    >
                        <UiButton
                            outlined
                            :loading="unsubscribeLoading"
                            @click="unSubscribe()"
                        >
                            Se desinscrire
                        </UiButton>
                        <UiButton @click="submitPayment()" :loading="loading">
                            Payer
                        </UiButton>
                    </UiLevel>
                    <p v-else>Vous êtes bien inscrit monsieur</p>
                </template>

                <UiSlash size="lg" position="right" />

                <StripeCheckout
                    v-if="userTrainingSessionId"
                    ref="stripeRef"
                    :pk="stripePublishableKey"
                    :session-id="userTrainingSessionId"
                />
            </UiLevel>
            <UiLoader v-else />

            <UiLevel
                class="h-1/2 w-full"
                :class="{ '!w-2/5 !h-full': !isMobile }"
            >
                <div
                    v-if="training"
                    class="bg-no-repeat bg-cover h-full w-full"
                    :style="{
                        backgroundImage: `url(${training.data.data.attributes.backgroundImage.data.attributes.url})`,
                    }"
                ></div>
                <n-skeleton v-else class="h-130 w-full" />
            </UiLevel>
        </UiLevel>
    </ui-page>
</template>

<script lang="ts" setup>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import axios from "axios";
import moment from "moment";
import { useMessage } from "naive-ui";
import { computed, onMounted, ref } from "vue";
import { useQuery } from "vue-query";
import { useRoute, useRouter } from "vue-router";
import { headerOptions } from "../../../composables/auth/useHeadersToken";
import { useMobileBreakpoint } from "../../../composables/mobile/useMobileBreakpoints";
import { useUserTraining } from "../../../composables/trainings/useUserTraining";
import { userStore } from "../../../store/user";
import { userSession } from "../../../types/userSession";

const route = useRoute();
const router = useRouter();
const user = userStore();
const message = useMessage();

const { userTraining, refetchUserTraining } = useUserTraining(+route.params.id);

const isMobile = useMobileBreakpoint("md");

const userTrainingSessionId = computed(() => {
    if (!userTraining.value || !userTraining.value?.data.data.length)
        return undefined;

    return userTraining.value?.data.data[0].attributes?.sessionId;
});

onMounted(() => {
    user.handleUserSessionInfos();
});

const stripeRef = ref();
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

let loading = ref(false);
let unsubscribeLoading = ref(false);

const { data: training, refetch } = useQuery(
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

function submitPayment() {
    return stripeRef.value.redirectToCheckout();
}

const trainingCardContent = computed(() => [
    {
        title: "date",
        content: moment(training.value?.data.data.attributes.date).format(
            "DD/MM"
        ),
        color: "pink",
        icon: "calendar",
    },
    {
        title: "heure",
        content: moment(training.value?.data.data.attributes.date).format(
            "HH[h]mm"
        ),
        color: "light-blue",
        icon: "clock",
    },
    {
        title: "durée",
        content: training.value?.data.data.attributes.duration,
        color: "green",
        icon: "timing",
    },
    {
        title: "places",
        content: `${training.value?.data.data.attributes.maxUserTrainings} MAX`,
        color: "dark-blue",
        icon: "seats",
    },
]);

async function createUserTraining() {
    if (!training) return;

    loading.value = true;
    let sessionId;
    const userTrainingId = ref();

    await axios
        .post(
            `${import.meta.env.VITE_STRAPI_URL}/api/session`,
            {
                trainingId: training.value.data.data.id,
                priceId: training.value.data.data.attributes.priceId,
            },
            headerOptions
        )
        .then((response) => (sessionId = response.data.session.id));

    const userTraining = ref({
        user: userSession.value.user.email,
        trainingId: Number(route.params.id),
        didUserPay: false,
        sessionId,
    });

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
</script>
