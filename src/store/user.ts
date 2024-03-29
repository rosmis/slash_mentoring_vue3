import { Provider } from "@supabase/supabase-js";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { userSession } from "../types/userSession";

interface Credentials {
    email?: string | undefined;
    password?: string | undefined;
    provider?: "google" | undefined;
}

export interface UserData {
    id: string | null;
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
    website: string | null;
    did_user_fill_credit_infos: boolean | null;
    stripe_account_id: string | null;
}

export interface UserInfos {
    data: UserData;
    avatar_img: string | null;
}

export const userStore = defineStore({
    id: "user",
    state: (): UserInfos => ({
        data: {
            id: null,
            avatar_url: null,
            username: null,
            full_name: null,
            did_user_fill_credit_infos: null,
            stripe_account_id: null,
            website: null,
        },
        avatar_img: null,
    }),
    actions: {
        async handleSignIn(credentials: Credentials) {
            try {
                const { email, password } = credentials;

                if (!email?.length || !password?.length) {
                    window.$message.error(
                        "Veuillez rentrer tous les champs requis"
                    );
                    return;
                }

                const { error, data } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) {
                    window.$message.error(
                        `Une erreur s'est produite: ${error}`
                    );
                    return;
                }
                if (!error && !data) {
                    window.$message.error(
                        "Aucun compte ne correspond à ces identifiants, veuillez réessayer"
                    );
                    return;
                }

                window.$message.success("Connecté");
                this.$router.push({ name: "Dashboard" });
            } catch (error: any) {
                console.error(`Une erreur s'est produite: ${error}`);
            }
        },

        async handleUserSessionInfos() {
            if (!userSession.value) return;
            let { data } = await supabase
                .from("profiles")
                .select(
                    `avatar_url, full_name, phone_number, did_user_fill_credit_infos, id, stripe_account_id`
                )
                .eq("id", userSession.value.user.id)
                .single();

            this.data = data;

            if (data?.avatar_url) this.downloadAvatar(data?.avatar_url);
        },

        async downloadAvatar(avatar_url: string | null) {
            const { data: image, error } = await supabase.storage
                .from("avatars")
                .download(avatar_url);
            if (error) throw error;

            this.avatar_img = URL.createObjectURL(image);
        },

        async handleSignUp(credentials: Credentials) {
            try {
                const { email, password } = credentials;

                if (!email || !password) {
                    window.$message.error(
                        "Veuillez rentrer tous les champs requis"
                    );
                    return;
                }

                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error) {
                    window.$message.error(
                        `Une erreur s'est produite: ${error}`
                    );
                    return;
                }
                window.$message.success(
                    "Un email vous a été envoyé pour valider votre inscription, vous pouvez fermer cette fenêtre",
                    { duration: 5000 }
                );
            } catch (error: any) {
                console.error(`Une erreur s'est produite: ${error}`);
            }
        },

        async handleOAuthLogin(provider: Provider) {
            const { error } = supabase.auth.signInWithOAuth({ provider });

            if (error) {
                window.$message.error(`Une erreur s'est produite: ${error}`);
                return;
            }
        },

        async handlePasswordReset() {
            const email = prompt(
                "Veuillez rentrer votre adresse email pour reinitialiser votre mot de passe"
            );

            if (!email) {
                window.$message.error(`Veuillez rentrer votre adresse email`);
                return;
            } else {
                const { error } = supabase.auth.resetPasswordForEmail(email);
                if (error) {
                    window.$message.error(
                        `Une erreur s'est produite: ${error}`
                    );
                    return;
                }
                window.$message.success(
                    "Un email vous a été envoyé pour reinitialiser votre mot de passe"
                );
            }
        },

        async handleLogout() {
            try {
                const { error } = await supabase.auth.signOut();

                if (error) {
                    window.$message.error(
                        `Une erreur s'est produite: ${error}`
                    );
                    return;
                }
                window.$message.success("Vous avec bien été déconnecté");
            } catch (error) {
                if (error) {
                    window.$message.error(
                        `Une erreur s'est produite: ${error}`
                    );
                }
            }
        },
    },
});
