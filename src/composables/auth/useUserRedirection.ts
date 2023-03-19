import router from "../../router/index";
import { userSession } from "../../types/userSession";

export function useUserRedirection(routeName: string) {
    if (userSession.value) {
        router.push({ name: routeName });
        return;
    }

    router.push({ name: "Auth" });
}
