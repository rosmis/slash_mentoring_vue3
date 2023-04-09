<template>
    <router-link :to="{ name: 'Training', params: { id: training.id } }">
        <div
            v-if="training"
            rounded
            color="white"
            class="cursor-pointer rounded-2xl h-65 transition-shadow ring-1 ring-slate-900/5 aspect-square relative wrapper hover:shadow-lg"
        >
            <ui-level
                class="rounded-lg p-2 top-2 left-2 z-10 absolute"
                align="left"
                space="sm"
                :style="{ backgroundColor: color }"
            >
                <n-icon size="14" color="white">
                    <Calendar />
                </n-icon>
                <p class="text-white text-xs">
                    {{
                        moment(training.attributes.date).format(
                            "DD MMMM YYYY [à] HH[H]mm"
                        )
                    }}
                </p>
            </ui-level>

            <div class="rounded-t-2xl h-4/6 overflow-hidden">
                <div
                    class="bg-cover h-full hover"
                    :style="{
                        backgroundImage: `url(${training.attributes.backgroundImage.data.attributes.formats.large.url})`,
                    }"
                ></div>
            </div>

            <ui-wrapper
                class="rounded-b-2xl h-2/6"
                :style="{ backgroundColor: color }"
            >
                <ui-level align="left" class="h-full">
                    <div
                        class="bg-cover bg-no-repeat rounded-full h-12 ring-white ring-2 w-12"
                        :style="{
                            backgroundImage: `url(${training.attributes.trainer.data.attributes.profilePicture.data.attributes.url})`,
                        }"
                    ></div>

                    <ui-level class="flex-col" space="xs" vertical-align="top">
                        <p class="text-lg text-white">
                            {{ training.attributes.title }}
                        </p>
                        <p class="text-white">
                            {{
                                training.attributes.trainer.data.attributes
                                    .firstName
                            }}
                            <span class="uppercase">
                                {{
                                    training.attributes.trainer.data.attributes
                                        .lastName
                                }}
                            </span>
                        </p>
                    </ui-level>
                </ui-level>
            </ui-wrapper>
        </div>
    </router-link>
</template>

<script lang="ts" setup>
import { CalendarNumberOutline as Calendar } from "@vicons/ionicons5";
import moment from "moment";
import { Training } from "../../types/training";

defineProps<{
    training?: Training;
    color: string;
}>();
</script>

<style scoped>
.hover {
    transition: 0.2s ease-in-out all;
}
.wrapper:hover .hover {
    transform: scale(1.05);
}

.hover:hover .hover::before {
    display: block;
}
.hover::before {
    content: "";
    display: none;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
