import { supabase } from "../../supabase";

export async function useSessionUserInfos(id: string) {
    let { data } = await supabase
        .from("profiles")
        .select(
            `username, website, avatar_url, full_name, did_user_register, did_user_fill_credit_infos`
        )
        .eq("id", id)
        .single();

    return data;
}
