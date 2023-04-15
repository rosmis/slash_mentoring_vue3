<template>
    <ui-level class="flex-col" vertical-align="top">
        <ui-title color="dark-blue" size="2xl">{{
            userInfoTitles[selectedUserInfo.userInfoTitle]
        }}</ui-title>

        <ui-wrapper padded color="white" shadow rounded="sm" class="w-full">
            <ui-level class="flex-col" vertical-align="top" space="sm">
                <ui-level space="lg">
                    <ui-profile-picture
                        v-if="selectedUserInfo.type === 'image'"
                        :path="infoInput"
                        @update:path="infoInput = $event"
                        size="5"
                        class="rounded"
                    />

                    <phone-input
                        v-if="selectedUserInfo.type === 'phoneNumber'"
                        class="rounded-lg mt-5 w-76"
                        @phoneData="isPhoneNumberValid = !!$event.isValid"
                        @phone="infoInput = `+${$event}`"
                        :allowed="['FR', 'BE', 'CH']"
                        defaultCountry="FR"
                        :value="infoInput.replace('+', '')"
                    >
                        <p
                            v-if="isPhoneNumberValid"
                            class="text-xs text-green-600"
                        >
                            Numéro valide
                        </p>
                        <p v-else class="text-xs text-red-600">
                            Numéro non valide
                        </p>
                    </phone-input>

                    <ui-input v-else v-model="infoInput" />

                    <ui-button
                        outlined
                        @click="updateProfile()"
                        :loading="loading"
                    >
                        Enregistrer
                    </ui-button>
                </ui-level>
                <ui-message
                    v-if="selectedUserInfo.type === 'phoneNumber'"
                    title="Veuillez vérifier que le numéro de téléphone que vous rentrez soit celui associé à votre compte Lydia"
                    color="blue"
                    size="sm"
                    icon="information"
                />
            </ui-level>
        </ui-wrapper>
    </ui-level>
</template>

<script lang="ts" setup>
import { useMessage } from "naive-ui";
import { onMounted, ref, watch } from "vue";
import { useUserInfos } from "../../composables/auth/useUserInfo";
import { userStore } from "../../store/user";
import { supabase } from "../../supabase";
import { userSession } from "../../types/userSession";

const userInfoTitles = useUserInfos();
const message = useMessage();
const user = userStore();

onMounted(() => user.handleUserSessionInfos());

const props = defineProps<{
    selectedUserInfo: {
        userInfo: string;
        userInfoTitle: string;
        type: "text" | "image" | "phoneNumber";
    };
}>();

const emit = defineEmits<{
    (event: "fetch"): void;
}>();

const infoInput = ref(props.selectedUserInfo.userInfo);
const loading = ref(false);

const isPhoneNumberValid = ref(false);

async function updateProfile() {
    try {
        if (!infoInput.value) {
            message.error("Veuillez remplir le champ avant de le sauvegarder");
            return;
        }

        if (
            props.selectedUserInfo.type === "phoneNumber" &&
            !isPhoneNumberValid.value
        ) {
            message.error("Veuillez rentrer un numéro de téléphone valide");
            return;
        }

        loading.value = true;
        const updates = {
            id: userSession.value.user.id,
            [props.selectedUserInfo.userInfoTitle]: infoInput.value,
            updated_at: new Date(),
        };
        let { error } = await supabase.from("profiles").upsert(updates);

        if (error) throw error;

        message.success("L'information a bien été enregistrée");
        emit("fetch");
    } catch (error) {
        alert(error.message);
    } finally {
        loading.value = false;
    }
}

watch(
    () => props.selectedUserInfo,
    () => (infoInput.value = props.selectedUserInfo.userInfo),
    { deep: true, immediate: true }
);
</script>
