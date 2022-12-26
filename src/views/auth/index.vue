<template>
  <ui-level class="flex-col">
    <h1>Se connecter</h1>
    <div>
      <input type="email" placeholder="Your email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
    </div>

    <button
      @click="
        user.handleSignIn({ email, password });
        $router.push({ name: 'Dashboard' });
      "
    >
      Se connecter
    </button>
    <button @click="user.handleOAuthLogin('google')">
      Se connecter avec Google
    </button>

    <p class="text-gray-500">
      Vous n'avez pas de compte ?
      <router-link :to="{ name: 'SignUp' }">
        Creez vous un commpte en cliquant ici
      </router-link>
    </p>
  </ui-level>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { userStore } from "../../store/user";

const user = userStore();

const email = ref<string>("");
const password = ref<string>("");
</script>
