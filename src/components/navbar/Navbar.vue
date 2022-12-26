<template>
  <ui-wrapper>
    <ui-level>
      <ui-level>
        <router-link v-for="navLink in navLinks" :to="navLink.link">
          {{ navLink.name }}
        </router-link>
      </ui-level>
      <router-link
        v-if="!userSession"
        class="rounded-lg bg-blue-800 text-white py-2 px-4"
        :to="{ name: 'Auth' }"
      >
        Se connecter
      </router-link>

      <!-- <template v-else-if="userInfoSession && userInfoSession.data"> -->

      <NavbarDropdown v-else :user-info-session="user.data" />

      <!-- </template> -->
    </ui-level>
  </ui-wrapper>
</template>

<script lang="ts" setup>
import { useMessage } from "naive-ui";
import { computed, onMounted } from "vue";
import { userStore } from "../../store/user";
import { userSession } from "../../types/userSession";

const user = userStore();
window.$message = useMessage();

onMounted(() => user.handleUserSessionInfos());

const navLinks = computed(() => {
  return [
    {
      name: "Tableau de bord",
      link: "./dashboard",
    },
    {
      name: "Cours",
      link: "./learning",
    },
    {
      name: "À propos",
      link: "./",
    },
  ];
});
</script>
