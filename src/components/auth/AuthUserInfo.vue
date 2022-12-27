<template>
  <ui-level space="lg" class="border-b border-b-blue-900">
    <p>{{ userInfoTitle }} :</p>
    <p v-if="userInfo !== 'avatar_url'">{{ userInfo }}</p>
    <p v-else class="text-gray-500">Non spécifié</p>
  </ui-level>
</template>

<script lang="ts" setup>
defineProps<{
  userInfo: string | null;
  userInfoTitle: string | null;
}>();
</script>
