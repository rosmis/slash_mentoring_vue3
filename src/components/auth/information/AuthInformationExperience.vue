<template>
    <div
        class="flex flex-col w-full min-h-90vh justify-start items-center"
        :class="{ 'shadow-r !justify-center': !isMobile }"
    >
        <div class="w-88">
            <UiTitle color="dark-blue">Dernière étape</UiTitle>
        </div>
        <div class="mt-4">
            <p class="text-sm text-gray-800">Votre classe</p>
            <n-select
                placeholder="Choix de la classe"
                class="mt-2 w-88"
                :options="classes"
                v-model:value="schoolClass"
            ></n-select>
        </div>
        <div class="mt-8">
            <p class="text-sm text-gray-800">
                Les domaines qui vous intéressent
            </p>
            <n-select
                placeholder="Choix du domaine"
                class="mt-2 py-1 w-88"
                :options="domains"
                v-model:value="userDomains"
                multiple
            >
            </n-select>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    SelectGroupOption,
    SelectMixedOption,
    SelectOption,
} from "naive-ui/es/select/src/interface";
import { computed } from "vue";

const props = defineProps<{
    modelValue: Record<string, any>;
    domains: SelectMixedOption;
    classes: Array<SelectOption | SelectGroupOption>;
    isMobile: boolean;
}>();

const emit = defineEmits(["update:modelValue", "newDomain"]);

const schoolClass = computed({
    get() {
        return props.modelValue.class;
    },
    set(newValue: string) {
        emit("update:modelValue", {
            ...props.modelValue,
            class: newValue,
        });
    },
});

const userDomains = computed({
    get() {
        return props.modelValue.domains;
    },
    set(newValue: string) {
        emit("update:modelValue", {
            ...props.modelValue,
            domains: newValue,
        });
    },
});
</script>
