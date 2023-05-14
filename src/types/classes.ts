import { SelectGroupOption, SelectOption } from "naive-ui";

export const classes: Array<SelectOption | SelectGroupOption> = [
    {
        type: "group",
        label: "ESP",
        key: "ESP",
        children: [
            {
                label: "ESP B1",
                value: "ESP B1",
            },
            {
                label: "ESP B2",
                value: "ESP B2",
            },
            {
                label: "ESP B3",
                value: "ESP B3",
            },
        ],
    },
    {
        type: "group",
        label: "ESD",
        key: "ESD",
        children: [
            {
                label: "ESD B1",
                value: "ESD B1",
            },
            {
                label: "ESD B2",
                value: "ESD B2",
            },
            {
                label: "ESD B3",
                value: "ESD B3",
            },
        ],
    },
];
