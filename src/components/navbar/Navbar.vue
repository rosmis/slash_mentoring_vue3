<template>
    <ui-wrapper class="z-30 navbar">
        <ui-level>
            <router-link :to="{ name: 'Home' }">
                <img
                    src="../../assets/SLASH_MENTORING_LOGO.png"
                    alt="slash mentoring logo"
                    class="w-20"
                />
            </router-link>

            <template v-if="!isMobile">
                <ui-level>
                    <router-link
                        v-for="navLink in navLinks"
                        :to="{ name: navLink.link, params: undefined }"
                    >
                        {{ navLink.name }}
                    </router-link>
                </ui-level>
                <router-link
                    v-if="!userSession"
                    class="rounded-lg bg-blue-800 text-white py-2 px-4"
                    :to="{ name: 'Auth' }"
                >
                    Se connecter
                </router-link>

                <NavbarDropdown
                    v-else
                    :user-info-session="user.data"
                    :avatar-url="avatarUrl"
                />
            </template>

            <SidebarMobile
                v-else
                :user-data="user.data"
                :avatar-url="avatarUrl"
            />
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
import { useMessage } from "naive-ui";
import { computed, onMounted } from "vue";
import { useMobileBreakpoint } from "../../composables/mobile/useMobileBreakpoints";
import { userStore } from "../../store/user";
import { userSession } from "../../types/userSession";

const user = userStore();
window.$message = useMessage();

onMounted(() => user.handleUserSessionInfos());

const isMobile = useMobileBreakpoint("md");

const avatarUrl = computed(() => user.avatar_img);

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
</script>

<style scoped>
.navbar {
    box-shadow: 19px -9px 5px 12px rgb(0 0 0 / 15%);
}
</style>
