<template>
  <n-dropdown
    :options="userDropdownOptions"
    trigger="hover"
    @select="userDropdownAction($event)"
  >
    <ui-level space="sm">
      <ui-level space="xs">
        <p v-if="userInfoSession && userInfoSession.full_name">
          {{ userInfoSession.full_name }}
        </p>
        <p v-else>Mon profil</p>
        <n-icon size="16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
          >
            <path
              d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
              fill="currentColor"
            ></path>
          </svg>
        </n-icon>
      </ui-level>
      <n-avatar
        v-if="!userInfoSession.avatar_url"
        round
        :style="{
          color: 'white',
          backgroundColor: '#1E40AF',
        }"
      >
        {{
          userInfoSession.full_name
            ? userInfoSession.full_name.charAt(0).toUpperCase()
            : "R"
        }}
      </n-avatar>
      <n-avatar v-else :src="avatarPath" round></n-avatar>
    </ui-level>
  </n-dropdown>
</template>

<script lang="ts" setup>
import {
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon,
} from "@vicons/ionicons5";
import { NAvatar, NDropdown, NIcon } from "naive-ui";
import { Component, computed, h } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "../../store/user";

const props = defineProps<{
  userInfoSession?: {
    username: string;
    website: string;
    avatar_url: string;
    full_name: string;
  };
  avatarPath?: string | undefined;
}>();

const router = useRouter();
const user = userStore();

function userDropdownAction(event: "profile" | "logout") {
  if (event === "profile") {
    router.push({ name: "Account" });
    return;
  }

  user.handleLogout();
  router.push({ name: "Home" });
}

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

const userDropdownOptions = computed(() => {
  return [
    {
      label: "Mon Profil",
      key: "profile",
      icon: renderIcon(UserIcon),
    },
    {
      label: "Se deconnecter",
      key: "logout",
      icon: renderIcon(LogoutIcon),
    },
  ];
});
</script>
