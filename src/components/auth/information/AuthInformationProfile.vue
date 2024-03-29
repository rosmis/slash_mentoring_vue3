<template>
    <div
        v-if="modelValue"
        class="flex flex-col w-full min-h-90vh justify-start items-center"
        :class="{ 'shadow-r !justify-center': !isMobile }"
    >
        <div class="w-88">
            <UiTitle color="dark-blue">Finalisation de votre compte</UiTitle>
        </div>

        <div class="mt-4">
            <p class="text-sm text-gray-800">Vos coordonnées</p>
            <UiInput
                class="mt-2 w-88"
                placeholder="email"
                v-model="email"
                disabled
            ></UiInput>
            <UiLevel class="mt-2" vertical-align="top">
                <phone-input
                    class="rounded-lg w-76"
                    @phoneData="isPhoneNumberValid = !!$event.isValid"
                    @phone="phone = $event"
                    :allowed="['FR', 'BE', 'CH']"
                    defaultCountry="FR"
                    :value="phone ? phone : '0609716623'"
                >
                    <p v-if="isPhoneNumberValid" class="text-xs text-green-600">
                        Numéro valide
                    </p>
                    <p v-else class="text-xs text-red-600">Numéro non valide</p>
                </phone-input>
            </UiLevel>
        </div>
        <div class="mt-8">
            <p class="text-sm text-gray-800">Votre identité</p>
            <UiInput
                class="mt-2 w-88"
                placeholder="prénom"
                v-model="firstName"
            ></UiInput>
            <UiInput
                class="mt-2 w-88"
                placeholder="nom"
                v-model="lastName"
            ></UiInput>
        </div>
        <div class="mt-8">
            <p class="text-sm text-gray-800">Votre photo de profil</p>
            <div
                class="rounded-xl flex p-8 shadow-gray-100 w-88 items-center justify-around"
            >
                <div
                    class="border rounded-full bg-gray-100 border-blue-900 border-2 h-24 w-24"
                >
                    <img
                        class="bg-cover rounded-full h-full w-full"
                        v-bind:src="fileUrl || userAvatarUrl"
                    />
                </div>
                <label
                    type="file"
                    class="rounded-lg cursor-pointer flex bg-blue-900 h-8 ml-4 w-8 justify-center items-center"
                >
                    <mdicon name="pencil" width="20" class="text-white" />
                    <input type="file" class="hidden" @change="updateFile" />
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { supabase } from "../../../supabase";

const props = defineProps<{
    modelValue: any;
    isMobile: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const email = computed({
    get() {
        return props.modelValue.email;
    },
    set(newValue: string) {
        emit("update:modelValue", {
            ...props.modelValue,
            email: newValue,
        });
    },
});

const phone = computed({
    get() {
        return props.modelValue.phone;
    },
    set(newValue: string) {
        setTimeout(() => {
            if (isPhoneNumberValid.value) {
                emit("update:modelValue", {
                    ...props.modelValue,
                    phone: `+${newValue}`,
                });
            }
        }, 200);
    },
});

const isPhoneNumberValid = ref(false);

const firstName = computed({
    get() {
        return props.modelValue.firstName;
    },
    set(newValue: string) {
        emit("update:modelValue", {
            ...props.modelValue,
            firstName: newValue,
        });
    },
});

const lastName = computed({
    get() {
        return props.modelValue.lastName;
    },
    set(newValue: string) {
        emit("update:modelValue", {
            ...props.modelValue,
            lastName: newValue,
        });
    },
});

const avatarUrl = computed({
    get() {
        return props.modelValue.avatarUrl;
    },
    set(newValue: string) {
        emit("update:modelValue", {
            ...props.modelValue,
            avatarUrl: newValue,
        });
    },
});

const file = ref<File>();
const fileUrl = computed(() => {
    if (!file.value) return undefined;

    return URL.createObjectURL(file.value);
});

onMounted(async () => {
    if (props.modelValue.avatarUrl) {
        const { data } = await supabase.storage
            .from("avatars")
            .download(props.modelValue.avatarUrl);

        if (!data) return;

        userAvatarUrl.value = URL.createObjectURL(data);
    }
});

const userAvatarUrl = ref<string>();

async function updateFile(newFile: any) {
    file.value = newFile?.target.files[0];

    if (!file.value) return;

    const fileExt = file.value.name.split(".").pop();
    const filePath = `${Math.random()}.${fileExt}`;

    let { error: uploadError, data } = await supabase.storage
        .from("avatars")
        .upload(filePath, file.value);

    if (uploadError) throw uploadError;

    if (!data?.path) throw "Problème avec le téléchargement du fichier";

    avatarUrl.value = data.path;
}
</script>

<style>
@import "@lbgm/phone-number-input/style";
</style>
