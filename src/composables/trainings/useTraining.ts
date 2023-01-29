import axios from "axios";
import { useQuery } from "vue-query";
import { headerOptions } from "../auth/useHeadersToken";

export function useTraining(id: number) {
  const { data } = useQuery(["training"], () =>
    axios.get(
      `http://localhost:1337/api/trainings/${id}?populate=*`,
      headerOptions
    )
  );

  return data;
}
