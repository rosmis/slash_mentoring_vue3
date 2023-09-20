<template>
    <div
        class="flex flex-col w-full min-h-90vh justify-start items-center"
        :class="{ 'shadow-r !justify-center py-32': !isMobile }"
    >
        <div class="w-88">
            <UiTitle color="dark-blue">Récapitulatif</UiTitle>
        </div>
        <div class="mt-4">
            <p class="text-sm text-gray-800">Vos coordonnées</p>
            <UiInput class="mt-2 w-88" disabled v-model="user.email"></UiInput>
            <UiInput
                class="mt-2 w-88"
                :placeholder="!user.phone ? 'Non renseigné' : undefined"
                disabled
                v-model="user.phone"
            ></UiInput>
        </div>
        <div class="mt-8">
            <p class="text-sm text-gray-800">Votre identité</p>
            <UiInput
                class="mt-2 w-88"
                disabled
                v-model="user.firstName"
            ></UiInput>
            <UiInput
                class="mt-2 w-88"
                disabled
                v-model="user.lastName"
            ></UiInput>
        </div>
        <div class="mt-8">
            <p class="text-sm text-gray-800">Votre photo de profil</p>
            <div class="flex p-8 w-88 items-center justify-around">
                <div
                    class="border rounded-full bg-gray-100 border-blue-900 border-2 h-24 w-24"
                >
                    <img
                        class="rounded-full"
                        v-bind:src="userAvatarUrl"
                        alt=""
                    />
                </div>
            </div>
        </div>
        <div class="mt-8">
            <p class="text-sm text-gray-800">Votre classe</p>
            <n-select
                placeholder="Choix de la classe"
                class="mt-2 w-88"
                :options="classes"
                v-model:value="user.class"
                disabled
            ></n-select>
        </div>
        <div class="mt-8">
            <p class="text-sm text-gray-800">
                Les domaines qui vous intéressent
            </p>
            <n-select
                placeholder="Choix du domaine"
                v-for="(domain, index) in user.domains"
                :key="index"
                class="mt-2 w-88"
                :options="domains"
                :value="domain"
                disabled
            >
            </n-select>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    SelectGroupOption,
    SelectMixedOption,
    SelectOption,
} from "naive-ui/es/select/src/interface";
import { onMounted, ref } from "vue";
import { supabase } from "../../../supabase";

const props = defineProps<{
    user: Record<string, any>;
    domains: SelectMixedOption;
    classes: Array<SelectOption | SelectGroupOption>;
    isMobile: boolean;
}>();

onMounted(async () => {
    if (props.user.avatarUrl) {
        const { data } = await supabase.storage
            .from("avatars")
            .download(props.user.avatarUrl);

        if (!data) return;

        userAvatarUrl.value = URL.createObjectURL(data);
    }
});

const userAvatarUrl = ref<string>();
</script>
