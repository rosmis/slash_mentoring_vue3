<template>
    <ui-wrapper color="blue" padded>
        <ui-level class="mx-20">
            <ui-level class="flex-col" vertical-align="top" space="sm">
                <router-link :to="{ name: 'Home' }">
                    <img
                        src="../../assets/slash_logo_white.png"
                        alt="logo-slash-white"
                        class="max-w-3/4"
                    />
                </router-link>
                <p class="text-white text-xs">
                    ©2020 - 2023 Slash Mentoring, <br />
                    Tous droits réservés
                </p>
            </ui-level>

            <ui-level align="left" space="2xl">
                <ui-level class="flex-col" vertical-align="top" space="sm">
                    <h1 class="font-bold text-white text-xl mb-4 uppercase">
                        À propos
                    </h1>

                    <router-link
                        :to="{ name: 'About' }"
                        class="text-white hover:underline"
                        >Notre histoire</router-link
                    >
                    <router-link
                        :to="{ name: 'About' }"
                        class="text-white hover:underline"
                        >Nous rejoindre</router-link
                    >
                    <router-link
                        :to="{ name: 'About' }"
                        class="text-white hover:underline"
                        >Nous contacter</router-link
                    >
                </ui-level>

                <ui-level class="flex-col" vertical-align="top" space="sm">
                    <h1 class="font-bold text-white text-xl mb-4 uppercase">
                        Boarding
                    </h1>

                    <router-link
                        :to="{ name: 'About' }"
                        class="text-white hover:underline"
                        >Notre histoire</router-link
                    >
                    <router-link
                        :to="{ name: 'About' }"
                        class="text-white hover:underline"
                        >Nous rejoindre</router-link
                    >
                    <router-link
                        :to="{ name: 'About' }"
                        class="text-white hover:underline"
                        >Nous contacter</router-link
                    >
                </ui-level>

                <ui-level class="flex-col" vertical-align="top" space="sm">
                    <h1 class="font-bold text-white text-xl mb-4 uppercase">
                        Help
                    </h1>

                    <router-link
                        :to="{ name: 'About' }"
                        class="text-white hover:underline"
                        >Notre histoire</router-link
                    >
                    <router-link
                        :to="{ name: 'About' }"
                        class="text-white hover:underline"
                        >Nous rejoindre</router-link
                    >
                    <router-link
                        :to="{ name: 'About' }"
                        class="text-white hover:underline"
                        >Nous contacter</router-link
                    >
                </ui-level>
            </ui-level>
        </ui-level>
    </ui-wrapper>
</template>
