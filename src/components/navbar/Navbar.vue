<template>
  <ui-wrapper class="navbar">
    <ui-level>
      <router-link :to="{ name: 'Home' }">
        <img
          src="../../assets/SLASH_MENTORING_LOGO.png"
          alt="slash mentoring logo"
          class="w-20"
        />
      </router-link>
      <ui-level>
        <router-link v-for="navLink in navLinks" :to="{ name: navLink.link }">
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

      <NavbarDropdown
        v-else
        :user-info-session="user.data"
        :avatar-url="avatarUrl"
      />
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

const avatarUrl = computed(() => user.avatar_img);

const navLinks = computed(() => {
  return [
    {
      name: "Tableau de bord",
      link: "Dashboard",
    },
    // {
    //   name: "Cours",
    //   link: "./learning",
    // },
    // {
    //   name: "À propos",
    //   link: "./",
    // },
  ];
});
</script>

<style scoped>
.navbar {
  box-shadow: 19px -9px 5px 12px rgb(0 0 0 / 15%);
}
</style>
