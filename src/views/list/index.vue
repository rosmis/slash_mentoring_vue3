<template>
    <UiPage screen>
        <UiLevel align="center" class="h-full">
            <UiWrapper rounded="sm" shadow class="h-3/4 m-4 w-1/2">
                <UiLevel class="flex-col" vertical-align="top">
                    <UiTitle color="dark-blue"
                        >Liste d'utilisateurs de l'ESD/ESP</UiTitle
                    >

                    <UiInput
                        v-model="search"
                        placeholder="Rechercher un utilisateur..."
                        class="w-full"
                        icon="magnify"
                        size="lg"
                        cancelable
                    />

                    <UiLoader v-if="loading" />

                    <div
                        v-if="
                            usersWithAllInformation &&
                            usersWithAllInformation.length
                        "
                        class="h-100 w-full overflow-y-scroll"
                    >
                        <UiLevel class="flex-col w-full" vertical-align="top">
                            <UserRowList
                                v-for="(user, index) in usersWithAllInformation"
                                :key="`user-${index}`"
                                :user="user"
                            />
                        </UiLevel>
                    </div>
                    <p
                        v-else-if="
                            usersWithAllInformation &&
                            !usersWithAllInformation.length
                        "
                        class="text-center text-slate-400"
                    >
                        Aucun utilisateur ne correspond à votre recherche
                    </p>
                    <p v-else class="text-center text-slate-400">
                        Faites une recherche pour en trouver votre utilisateur
                    </p>
                </UiLevel>
            </UiWrapper>
        </UiLevel>
    </UiPage>
</template>

<script lang="ts" setup>
import { User } from "@supabase/supabase-js";
import axios from "axios";
import { debounce } from "lodash";
import { computed, onMounted, ref, watch } from "vue";
import { supabase } from "../../supabase";
import { userSession } from "../../types/userSession";

const search = ref("");
const users =
    ref<{ id: string; first_name: string; last_name: string }[]>(undefined);
const usersWithEmail = ref<User[]>([]);

const loading = ref(false);

onMounted(async () => {
    const { data: usersFetchedWithEmail } = await axios.get(
        `${import.meta.env.VITE_STRAPI_URL}/api/webhook/users`,
        {
            params: {
                userId: userSession.value?.user.id,
            },
        }
    );

    usersWithEmail.value = usersFetchedWithEmail.supabaseUsers;
});

const fetch = async () => {
    loading.value = true;

    const { data: fetchedUserFirstName } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .or(
            `first_name.ilike.${search.value.toLowerCase()},last_name.ilike.${search.value.toLowerCase()}`
        );

    users.value = fetchedUserFirstName;
    loading.value = false;
};

const usersWithAllInformation = computed(() => {
    if (!users.value) return undefined;
    if (!users.value.length) return [];

    return users.value.map((user) => {
        const matchedUserWithEmail = usersWithEmail.value.find(
            (userEmail) => userEmail.id === user.id
        );

        return {
            ...user,
            email: matchedUserWithEmail.email,
        };
    });
});

const debouncedFetch = debounce(fetch, 500);

watch(search, () => debouncedFetch());
</script>
