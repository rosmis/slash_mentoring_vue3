<template>
  <ui-level space="lg" class="border-b border-b-blue-900">
    <p>{{ userInfoTitles[userInfoTitle] }} :</p>
    <n-avatar
      v-if="avatarImg && userInfoTitle === 'avatar_url'"
      :src="avatarImg"
      size="large"
      round
    ></n-avatar>
    <p v-else-if="userInfo">{{ userInfo }}</p>
    <p v-else class="text-gray-500">Non spécifié</p>
  </ui-level>
</template>

<script lang="ts" setup>
import { NAvatar } from "naive-ui";
import { useUserInfos } from "../../composables/auth/useUserInfo";

const userInfoTitles = useUserInfos();

defineProps<{
  userInfo: string | null;
  userInfoTitle: string | null;
  avatarImg: string | null;
}>();
</script>
