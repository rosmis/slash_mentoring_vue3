<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <Suspense>
        <Navbar />
      </Suspense>
      <!-- <p v-if="userSession">connected</p>
        <p v-else>disconnected</p> -->
      <Suspense>
        <router-view></router-view>
      </Suspense>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
  import { defineComponent } from 'vue'
  import { darkTheme } from 'naive-ui'

  const themeOverrides = {
    common: {
      primaryColor: '#1e3a8a'
    },
  }
</script>
