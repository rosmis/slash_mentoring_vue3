import { startCase } from "lodash";
import moment from "moment";

export function useFrenchFormattedDate(date: string) {
    return startCase(moment(date).format("dddd D MMMM YYYY"));
}
