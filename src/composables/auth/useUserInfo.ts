import { computed, ComputedRef } from "vue";

export function useUserInfos(): ComputedRef<Record<string, string>> {
    return computed(() => ({
        username: "Pseudo",
        website: "Site internet",
        avatar_url: "Photo de profil",
        full_name: "Prenom / Nom",
        phone_number: "Numéro de téléphone",
        email: "Adresse Email",
        password: "Mot de passe",
    }));
}
