<template>
    <div class="flex w-full">
        <AuthInformationProfile v-model="user" v-if="currentStep === 'profile'" />
        
        <div class="w-6/10 flex flex-col justify-center items-center shadow-r min-h-90vh" v-if="currentStep === 'experience'">
            <div>
                <p class="text-sm text-gray-800">Votre classe</p>
                <n-select placeholder="Choix de la classe" class="w-88 mt-2" ></n-select>
            </div>
            <div class="mt-8">
                <p class="text-sm text-gray-800">Les domaines qui vous intéressent</p>
                <n-select placeholder="Choix du domaine" v-for="(select, index) in 3" :key="index" class="w-88 mt-2" :options="domains">
                </n-select>
            </div>
        </div>

        <div class="w-4/10 flex flex-col justify-center items-center min-h-90vh">
            <n-steps vertical class="w-1/2" :current="currentStepId" size="small">
                <n-step title="Votre profil"></n-step>
                <n-step title="Votre expérience"></n-step>
                <n-step title="Récapitulatif: Votre compte"></n-step>
            </n-steps>

            <div class="flex mt-16">
                <button 
                    @click="currentStepId -= 1" 
                    :disabled="currentStepId === 1" 
                    :class="{'border-blue-200': currentStepId === 1, 'text-blue-200': currentStepId === 1, 'cursor-pointer': currentStepId !== 1 }" 
                    class="rounded-lg border border-blue-900 ml-8 text-blue-800 py-2 px-4 w-40"
                >
                    <span class="mr-2">&lt;</span> Précédent
                </button>
                <button
                    v-if="currentStepId < 3"
                    @click="currentStepId += 1" 
                    :disabled="currentStepId === 3" 
                    :class="{ 'border-blue-200': currentStepId === 3, 'text-blue-200': currentStepId === 3, 'cursor-pointer': currentStepId !== 3 }" 
                    class="rounded-lg border border-blue-900 ml-8 text-blue-800 py-2 px-4 w-40"
                >
                    Suivant <span class="ml-2">></span>
                </button>
                <button
                    v-else
                    @click="save()"
                    class="rounded-lg border border-blue-900 ml-8 text-blue-800 py-2 px-4 w-40"
                >
                    Enregistrer
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { NSteps, NStep, NSelect } from "naive-ui";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import { ref, computed } from 'vue';

const user = ref({
    email: null,
    phoneNumber: null,
    firstName: null,
    lastName: null
})

const currentStepId = ref<number>(1)
const currentStep = computed<string | undefined>(() => {
    return currentStepId.value === 1 ? 'profile' : currentStepId.value === 2 ? 'experience' : currentStepId.value === 3 ? 'summary' : undefined
})

const domains: SelectMixedOption[] = [
    { label: 'Motion Design', value: 'motionDesign' },
    { label: 'Stratégie de communication', value: 'communicationStrategy' },
    { label: 'Création 3D', value: 'creation3D' },
    { label: 'Développement web', value: 'webDevelopment' },   
]

function save() {
    window.$message.success(
        "Vos informations ont bien été sauvegardées"
    );
}

</script>

<style>

.shadow-r
{
  box-shadow: 10px 0 10px -2px rgb(228, 228, 228);
}

.image {
    background-image: url('../../../assets/image.jpeg');
    background-repeat: no-repeat;
    background-position: center;
}

</style>