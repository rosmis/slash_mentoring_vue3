<template>
    <div class="w-6/10 flex flex-col justify-center items-center shadow-r min-h-90vh" v-if="modelValue">
        <div>
            <p class="text-sm text-gray-800">Vos coordonnées</p>
            <UiInput class="w-88 mt-2" placeholder='email' v-model="email"></UiInput>
            <UiInput class="w-88 mt-2" placeholder="+33 06 58 20 71 99"  v-model="phoneNumber"></UiInput>
        </div>
        <div class="mt-8">
            <p class="text-sm text-gray-800">Votre identité</p>
            <UiInput class="w-88 mt-2" placeholder="prénom" v-model="firstName"></UiInput>
            <UiInput class="w-88 mt-2" placeholder="nom" v-model="lastName"></UiInput>
        </div>
        <div class="mt-8">
            <p class="text-sm text-gray-800">Votre photo de profil</p>
            <div class="w-88 shadow shadow-2xl shadow-gray-100 flex items-center p-8 rounded-xl">
                <div class="h-24 w-24 border border-blue-900 border-2 rounded-full bg-gray-100 image">

                </div>
                <div class="h-8 w-8 bg-blue-900 ml-4 rounded-lg">
                    
                </div>
                <a class="rounded-lg border border-blue-900 ml-8 text-blue-800 py-2 px-4 cursor-pointer">
                    Enregistrer
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    modelValue: any,
}>()
const emit = defineEmits(['update:modelValue'])

const email = computed({
    get() {
        return props.modelValue.email
    },
    set(newValue: string) {
        emit('update:modelValue', {
            ...props.modelValue,
            email: newValue
        })
    }
})

const phoneNumber = computed({
    get() {
        return props.modelValue.phoneNumber
    },
    set(newValue: string) {
        emit('update:modelValue', {
            ...props.modelValue,
            phoneNumber: newValue
        })
    }
})

const firstName = computed({
    get() {
        return props.modelValue.firstName
    },
    set(newValue: string) {
        emit('update:modelValue', {
            ...props.modelValue,
            firstName: newValue
        })
    }
})

const lastName = computed({
    get() {
        return props.modelValue.lastName
    },
    set(newValue: string) {
        emit('update:modelValue', {
            ...props.modelValue,
            lastName: newValue
        })
    }
})
</script>