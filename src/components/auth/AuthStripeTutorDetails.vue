<template>
    <UiButton @click="createExpressStripeAccount()"
        >Initialiser vos informations de tuteur agrée</UiButton
    >
</template>

<script lang="ts" setup>
import axios from "axios";
import { UserData } from "../../store/user";

const props = defineProps<{
    userInfos: UserData;
}>();

async function createExpressStripeAccount() {
    await axios
        .post(`${import.meta.env.VITE_STRAPI_URL}/api/webhook/express`, {
            userId: props.userInfos.id,
        })
        .then((response) => {
            if (
                response.data.status === "success" &&
                response.data.redirectionUrl
            ) {
                // Redirect the user to the specified URL
                window.location.href = response.data.redirectionUrl;
            }
        });
}
</script>
