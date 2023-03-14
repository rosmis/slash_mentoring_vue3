<template>
    <div class="flex w-full">
        <AuthInformationProfile
            v-model="user"
            v-if="currentStep === 'profile'"
        />
        <AuthInformationExperience
            v-model="user"
            :domains="domains"
            :classes="classes"
            v-if="currentStep === 'experience'"
        ></AuthInformationExperience>

        <AuthInformationSummary
            v-if="currentStep === 'summary'"
            :user="user"
        ></AuthInformationSummary>

        <div
            class="flex flex-col min-h-90vh w-4/10 justify-center items-center"
        >
            <n-steps
                vertical
                class="w-1/2"
                :current="currentStepId"
                size="small"
            >
                <n-step title="Votre profil"></n-step>
                <n-step title="Votre expérience"></n-step>
                <n-step title="Récapitulatif: Votre compte"></n-step>
            </n-steps>

            <div class="flex mt-16">
                <button
                    @click="currentStepId -= 1"
                    :disabled="currentStepId === 1"
                    :class="{
                        'border-blue-200': currentStepId === 1,
                        'text-blue-200': currentStepId === 1,
                        'cursor-pointer': currentStepId !== 1,
                    }"
                    class="border rounded-lg border-blue-900 ml-8 py-2 px-4 text-blue-800 w-40"
                >
                    <span class="mr-2">&lt;</span> Précédent
                </button>
                <button
                    v-if="currentStepId < 3"
                    @click="currentStepId += 1"
                    :disabled="currentStepId === 3"
                    :class="{
                        'border-blue-200': currentStepId === 3,
                        'text-blue-200': currentStepId === 3,
                        'cursor-pointer': currentStepId !== 3,
                    }"
                    class="border rounded-lg border-blue-900 ml-8 py-2 px-4 text-blue-800 w-40"
                >
                    Suivant <span class="ml-2">></span>
                </button>
                <button
                    v-else
                    @click="save()"
                    class="border rounded-lg border-blue-900 ml-8 py-2 px-4 text-blue-800 w-40"
                >
                    Enregistrer
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NStep, NSteps, SelectGroupOption, SelectOption } from "naive-ui";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import { computed, ref } from "vue";

const user = ref({
    email: null,
    phoneNumber: null,
    firstName: null,
    lastName: null,
    domains: null,
    class: null,
});

const currentStepId = ref<number>(1);
const currentStep = computed<string | undefined>(() => {
    return currentStepId.value === 1
        ? "profile"
        : currentStepId.value === 2
        ? "experience"
        : currentStepId.value === 3
        ? "summary"
        : undefined;
});

const classes: Array<SelectOption | SelectGroupOption> = [
    {
        type: "group",
        label: "ESP",
        key: "ESP",
        children: [
            {
                label: "ESP B1",
                value: "ESP B1",
            },
            {
                label: "ESP B2",
                value: "ESP B2",
            },
            {
                label: "ESP B3",
                value: "ESP B3",
            },
        ],
    },
    {
        type: "group",
        label: "ESD",
        key: "ESD",
        children: [
            {
                label: "ESD B1",
                value: "ESD B1",
            },
            {
                label: "ESD B2",
                value: "ESD B2",
            },
            {
                label: "ESD B3",
                value: "ESD B3",
            },
        ],
    },
];

const domains: SelectMixedOption[] = [
    { label: "Motion Design", value: "Motion Design" },
    {
        label: "Stratégie de communication",
        value: "Stratégie de communication",
    },
    { label: "Création 3D", value: "Création 3D" },
    { label: "Développement web", value: "Développement web" },
];

function save() {
    window.$message.success("Vos informations ont bien été sauvegardées");
}
</script>

<style>
.shadow-r {
    box-shadow: 10px 0 10px -2px rgb(228, 228, 228);
}

.image {
    background-image: url("../../../assets/image.jpeg");
    background-repeat: no-repeat;
    background-position: center;
}
</style>
