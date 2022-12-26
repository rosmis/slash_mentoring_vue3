<template>
  <n-message-provider>
    <ui-page :screen="true">
      <Suspense>
        <Navbar />
      </Suspense>
      <p v-if="userSession">connected</p>
      <p v-else>disconnected</p>
      <Suspense>
        <router-view></router-view>
      </Suspense>
    </ui-page>
  </n-message-provider>
</template>

<script setup>
import { userSession } from "./types/userSession";
</script>
