<template>
    <div class="flex w-full">
        <UiLevel
            class="flex-col w-full relative"
            vertical-align="top"
            :space="isMobile ? 'lg' : undefined"
            :class="{ '!w-6/10': !isMobile }"
        >
            <UiLevel v-if="isMobile" class="w-full p-6" align="center">
                <n-steps
                    horizontal
                    class="flex-wrap w-3/4 gap-4"
                    :current="currentStepId"
                    size="small"
                >
                    <n-step title="Votre profil"></n-step>
                    <n-step title="Votre expérience"></n-step>
                    <n-step title="Récapitulatif: Votre compte"></n-step>
                </n-steps>
            </UiLevel>

            <AuthInformationProfile
                v-if="currentStep === 'profile'"
                v-model="user"
                :is-mobile="isMobile"
            />
            <AuthInformationExperience
                v-if="currentStep === 'experience'"
                v-model="user"
                :domains="domains"
                :classes="classes"
                :is-mobile="isMobile"
            ></AuthInformationExperience>

            <AuthInformationSummary
                v-if="currentStep === 'summary'"
                :user="user"
                :is-mobile="isMobile"
            ></AuthInformationSummary>

            <div
                v-if="isMobile"
                class="bg-white flex w-full p-4 bottom-0 gap-4 items-center justify-center sticky"
            >
                <button
                    @click="currentStepId -= 1"
                    :disabled="currentStepId === 1"
                    :class="{
                        'border-blue-200': currentStepId === 1,
                        'text-blue-200': currentStepId === 1,
                        'cursor-pointer': currentStepId !== 1,
                    }"
                    class="border rounded-lg border-blue-900 py-2 px-4 text-blue-800 w-40"
                >
                    <span class="mr-2">&lt;</span> Précédent
                </button>
                <button
                    v-if="currentStepId < 3"
                    @click="goToNextStep()"
                    :disabled="currentStepId === 3"
                    :class="{
                        'border-blue-200': currentStepId === 3,
                        'text-blue-200': currentStepId === 3,
                        'cursor-pointer': currentStepId !== 3,
                    }"
                    class="border rounded-lg border-blue-900 py-2 px-4 text-blue-800 w-40"
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
        </UiLevel>

        <div
            v-if="!isMobile"
            class="flex flex-col w-4/10 items-center justify-center"
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
                    @click="goToNextStep()"
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
import { NStep, NSteps } from "naive-ui";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useMobileBreakpoint } from "../../../composables/mobile/useMobileBreakpoints";
import { supabase } from "../../../supabase";
import { classes } from "../../../types/classes";
import { domains } from "../../../types/domains";

const router = useRouter();
const isMobile = useMobileBreakpoint("md");

onMounted(async () => {
    const { data: authUser } = await supabase.auth.getUser();

    if (!authUser.user) return;

    user.value.id = authUser.user.id;
    user.value.email = authUser.user.email;
    user.value.phone = authUser.user.phone;
});

const user = ref<{
    id: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    domains: string[];
    class: string | undefined;
    avatarUrl: string | undefined;
}>({
    id: undefined,
    email: undefined,
    phone: undefined,
    firstName: undefined,
    lastName: undefined,
    domains: [],
    class: undefined,
    avatarUrl: undefined,
});

const requiredFields = ref<Record<string, boolean>>({
    id: false,
    email: false,
    firstName: false,
    lastName: false,
    domains: false,
    class: false,
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

async function save() {
    requiredFields.value = {
        id: false,
        email: false,
        firstName: false,
        lastName: false,
        domains: false,
        class: false,
    };

    checkRequiredFields();

    if (Object.values(requiredFields.value).some((field) => field)) {
        window.$message.error("Des informations sont manquantes");

        return;
    }

    try {
        await supabase
            .from("profiles")
            .update({
                full_name: user.value.firstName + " " + user.value.lastName,
                first_name: user.value.firstName,
                last_name: user.value.lastName,
                class: user.value.class,
                domains: user.value.domains,
                did_user_register: true,
                avatar_url: user.value.avatarUrl,
            })
            .match({ id: user.value.id });

        await supabase.auth.updateUser({
            phone: user.value.phone,
        });
        window.$message.success("Vos informations ont bien été sauvegardées");

        router.push("/dashboard");
    } catch (error) {
        window.$message.error(error);
    }
}

function goToNextStep() {
    if (!user.value.firstName || !user.value.lastName) {
        window.$message.error("Veuillez votre prénom et nom de famille");
        return;
    }

    currentStepId.value += 1;
}

function checkRequiredFields() {
    if (!user.value.class) {
        requiredFields.value.class = true;
    }

    if (!user.value.domains.length) {
        requiredFields.value.domains = true;
    }

    if (!user.value.firstName) {
        requiredFields.value.firstName = true;
    }

    if (!user.value.lastName) {
        requiredFields.value.lastName = true;
    }
}
</script>

<style>
.shadow-r {
    box-shadow: 10px 0 10px -2px rgb(228, 228, 228);
}

.translate {
    transform: translateX(-50%);
}

.image {
    background-image: url("../../../assets/image.jpeg");
    background-repeat: no-repeat;
    background-position: center;
}
</style>
