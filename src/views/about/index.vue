<template>
    <ui-page>
        <ui-level class="flex-col">
            <AboutHeader
                :is-mobile="isMobile"
                @redirect="scroll(contactForm)"
            />
            <AboutOffer :is-mobile="isMobile" />
        </ui-level>

        <AboutTrainers
            v-if="trainers && trainers.data.data.length"
            :trainers="trainers.data.data"
            :is-mobile="isMobile"
        />

        <ui-level align="center">
            <ui-button @click="useUserRedirection('Dashboard')"
                >Lancer vous dans l'aventure</ui-button
            >
        </ui-level>

        <!-- <AboutQA /> -->

        <div ref="contactForm" id="contact">
            <AboutContact :is-mobile="isMobile" />
        </div>
    </ui-page>
</template>

<script lang="ts" setup>
import axios from "axios";
import { nextTick, ref } from "vue";
import { useQuery } from "vue-query";
import { headerOptions } from "../../composables/auth/useHeadersToken";
import { useUserRedirection } from "../../composables/auth/useUserRedirection";
import { useMobileBreakpoint } from "../../composables/mobile/useMobileBreakpoints";

const isMobile = useMobileBreakpoint("md");

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
