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
                    <n-radio value="trainingProposal" class="pb-2">
                        En tant que mentor
                    </n-radio>
                    <n-radio value="mentor"> En tant qu'étudiant </n-radio>
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
                    <n-select
                        v-model:value="formData.class"
                        placeholder="Votre classe *"
                        :options="classes"
                    ></n-select>

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
import { NRadio, NRadioGroup, NSelect } from "naive-ui";
import { computed, ref } from "vue";
import { headerOptions } from "../../composables/auth/useHeadersToken";
import { classes } from "../../types/classes";

const emit = defineEmits<{
    (event: "close"): void;
}>();

const formData = ref({
    subject: "",
    firstName: "",
    lastName: "",
    email: "",
    class: undefined,
    content: "",
});

const requiredFields = computed(() => {
    return {
        subject: !!formData.value.subject,
        firstName: !!formData.value.firstName,
        lastName: !!formData.value.lastName,
        class: !!formData.value.class,
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
                formName: "Demande élève",
            },
            headerOptions
        );

        window.$message.success(
            "Votre demande a bien été envoyée, nous reviendrons vers vous dans les plus brefs délais"
        );

        Object.keys(formData.value).forEach(
            (value) => (formData.value[value] = "")
        );

        emit("close");
    } catch (error: any) {
        console.error(error);
    }
}
</script>

<style>
.n-radio.n-radio--checked .n-radio__dot {
    background-color: white !important;
}

.n-base-selection {
    border: none !important;
    --n-border: none !important;
    --n-border-radius: none !important;
    --n-border-hover: none !important;
    --n-border-active: none !important;
    --n-border-focus: none !important;
    --n-text-color: rgba(156, 163, 175, 1) !important;
    --n-placeholder-color: rgba(156, 163, 175, 1) !important;
    border-bottom: 1px solid white !important;
}

.n-base-selection .n-base-selection-label {
    background-color: transparent !important;
}

.n-radio .n-radio__dot {
    background-color: transparent !important;
}

.n-radio .n-radio__label {
    color: white !important;
}
</style>
