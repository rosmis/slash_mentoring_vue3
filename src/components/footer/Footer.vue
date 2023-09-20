<template>
    <ui-wrapper color="blue" padded>
        <ui-level
            align="around"
            :class="{
                'flex-col': isMobile,
            }"
            :space="isMobile ? 'xl' : undefined"
            :vertical-align="isMobile ? 'top' : undefined"
        >
            <ui-level
                class="flex-col"
                vertical-align="top"
                space="sm"
                :class="{ 'w-full': isMobile }"
            >
                <router-link :to="{ name: 'Home' }">
                    <img
                        src="../../assets/slash_logo_white.png"
                        alt="logo-slash-white"
                        class="max-w-3/4"
                    />
                </router-link>
                <p class="text-white text-xs">
                    ©2022 - 2023 Slash Mentoring, <br />
                    Tous droits réservés
                </p>
            </ui-level>

            <ui-level
                :align="isMobile ? undefined : 'left'"
                vertical-align="top"
                :space="isMobile ? undefined : '2xl'"
                :class="{ 'w-full': isMobile }"
            >
                <ui-level class="flex-col" vertical-align="top" space="sm">
                    <h2 class="font-bold text-white text-xl mb-4 uppercase">
                        Boarding
                    </h2>

                    <router-link
                        :to="{ name: 'About' }"
                        class="text-white hover:underline"
                        >Notre histoire</router-link
                    >
                    <router-link
                        :to="{ name: 'Dashboard' }"
                        class="text-white hover:underline"
                        >Nous rejoindre</router-link
                    >
                    <router-link
                        :to="{ name: 'About', hash: '#contact' }"
                        class="text-white hover:underline"
                        >Nous contacter</router-link
                    >
                </ui-level>

                <ui-level class="flex-col" vertical-align="top" space="sm">
                    <h2 class="font-bold text-white text-xl mb-4 uppercase">
                        Help
                    </h2>

                    <router-link
                        :to="{ name: 'About' }"
                        class="text-white hover:underline"
                        >Politique de confidentialité</router-link
                    >
                    <router-link
                        :to="{ name: 'About' }"
                        class="text-white hover:underline"
                        >Mentions légales</router-link
                    >
                </ui-level>
            </ui-level>
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
import { useMobileBreakpoint } from "../../composables/mobile/useMobileBreakpoints";

const isMobile = useMobileBreakpoint("md");
</script>
