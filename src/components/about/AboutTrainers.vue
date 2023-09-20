<template>
    <ui-wrapper class="w-full relative" padded>
        <div>
            <h4 class="text-black">APPRENEZ EN PLUS SUR VOS MENTORS</h4>
            <h3 class="text-lg text-black mb-6">Découvrez leurs engagements</h3>
        </div>

        <n-carousel
            :slides-per-view="isMobile ? 1 : 3"
            centered-slides
            draggable
            show-arrow
            :default-index="isMobile ? 0 : 1"
            prev-slide-style="filter: blur(3px); backgroundImage: linear-gradient(0deg, rgba(16,14,81,0.3) 100%) 0%, rgba(16,14,81,0.3) 100%)"
            next-slide-style="filter: blur(3px);"
            class="carousel"
        >
            <template
                v-for="(trainer, index) in trainers"
                :key="`trainer-${index}`"
            >
                <n-carousel-item>
                    <AboutTrainerCard
                        :trainer="trainer"
                        :is-mobile="isMobile"
                    />
                </n-carousel-item>
            </template>

            <template #arrow="{ prev, next }">
                <div class="custom-arrow">
                    <button
                        type="button"
                        class="custom-arrow--left"
                        @click="prev"
                    >
                        <n-icon><ArrowBack /></n-icon>
                    </button>
                    <button
                        type="button"
                        class="custom-arrow--right"
                        @click="next"
                    >
                        <n-icon><ArrowForward /></n-icon>
                    </button>
                </div>
            </template>
            <template #dots="{ total, currentIndex, to }">
                <ul class="mt-12 custom-dots">
                    <li
                        v-for="index of total"
                        :key="index"
                        :class="{
                            ['is-active']: currentIndex === index - 1,
                        }"
                        @click="to(index - 1)"
                    />
                </ul>
            </template>
        </n-carousel>
    </ui-wrapper>
</template>

<script lang="ts" setup>
import { ArrowBack, ArrowForward } from "@vicons/ionicons5";
import { NCarousel } from "naive-ui";

defineProps<{
    trainers: any;
    isMobile: boolean;
}>();
</script>

<style scoped>
.carousel {
    position: static !important;
}

.custom-arrow {
    display: flex;
    position: absolute;
    bottom: 20px;
    right: 10px;
}

.custom-arrow button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-right: 12px;
    color: #000;
    background-color: rgba(0, 0, 0, 0.2);
    border-width: 0;
    border-radius: 8px;
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.custom-arrow button:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
    transform: scale(0.95);
    transform-origin: center;
}

.custom-dots {
    display: flex;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 20px;
    left: 20px;
}

.custom-dots li {
    display: inline-block;
    width: 12px;
    height: 4px;
    margin: 0 3px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.2);
    transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.custom-dots li.is-active {
    width: 40px;
    background: #000;
}
</style>
