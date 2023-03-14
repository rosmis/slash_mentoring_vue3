<template>
    <div
        class="flex flex-col shadow-r min-h-90vh py-32 w-6/10 justify-center items-center"
    >
        <div>
            <p class="text-sm text-gray-800">Vos coordonnées</p>
            <UiInput class="mt-2 w-88" disabled v-model="user.email"></UiInput>
            <UiInput
                class="mt-2 w-88"
                disabled
                v-model="user.phoneNumber"
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
            <div
                class="rounded-xl flex shadow p-8 shadow-2xl shadow-gray-100 w-88 items-center"
            >
                <div
                    class="border rounded-full bg-gray-100 border-blue-900 border-2 h-24 w-24 image"
                ></div>
                <div class="rounded-lg bg-blue-900 h-8 ml-4 w-8"></div>
                <a
                    class="border rounded-lg cursor-pointer border-blue-900 ml-8 py-2 px-4 text-blue-800 pointer-events-none"
                >
                    Enregistrer
                </a>
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

defineProps<{
    user: Record<string, any>;
    domains: SelectMixedOption;
    classes: Array<SelectOption | SelectGroupOption>;
}>();
</script>
