<template>
    <div
        class="flex flex-col shadow-r min-h-90vh w-6/10 justify-center items-center"
        v-if="modelValue"
    >
        <div>
            <p class="text-sm text-gray-800">Vos coordonnées</p>
            <UiInput
                class="mt-2 w-88"
                placeholder="email"
                v-model="email"
                disabled
            ></UiInput>
            <UiInput
                class="mt-2 w-88"
                placeholder="06 74 93 93 02"
                v-model="phone"
            ></UiInput>
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
                class="rounded-xl flex shadow p-8 shadow-2xl shadow-gray-100 w-88 items-center"
            >
                <div
                    class="border rounded-full bg-gray-100 border-blue-900 border-2 h-24 w-24 image"
                ></div>
                <div class="rounded-lg bg-blue-900 h-8 ml-4 w-8"></div>
                <a
                    class="border rounded-lg cursor-pointer border-blue-900 ml-8 py-2 px-4 text-blue-800"
                >
                    Enregistrer
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    modelValue: any;
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
        emit("update:modelValue", {
            ...props.modelValue,
            phone: newValue,
        });
    },
});

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
</script>
