<template>
    <ui-wrapper class="w-full">
        <ui-level
            space="lg"
            class="border-b-3 py-4"
            :class="{
                'border-b-[#1b098d49]': !isFieldEditing,
                'border-b-[#1b098d]': isFieldEditing,
            }"
        >
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

                <ui-level
                    v-if="!disabled"
                    class="border rounded-sm cursor-pointer border-[#1A098D]"
                    :class="{
                        'bg-[#1A098D]': isFieldEditing,
                        'transition hover:bg-[#1b098da0] hover:border-[#1b098da0]':
                            !isFieldEditing,
                    }"
                    @click="
                        emit('user-info', {
                            userInfo,
                            userInfoTitle,
                            type:
                                userInfoTitle === 'avatar_url'
                                    ? 'image'
                                    : userInfoTitle === 'phone_number'
                                    ? 'phoneNumber'
                                    : 'text',
                        })
                    "
                >
                    <mdicon
                        :class="{
                            '!text-white': isFieldEditing,
                            'text-[#1A098D] hover:text-white': !isFieldEditing,
                        }"
                        :name="isFieldEditing ? 'chevron-up' : 'chevron-down'"
                        width="15"
                        height="15"
                    />
                </ui-level>

                <mdicon
                    v-else
                    name="lock-outline"
                    width="15"
                    height="15"
                    class="text-[#1A098D]"
                />
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
    avatarImg?: string | null;
    isFieldEditing?: boolean;
    disabled?: boolean;
}>();

const emit = defineEmits<{
    (
        event: "user-info",
        value: {
            userInfo: string;
            userInfoTitle: string;
            type: "text" | "image" | "phoneNumber";
        }
    ): void;
}>();
</script>
