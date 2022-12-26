import { Session } from "@supabase/supabase-js";
import { ref } from "vue";
import { supabase } from "../../supabase";

export function useUserSession() {
  const session = ref<Session>();
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });

  return session;
}
