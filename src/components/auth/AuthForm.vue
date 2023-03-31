<template>
    <ui-wrapper rounded shadow class="min-w-screen-md">
        <ui-level class="flex-col" align="center">
            <img
                src="../../assets/SLASH_MENTORING_LOGO.png"
                alt="slash mentoring logo"
                class="w-20"
            />

            <h2 class="mt-8 text-lg">Se connecter</h2>

            <ui-level class="flex-col" space="sm">
                <div class="mt-8 w-full">
                    <p class="text-sm text-gray-800">Adresse email</p>
                    <UiInput v-model="email" class="mt-2 w-88"></UiInput>
                </div>

                <div class="mt-6 w-full">
                    <p class="text-sm text-gray-800">Mot de passe</p>
                    <UiInput
                        v-model="password"
                        class="mt-2 w-88"
                        type="password"
                    ></UiInput>
                </div>
            </ui-level>

            <ui-level class="flex-col mt-8">
                <UiButton
                    accent="secondary"
                    class="w-full"
                    @click="user.handleSignIn({ email, password })"
                    >Se connecter</UiButton
                >

                <router-link :to="{ name: 'SignUp' }">
                    <UiButton>Créer un compte</UiButton>
                </router-link>
            </ui-level>
        </ui-level>
    </ui-wrapper>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { userStore } from "../../store/user";

const user = userStore();

const email = ref<string>("");
const password = ref<string>("");
</script>
