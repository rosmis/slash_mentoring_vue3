<template>
    <UiWrapper color="blue" rounded="sm">
        <UiLevel>
            <p class="text-white">{{ user.first_name }} {{ user.last_name }}</p>
            <UiLevel>
                <p class="text-white">{{ user.email }}</p>

                <UiButton
                    v-if="!copied"
                    icon="content-copy"
                    size="sm"
                    @click="copyEmail()"
                />

                <p v-if="copied" class="text-white text-sm">Copié!</p>
            </UiLevel>
        </UiLevel>
    </UiWrapper>
</template>

<script lang="ts" setup>
import { User } from "@supabase/supabase-js";
import { useClipboard } from "@vueuse/core";

const props = defineProps<{
    user: Partial<User>;
}>();

const userEmail = props.user.email;

const { copy, copied } = useClipboard();

const copyEmail = () => {
    copy(userEmail);
};
</script>
