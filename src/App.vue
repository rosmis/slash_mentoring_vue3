<template>
    <n-message-provider>
        <Suspense>
            <Navbar />
        </Suspense>

        <Suspense>
            <router-view></router-view>
        </Suspense>
        <Footer />
    </n-message-provider>
</template>

<script setup></script>
