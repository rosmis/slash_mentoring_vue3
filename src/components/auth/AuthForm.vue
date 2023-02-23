<template>
    <div class="px-42 py-12 shadow shadow-xl shadow-gray-200 flex flex-col items-center rounded-xl">
        <img
            src="../../assets/SLASH_MENTORING_LOGO.png"
            alt="slash mentoring logo"
            class="w-20"
        />

        <h2 class="text-lg mt-8">Se connecter</h2>

        <div class="w-full mt-8">
            <p class="text-sm text-gray-800">nom.prenom@mail.com</p>
            <UiInput v-model="email" class="w-88 mt-2"></UiInput>
        </div>

         <div class="w-full mt-6">
            <p class="text-sm text-gray-800">mot de passe</p>
            <UiInput v-model="password" class="w-88 mt-2" type="password"></UiInput>
        </div>

        <button @click="user.handleSignIn({ email, password })" class="w-48 bg-blue-900 py-3 rounded-md mt-10 text-white text-sm">
            Se connecter
        </button>
        <router-link :to="{ name: 'SignUp' }">
            <button class="w-48 bg-teal-400 py-3 rounded-md mt-6 text-white text-sm">
                Créer un compte
            </button>
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { userStore } from "../../store/user";

const user = userStore();

const email = ref<string>("");
const password = ref<string>("");

</script>