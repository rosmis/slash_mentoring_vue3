<template>
    <ui-page>
        <ui-level v-if="!isMobile" space="none" class="h-full bg-[#F9F9FB]">
            <ui-level class="bg-white flex-col h-full shadow-lg w-1/2 z-1">
                <ui-wrapper padded class="w-[70%]">
                    <ui-title size="3xl" color="dark-blue" class="mb-4"
                        >Votre compte
                        {{ isUserValidTutor ? "tuteur" : "" }}
                    </ui-title>

                    <ui-level
                        v-if="user.data"
                        class="flex-col"
                        vertical-align="top"
                    >
                        <n-tabs type="line" animated>
                            <n-tab-pane name="student" tab="Informations élève">
                                <template
                                    v-for="(key, userInfo) in filteredUserData"
                                    :key="userInfo"
                                >
                                    <AuthUserInfo
                                        :user-info="key"
                                        :user-info-title="userInfo"
                                        :avatar-img="avatarImg"
                                        :is-field-editing="
                                            selectedUserInfo &&
                                            selectedUserInfo.userInfoTitle ===
                                                userInfo
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
                                <p
                                    class="text-center text-xs mb-4 text-gray-500"
                                >
                                    Pour toutes demandes de modification de mot
                                    de passe veuillez vous rapprocher de
                                    l'assistance
                                </p>
                            </n-tab-pane>

                            <n-tab-pane
                                name="tutor"
                                :disabled="!isUserValidTutor"
                            >
                                <template #tab>
                                    <p class="relative">
                                        Informations tuteur

                                        <mdicon
                                            v-if="
                                                isUserValidTutor &&
                                                !isUserAlreadyStripeVerifiedAccount
                                            "
                                            name="information"
                                            width="15"
                                            class="-top-2 -right-4 text-blue-700 absolute"
                                        />
                                    </p>
                                </template>

                                <AuthStripeTutorDetails
                                    :user-infos="user.data"
                                    :is-user-stripe-verified="
                                        isUserAlreadyStripeVerifiedAccount
                                    "
                                />
                            </n-tab-pane>
                        </n-tabs>
                    </ui-level>

                    <ui-level align="center" class="mx-auto mt-8 w-8/10">
                        <ui-button
                            outlined
                            class="w-full"
                            @click="
                                showPreviousTrainings = true;
                                selectedUserInfo = null;
                            "
                        >
                            Mes derniers tutorats
                        </ui-button>
                    </ui-level>
                </ui-wrapper>
            </ui-level>
            <ui-level class="flex-col h-full w-1/2">
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
                        v-else-if="showPreviousTrainings && subscribedTrainings"
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
                            hide-tutoring-button
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

        <UiLevel v-else align="center" class="h-screen-sm mx-4">
            <ui-message
                title="La version mobile de votre profil est en cours de construction,
            veuillez vous connecter sur desktop pour modifier vos informations
            personnelles"
                color="blue"
                size="sm"
                icon="information"
            />
        </UiLevel>
    </ui-page>
</template>

<script lang="ts" setup>
import axios from "axios";
import { NTabPane, NTabs } from "naive-ui";
import { computed, onMounted, ref } from "vue";
import { useQuery } from "vue-query";
import { headerOptions } from "../../composables/auth/useHeadersToken";
import { useMobileBreakpoint } from "../../composables/mobile/useMobileBreakpoints";
import { userStore } from "../../store/user";
import { userSession } from "../../types/userSession";

const user = userStore();

const selectedUserInfo = ref<{ userInfo: string; userInfoTitle: string }>(null);
const showPreviousTrainings = ref(false);
const isMobile = useMobileBreakpoint("md");

const isUserValidTutor = computed(
    () => user.data?.did_user_fill_credit_infos !== null
);

onMounted(() => user.handleUserSessionInfos());

const { data: stripeUserData } = useQuery(
    ["stripeUserData"],
    () =>
        axios.get(
            `${import.meta.env.VITE_STRAPI_URL}/api/webhook/status/${
                user.data.stripe_account_id
            }`
        ),
    {
        enabled: computed(() => !!user.data?.stripe_account_id),
        refetchOnWindowFocus: false,
    }
);

const isUserAlreadyStripeVerifiedAccount = computed(() => {
    if (!stripeUserData.value) return true;

    return stripeUserData.value.data.isUserFullyVerified;
});

const filteredUserData = computed(() => {
    if (!user.data) return {};

    const { id, did_user_fill_credit_infos, stripe_account_id, ...obj } =
        user.data;

    return obj;
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
