<template>
  <ui-level class="flex-col">
    <p>Creer un compte</p>
    <div>
      <input type="email" placeholder="Your email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
    </div>

    <button @click="user.handleSignUp({ email, password })">
      Creez le compte
    </button>
  </ui-level>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { userStore } from "../../../store/user";

const user = userStore();

const email = ref<string>("");
const password = ref<string>("");
</script>
