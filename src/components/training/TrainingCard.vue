<template>
  <router-link :to="{ name: 'Training', params: { id: training.id } }">
    <ui-wrapper
      v-if="training"
      rounded
      color="white"
      class="cursor-pointer transition-shadow ring-1 ring-slate-900/5 hover:shadow-lg"
    >
      <ui-level class="flex-col" vertical-align="top">
        <ui-level space="sm" align="start">
          <ui-level
            class="rounded-full bg-[#29387D] h-15 p-4 w-15"
            align="center"
          >
            <img src="../../assets/camera_icon.png" />
          </ui-level>

          <p class="text-xl">{{ training.attributes.title }}</p>
        </ui-level>

        <p class="max-w-full truncate">{{ training.attributes.description }}</p>

        <ui-level class="flex-col" vertical-align="top" space="xs">
          <p>{{ training.attributes.trainer.data.attributes.firstName }}</p>
          <p>{{ training.attributes.trainer.data.attributes.lastName }}</p>
          <!-- <img
          :src="training.trainer.data.attributes.profilePicture"
          class="rounded-full h-10 w-10"
        /> -->
        </ui-level>
      </ui-level>
    </ui-wrapper>
  </router-link>
</template>

<script lang="ts" setup>
import { Training } from "../../types/training";

defineProps<{
  training?: Training;
}>();
</script>
