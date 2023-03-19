import axios from "axios";
import { useQuery } from "vue-query";
import { headerOptions } from "../auth/useHeadersToken";

export function useTrainings() {
  const { data } = useQuery(["training"], () =>
    axios.get(
      `${import.meta.env.VITE_STRAPI_URL}/api/trainings?populate=*`,
      headerOptions
    )
  );

  return data;
}
