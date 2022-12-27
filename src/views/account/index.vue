<template>
  <ui-wrapper container>
    <ui-level class="flex-col" vertical-align="top">
      <ui-level class="w-full">
        <h1>Votre compte</h1>
        <router-link
          class="rounded-lg bg-blue-800 text-white py-2 px-4"
          :to="{ name: 'Account-edit' }"
        >
          Modifier
        </router-link>
      </ui-level>

      <div class="w-full grid gap-8 grid-cols-2">
        <template v-for="(key, userInfo) in user.data" :key="userInfo">
          <AuthUserInfo
            :user-info="key"
            :user-info-title="userInfoTitles[userInfo]"
          />
        </template>
      </div>
      <h1>Vos anciennes formations</h1>
    </ui-level>
  </ui-wrapper>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useUserInfos } from "../../composables/auth/useUserInfo";
import { userStore } from "../../store/user";

const userInfoTitles = useUserInfos();
const user = userStore();

onMounted(() => {
  user.handleUserSessionInfos();
});
</script>
