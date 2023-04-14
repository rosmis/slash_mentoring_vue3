<template>
    <ui-page screen>
        <ui-level space="none" class="h-full">
            <ui-level class="flex-col h-full shadow-lg w-1/2 z-1">
                <ui-wrapper padded class="w-[70%]">
                    <ui-title size="3xl" color="dark-blue"
                        >Votre compte</ui-title
                    >

                    <ui-level class="flex-col" vertical-align="top">
                        <template
                            v-for="(key, userInfo) in user.data"
                            :key="userInfo"
                        >
                            <AuthUserInfo
                                :user-info="key"
                                :user-info-title="userInfo"
                                :avatar-img="avatarImg"
                            />
                        </template>
                    </ui-level>
                </ui-wrapper>
            </ui-level>
            <ui-level
                class="flex-col h-full bg-[#F9F9FB] w-1/2"
                vertical-align="top"
            >
                <ui-wrapper>
                    <ui-title size="3xl" color="dark-blue"
                        >Votre compte</ui-title
                    >
                    <!-- <router-link
                        class="rounded-lg bg-blue-800 text-white py-2 px-4"
                        :to="{ name: 'Account-edit' }"
                    >
                        Modifier
                    </router-link> -->

                    <ui-level class="flex-col" vertical-align="top">
                        <template
                            v-for="(key, userInfo) in user.data"
                            :key="userInfo"
                        >
                            <AuthUserInfo
                                :user-info="key"
                                :user-info-title="userInfo"
                                :avatar-img="avatarImg"
                            />
                        </template>
                    </ui-level>
                </ui-wrapper>
            </ui-level>
        </ui-level>
    </ui-page>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { userStore } from "../../store/user";

const user = userStore();

onMounted(() => {
    user.handleUserSessionInfos();
});

const avatarImg = computed(() => user.avatar_img);
</script>
