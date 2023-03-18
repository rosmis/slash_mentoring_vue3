import { supabase } from "../../supabase";

export async function useSessionUserInfos(id: string) {
    let { data } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, full_name`)
        .eq("id", id)
        .single();

    return data;
}
