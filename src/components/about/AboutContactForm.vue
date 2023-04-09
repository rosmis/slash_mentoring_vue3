<template>
    <ui-wrapper color="blue" class="w-full" padded rounded="sm">
        <ui-level class="flex-col" vertical-align="top" space="lg">
            <ui-level class="w-full">
                <ui-title size="2xl">Vous souhaitez...</ui-title>
                <n-radio-group
                    v-model:value="formData.subject"
                    class="w-1/3"
                    size="large"
                >
                    <n-radio value="mentor" class="text-white mr-4">
                        Devenir mentor
                    </n-radio>
                    <n-radio value="other"> Autre </n-radio>
                </n-radio-group>
            </ui-level>

            <ui-level class="w-full" space="2xl">
                <ui-level class="flex-col w-3/4" vertical-align="top">
                    <ui-input
                        v-model="formData.lastName"
                        class="w-full"
                        transparent
                        placeholder="Nom *"
                        accent="white"
                        required
                        outlined
                    ></ui-input>
                    <ui-input
                        v-model="formData.firstName"
                        class="w-full"
                        transparent
                        placeholder="Prénom *"
                        accent="white"
                        required
                        outlined
                    ></ui-input>
                </ui-level>

                <ui-level class="flex-col w-3/4" vertical-align="top">
                    <ui-input
                        v-model="formData.phoneNumber"
                        class="w-full"
                        transparent
                        placeholder="Numéro de téléphone"
                        accent="white"
                        outlined
                    ></ui-input>
                    <ui-input
                        v-model="formData.email"
                        class="w-full"
                        transparent
                        placeholder="Email *"
                        accent="white"
                        required
                        outlined
                    ></ui-input>
                </ui-level>
            </ui-level>

            <textarea
                v-model="formData.content"
                cols="30"
                rows="10"
                placeholder="Votre message *"
                class="bg-transparent border-b-white border-b outline-none text-white w-full"
            ></textarea>

            <ui-level align="right" class="w-full" @click="submitForm()">
                <ui-button accent="white"> Envoyer </ui-button>
            </ui-level>
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
import axios from "axios";
import { NRadio, NRadioGroup } from "naive-ui";
import { computed, ref } from "vue";
import { headerOptions } from "../../composables/auth/useHeadersToken";

const formData = ref({
    subject: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    content: "",
});

const requiredFields = computed(() => {
    return {
        subject: !!formData.value.subject,
        firstName: !!formData.value.firstName,
        lastName: !!formData.value.lastName,
        email: !!formData.value.email,
        content: !!formData.value.content,
    };
});

const token = "test";

async function submitForm() {
    if (Object.values(requiredFields.value).some((field) => !field)) {
        window.$message.error("Des informations sont manquantes");

        return;
    }

    try {
        axios.post(
            `${import.meta.env.VITE_STRAPI_URL}/api/ezforms/submit`,
            {
                token,
                formData: formData.value,
                formName: "Demande accueil",
            },
            headerOptions
        );

        window.$message.success("Formulaire envoyé");

        Object.keys(formData.value).forEach(
            (value) => (formData.value[value] = "")
        );
    } catch (error: any) {
        console.error(error);
    }
}
</script>

<style>
.n-radio.n-radio--checked .n-radio__dot {
    background-color: white !important;
}

.n-radio .n-radio__dot {
    background-color: transparent !important;
}

.n-radio .n-radio__label {
    color: white !important;
}
</style>
