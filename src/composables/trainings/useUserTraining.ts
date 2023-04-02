import axios from "axios";
import { useQuery } from "vue-query";
import { headerOptions } from "../../composables/auth/useHeadersToken";
import { userSession } from "../../types/userSession";

export function useUserTraining(trainingId: number) {
    let { data: userTraining, refetch: refetchUserTraining } = useQuery(
        ["userTraining"],
        () =>
            axios.get(
                `${
                    import.meta.env.VITE_STRAPI_URL
                }/api/user-trainings?filters[user][$eq]=${
                    userSession.value.user.email
                }&filters[trainingId][$eq]=${Number(trainingId)}`,
                headerOptions
            )
    );

    return {
        userTraining,
        refetchUserTraining,
    };
}
