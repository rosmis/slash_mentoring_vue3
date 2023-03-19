<template>
    <ui-page>
        <ui-level class="flex-col">
            <AboutHeader />
            <AboutOffer />
        </ui-level>

        <AboutTrainers v-if="trainers" :trainers="trainers.data.data" />

        <ui-level align="center">
            <ui-button @click="useUserRedirection('Dashboard')"
                >Lancer vous dans l'aventure</ui-button
            >
        </ui-level>

        <AboutQA />
    </ui-page>
</template>

<script lang="ts" setup>
import axios from "axios";
import { useQuery } from "vue-query";
import { headerOptions } from "../../composables/auth/useHeadersToken";
import { useUserRedirection } from "../../composables/auth/useUserRedirection";

const { data: trainers } = useQuery(["trainings"], () =>
    axios.get(
        `${import.meta.env.VITE_STRAPI_URL}/api/trainers?populate=*`,
        headerOptions
    )
);
</script>
