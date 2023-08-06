<template>
    <ui-page>
        <UiLevel class="h-screen-md" space="none">
            <UiLevel
                v-if="training"
                class="flex-col h-full px-8 w-3/5 relative"
                align="center"
                space="lg"
            >
                <UiTitle size="4xl" color="dark-blue">{{
                    training.data.data.attributes.title
                }}</UiTitle>

                <UiLevel space="lg">
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
                    v-if="stripePriceId"
                    ref="stripeRef"
                    mode="payment"
                    :pk="stripePublishableKey"
                    :line-items="stripeData.item"
                    success-url="https://www.google.com/"
                    cancel-url="https://fr.yahoo.com/"
                />
            </UiLevel>
            <UiLoader v-else />

            <UiLevel class="h-full w-2/5">
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
import { computed, ref } from "vue";
import { useQuery } from "vue-query";
import { useRoute } from "vue-router";
import { headerOptions } from "../../../composables/auth/useHeadersToken";
import { useUserTraining } from "../../../composables/trainings/useUserTraining";
import { userSession } from "../../../types/userSession";

const route = useRoute();
const message = useMessage();

const stripeRef = ref();
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePriceId = computed(
    () => training.value?.data.data.attributes?.priceId
);

const stripeData = computed(() => {
    return {
        item: [
            {
                price: stripePriceId.value,
                quantity: 1,
            },
        ],
    };
});

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

const { userTraining, refetchUserTraining } = useUserTraining(+route.params.id);

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
</script>
