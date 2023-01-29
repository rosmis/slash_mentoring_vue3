import axios from "axios";
import { useQuery } from "vue-query";
import { headerOptions } from "../auth/useHeadersToken";

export function useTrainings() {
  const { data } = useQuery(["training"], () =>
    axios.get(`http://localhost:1337/api/trainings?populate=*`, headerOptions)
  );

  return data;
}
