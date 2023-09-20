<template>
    <mdicon name="menu" width="40" @click="isSidebarOpened = true" />

    <!-- <Transition name="app-sidebar"> -->
    <UiWrapper
        color="white"
        class="top-0 right-0 bottom-0 w-1/2 z-40 fixed hidden"
        ref="wrapper"
        :class="{
            '!block': isSidebarOpened,
        }"
    >
        <UiLevel class="h-10 w-full" align="right">
            <mdicon name="close" width="40" @click="isSidebarOpened = false" />
        </UiLevel>

        <UiLevel class="flex-col h-full pb-[30%]" align="center" space="xl">
            <router-link
                v-for="navLink in navLinks"
                :to="{ name: navLink.link, params: undefined }"
                @click="isSidebarOpened = false"
            >
                {{ navLink.name }}
            </router-link>

            <router-link
                v-if="!userSession"
                class="rounded-lg bg-blue-800 text-white py-2 px-4"
                :to="{ name: 'Auth' }"
                @click="isSidebarOpened = false"
            >
                Se connecter
            </router-link>

            <router-link
                v-else
                class="py-2 px-4"
                :to="{ name: 'Account' }"
                @click="isSidebarOpened = false"
            >
                <UiLevel>
                    <p>Mon Profil</p>

                    <n-avatar
                        v-if="!userData.avatar_url"
                        round
                        :style="{
                            color: 'white',
                            backgroundColor: '#1E40AF',
                        }"
                    >
                        {{
                            userData.full_name
                                ? userData.full_name.charAt(0).toUpperCase()
                                : "R"
                        }}
                    </n-avatar>
                    <n-avatar v-else :src="avatarUrl" round></n-avatar>
                </UiLevel>
            </router-link>
        </UiLevel>
    </UiWrapper>
    <!-- </Transition> -->
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { computed, ref } from "vue";
import { userSession } from "../../types/userSession";

defineProps<{
    userData: any;
    avatarUrl: string | null;
}>();

const isSidebarOpened = ref(false);
const wrapper = ref<HTMLDivElement>();

const navLinks = computed(() => {
    return [
        {
            name: "Tableau de bord",
            link: "Dashboard",
        },
        {
            name: "À propos",
            link: "About",
        },
    ];
});

onClickOutside(wrapper, () => {
    isSidebarOpened.value = false;
});
</script>

<style scoped>
.app-sidebar-enter-from,
.app-sidebar-leave-to {
    @apply opacity-0;
}

.app-sidebar-enter-active,
.app-sidebar-leave-active {
    @apply transition-opacity;
}
</style>
