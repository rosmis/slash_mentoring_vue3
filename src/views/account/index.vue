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
                                @user-info="
                                    selectedUserInfo = $event;
                                    showPreviousTrainings = false;
                                "
                            />
                        </template>
                        <AuthUserInfo
                            :user-info="userSession.user.email"
                            user-info-title="email"
                            disabled
                        />
                    </ui-level>

                    <ui-level align="center" class="mx-auto mt-8 w-8/10">
                        <ui-button
                            outlined
                            class="w-full"
                            @click="showPreviousTrainings = true"
                        >
                            Mes derniers tutorats
                        </ui-button>
                    </ui-level>
                </ui-wrapper>
                <p class="text-center text-xs mb-4 text-gray-500">
                    Pour toutes demandes de modification de mot de passe
                    veuillez vous rapprocher de l'assistance
                </p>
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

                    <ui-level
                        v-if="showPreviousTrainings && subscribedTrainings"
                        class="flex-col mx-auto w-8/10"
                        vertical-align="top"
                    >
                        <ui-title color="dark-blue" size="2xl" class="mb-4">
                            Mes derniers tutorats
                        </ui-title>

                        <TrainingPlanning
                            :subscribed-trainings="
                                subscribedTrainings.data.data
                            "
                            show-previous-trainings
                        />
                    </ui-level>

                    <ui-message
                        v-else
                        title="Selectionnez un élément de votre profil pour le modifier ou le consulter"
                        color="blue"
                        icon="information"
                    />
                </ui-wrapper>
            </ui-level>
        </ui-level>
    </ui-page>
</template>

<script lang="ts" setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useQuery } from "vue-query";
import { headerOptions } from "../../composables/auth/useHeadersToken";
import { userStore } from "../../store/user";
import { userSession } from "../../types/userSession";

const user = userStore();

const selectedUserInfo = ref<{ userInfo: string; userInfoTitle: string }>(null);
const showPreviousTrainings = ref(false);

onMounted(() => {
    user.handleUserSessionInfos();
});

const { data: subscribedTrainings } = useQuery(
    ["subscribedTrainings", userSession.value.user.email],
    () =>
        axios.get(
            `${
                import.meta.env.VITE_STRAPI_URL
            }/api/trainings?filters[user_trainings][user][$eq]=${
                userSession.value.user.email
            }&populate=trainer`,
            headerOptions
        ),
    { enabled: computed(() => showPreviousTrainings.value) }
);

const avatarImg = computed(() => user.avatar_img);
</script>
