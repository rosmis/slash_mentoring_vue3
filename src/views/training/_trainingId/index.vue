<template>
    <ui-page>
        <ui-level class="h-full" space="none">
            <ui-wrapper padded class="w-3/5">
                <ui-level
                    v-if="training"
                    class="flex-col h-full"
                    align="left"
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
                            Payer
                        </ui-button>
                    </ui-level>
                </ui-level>
                <UiLoader v-else />
            </ui-wrapper>

            <ui-level class="h-130 w-2/5">
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
        <pre>
            {{ training }}
        </pre>
        <pre>
            {{ userTraining }}
        </pre>
    </ui-page>

    <!-- <n-button @click="router.push({ name: 'Dashboard' })"> Retour </n-button>

  <template v-if="userTraining">
    <n-button
      v-if="!userTraining.data.data.length"
      @click="createUserTraining()"
      :loading="loading"
    >
      Je suis intéréssé
    </n-button>
    <n-button
      v-else-if="
        userTraining.data.data.length &&
        !userTraining.data.data[0].attributes.didUserPay
      "
      @click="payTraining()"
      :loading="loading"
    >
      Payer
    </n-button>
    <p v-else>Vous etes bien inscrit au cours monsieur</p>
  </template> -->
</template>

<script lang="ts" setup>
import axios from "axios";
import moment from "moment";
import { NSkeleton, useMessage } from "naive-ui";
import { computed, ref } from "vue";
import { useQuery } from "vue-query";
import { useRoute, useRouter } from "vue-router";
import { headerOptions } from "../../../composables/auth/useHeadersToken";
import { userSession } from "../../../types/userSession";

const route = useRoute();
const router = useRouter();
const message = useMessage();
let loading = ref(false);
let unsubscribeLoading = ref(false);

// const trainingAttribute = computed(() => training.value.data.data.attributes);

let { data: training, refetch } = useQuery(["training"], () =>
    axios.get(
        `${import.meta.env.VITE_STRAPI_URL}/api/trainings/${Number(
            route.params.id
        )}?populate=*`,
        headerOptions
    )
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

let { data: userTraining, refetch: refetchUserTraining } = useQuery(
    ["userTraining"],
    () =>
        axios.get(
            `${
                import.meta.env.VITE_STRAPI_URL
            }/api/user-trainings?filters[user][$eq]=${
                userSession.value.user.email
            }&filters[trainingId][$eq]=${Number(route.params.id)}`,
            headerOptions
        )
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
        message.success("Vous êtes bien inscrit monsieur");
        refetchUserTraining.value();
        refetch.value();
    } catch (error: any) {
        console.error(error);
    }
}

async function payTraining() {
    loading.value = true;
    try {
        await axios.put(
            `${import.meta.env.VITE_STRAPI_URL}/user-trainings/${
                userTraining.value.data.data[0].id
            }`,
            {
                data: {
                    didUserPay: true,
                },
            },
            headerOptions
        );
        loading.value = false;
        message.success("Vous êtes bien inscrit monsieur");
        refetchUserTraining.value();
    } catch (error) {
        console.error(error);
    }
}
</script>
