<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <n-message-provider>
            <Suspense>
                <Navbar />
            </Suspense>

            <Suspense>
                <router-view></router-view>
            </Suspense>
            <Footer />
        </n-message-provider>
    </n-config-provider>
</template>

<script setup>
// import { defineComponent } from 'vue'
// import { darkTheme } from 'naive-ui'

const themeOverrides = {
    common: {
        primaryColor: "#1e3a8a",
    },
};
</script>
