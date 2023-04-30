<template>
    <ui-page>
        <ui-level class="flex-col">
            <AboutHeader @redirect="scroll(contactForm)" />
            <AboutOffer />
        </ui-level>

        <AboutTrainers v-if="trainers" :trainers="trainers.data.data" />

        <ui-level align="center">
            <ui-button @click="useUserRedirection('Dashboard')"
                >Lancer vous dans l'aventure</ui-button
            >
        </ui-level>

        <AboutQA />

        <div ref="contactForm">
            <AboutContact />
        </div>
    </ui-page>
</template>

<script lang="ts" setup>
import axios from "axios";
import { nextTick, ref } from "vue";
import { useQuery } from "vue-query";
import { headerOptions } from "../../composables/auth/useHeadersToken";
import { useUserRedirection } from "../../composables/auth/useUserRedirection";

const { data: trainers } = useQuery(
    ["trainings"],
    () =>
        axios.get(
            `${import.meta.env.VITE_STRAPI_URL}/api/trainers?populate=*`,
            headerOptions
        ),
    { refetchOnWindowFocus: false }
);

const contactForm = ref<HTMLDivElement>();

function scroll(wrapper: HTMLDivElement) {
    nextTick(() => {
        window.scrollTo({
            // nasty way of redirecting but don't understand why wrapper.clientHeight doesn't give correct value in this case
            top: wrapper.clientHeight + 1400,
            behavior: "smooth",
        });
    });
}
</script>
