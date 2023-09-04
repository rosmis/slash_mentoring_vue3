<template>
    <UiLevel class="flex-col" space="lg">
        <ui-message
            v-if="!isUserStripeVerified"
            title="Des informations manquent à votre dossier de tuteur, veuillez le finaliser avant de pouvoir recevoir des fonds"
            color="blue"
            size="sm"
            icon="information"
        />

        <UiButton
            v-if="!isUserStripeVerified"
            :loading="loading"
            @click="createExpressStripeAccount()"
            >{{
                !!props.userInfos.stripe_account_id
                    ? "Finaliser"
                    : "Initialiser"
            }}
            vos informations de tuteur agréé</UiButton
        >

        <p v-else class="text-slate-500">
            Vos informations de paiements ont bien été enregistrés par la
            plateforme Stripe, vous pouvez dès à présent recevoir des fonds une
            fois votre tutorat terminé
        </p>
    </UiLevel>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";
import { UserData } from "../../store/user";

const props = defineProps<{
    userInfos: UserData;
    isUserStripeVerified: boolean;
}>();

const loading = ref(false);

async function createExpressStripeAccount() {
    loading.value = true;
    try {
        await axios
            .post(`${import.meta.env.VITE_STRAPI_URL}/api/webhook/express`, {
                userId: props.userInfos.id,
            })
            .then((response) => {
                if (
                    response.data.status === "success" &&
                    response.data.redirectionUrl
                ) {
                    loading.value = true;

                    // Redirect the user to the specified URL
                    window.location.href = response.data.redirectionUrl;
                }
            });
    } catch (error) {
        console.error(error);
        window.$message.error(error);
        loading.value = false;
    }
}
</script>
