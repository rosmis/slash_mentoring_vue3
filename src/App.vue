<template>
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
</template>

<script setup></script>
