<template>
    <ui-wrapper class="w-full">
        <ui-level space="lg" class="border-b-3 border-b-[#4640ea4b] py-4">
            <p>{{ userInfoTitles[userInfoTitle] }} :</p>
            <ui-level>
                <n-avatar
                    v-if="avatarImg && userInfoTitle === 'avatar_url'"
                    :src="avatarImg"
                    size="large"
                    round
                ></n-avatar>
                <p v-else-if="userInfo">{{ userInfo }}</p>
                <p v-else class="text-gray-500">Non spécifié</p>

                <ui-level class="border rounded-sm border-[#1A098D]">
                    <mdicon
                        class="text-[#1A098D]"
                        name="chevron-down"
                        width="15"
                        height="15"
                    />
                </ui-level>
            </ui-level>
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
import { NAvatar } from "naive-ui";
import { useUserInfos } from "../../composables/auth/useUserInfo";

const userInfoTitles = useUserInfos();

defineProps<{
    userInfo: string | null;
    userInfoTitle: string | null;
    avatarImg: string | null;
}>();
</script>
