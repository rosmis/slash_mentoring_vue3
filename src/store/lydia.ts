import axios from "axios";
import { defineStore } from "pinia";

export const useLydiaStore = defineStore("lydia", () => {
    async function makeLydiaPayement(amount: number) {
        const apiKey = import.meta.env.VITE_LYDIA_TOKEN;
        const endpoint =
            "https://homologation.lydia-app.com/api/request/do.json";
        const params = {
            amount: amount,
            vendor_token: apiKey,
            type: "phone",
            recipient: "0621491838",
            currency: "EUR",
        };

        try {
            const response = await axios.post(endpoint, params, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to initiate payment: ${error}`);
        }
    }

    async function checkPayementStatus(request_uuid: string) {
        const apiKey = import.meta.env.VITE_LYDIA_TOKEN;
        const endpoint =
            "https://homologation.lydia-app.com/api/request/state.json";
        const params = {
            vendor_token: apiKey,
            request_uuid,
        };

        try {
            const response = await axios.post(endpoint, params, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            return response.data;
        } catch (error) {
            throw new Error(`Failed to request the payement status: ${error}`);
        }
    }

    return {
        makeLydiaPayement,
        checkPayementStatus,
    };
});
