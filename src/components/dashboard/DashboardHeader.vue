<template>
  <ui-wrapper class="rounded-3xl w-full pb-16" color="light-blue">
    <div v-if="userInfos">
      <h1 class="font-semibold text-4xl">Bonjour, {{ userInfos.full_name }}</h1>
      <h2 class="text-2xl">
        Aujourd'hui, le {{ moment().locale("fr").format("LL") }}, vous n'avez
        aucun cours de prévu.
      </h2>
    </div>
    <div v-else>
      <h1 class="font-semibold text-4xl">Bienvenue sur Slash Mentoring</h1>
      <h2 class="text-2xl">
        Apprenez avec des cours pour les étudiants, par les étudiants
      </h2>
    </div>
  </ui-wrapper>
</template>

<script lang="ts" setup>
import moment from "moment";
import "moment/dist/locale/fr";

defineProps<{
  userInfos?: {
    username: string;
    website: string;
    avatar_url: string;
    full_name: string;
  };
}>();
</script>
