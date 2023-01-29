<template>
  <n-button @click="router.push({ name: 'Dashboard' })"> Retour </n-button>
  <pre>
    {{ userTraining }}
  </pre>
  <pre>
  {{ training }}
</pre
  >
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
  </template>
</template>

<script lang="ts" setup>
import axios from "axios";
import { NButton, useMessage } from "naive-ui";
import { ref } from "vue";
import { useQuery } from "vue-query";
import { useRoute, useRouter } from "vue-router";
import { headerOptions } from "../../../composables/auth/useHeadersToken";
import { userSession } from "../../../types/userSession";

const route = useRoute();
const router = useRouter();
const message = useMessage();
let loading = ref(false);

// const trainingAttribute = computed(() => training.value.data.data.attributes);

let { data: training, refetch } = useQuery(["training"], () =>
  axios.get(
    `http://localhost:1337/api/trainings/${Number(route.params.id)}?populate=*`,
    headerOptions
  )
);

let { data: userTraining, refetch: refetchUserTraining } = useQuery(
  ["userTraining"],
  () =>
    axios.get(
      `http://localhost:1337/api/user-trainings?filters[userId][$eq]=${
        userSession.value.user.id
      }&filters[trainingId][$eq]=${Number(route.params.id)}`,
      headerOptions
    )
);

async function createUserTraining() {
  if (!training) return;

  const userTraining = ref({
    userId: userSession.value.user.id,
    trainingId: Number(route.params.id),
    didUserPay: false,
  });
  const userTrainingId = ref();

  loading.value = true;
  try {
    await axios
      .post(
        "http://localhost:1337/api/user-trainings",
        {
          data: userTraining.value,
        },
        headerOptions
      )
      .then((response) => (userTrainingId.value = response.data.data.id));

    await axios.put(
      `http://localhost:1337/api/trainings/${Number(
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
    message.success("UserTrainingCreated");
    refetch.value();
    loading.value = false;
  } catch (error) {
    console.error(error);
  }
}

async function payTraining() {
  loading.value = true;
  try {
    await axios.put(
      `http://localhost:1337/api/user-trainings/${userTraining.value.data.data[0].id}`,
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
