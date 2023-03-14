<template>
    <div
        class="flex flex-col shadow-r min-h-90vh w-6/10 justify-center items-center"
    >
        <div>
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
