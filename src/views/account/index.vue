<template>
    <ui-page screen>
        <ui-level space="none" class="h-full">
            <ui-level class="flex-col h-full shadow-lg w-1/2 z-1">
                <ui-wrapper padded class="w-[70%]">
                    <ui-title size="3xl" color="dark-blue" class="mb-4"
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
                                :is-field-editing="
                                    selectedUserInfo &&
                                    selectedUserInfo.userInfoTitle === userInfo
                                        ? true
                                        : false
                                "
                                @user-info="selectedUserInfo = $event"
                            />
                        </template>
                    </ui-level>
                </ui-wrapper>
            </ui-level>
            <ui-level class="flex-col h-full bg-[#F9F9FB] w-1/2">
                <ui-wrapper class="w-full" padded>
                    <AuthUserInfoEdit
                        v-if="selectedUserInfo"
                        :selected-user-info="selectedUserInfo"
                        @fetch="
                            user.handleUserSessionInfos();
                            selectedUserInfo = null;
                        "
                    />

                    <ui-message
                        v-else
                        title="Selectionnez un élément de votre profil pour le modifier"
                        color="blue"
                        icon="information"
                    />
                </ui-wrapper>
            </ui-level>
        </ui-level>
    </ui-page>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { userStore } from "../../store/user";

const user = userStore();

const selectedUserInfo = ref<{ userInfo: string; userInfoTitle: string }>(null);

onMounted(() => {
    user.handleUserSessionInfos();
});

const avatarImg = computed(() => user.avatar_img);
</script>
