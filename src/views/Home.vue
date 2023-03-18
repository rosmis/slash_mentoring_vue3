<template>
    <ui-page screen class="relative">
        <UiSlash />
        <ui-wrapper>
            <n-carousel class="carousel">
                <img class="carousel-img" src="../assets/asset_home_page.png" />
                <img class="carousel-img" src="../assets/asset_home_page.png" />
                <img class="carousel-img" src="../assets/asset_home_page.png" />
                <img class="carousel-img" src="../assets/asset_home_page.png" />

                <template #dots="{ total, currentIndex, to }">
                    <ul class="custom-dots">
                        <li
                            v-for="index of total"
                            :key="index"
                            :class="{
                                ['is-active']: currentIndex === index - 1,
                            }"
                        />
                    </ul>
                </template>
            </n-carousel>
        </ui-wrapper>
    </ui-page>
</template>

<script lang="ts" setup>
import { NCarousel } from "naive-ui";
</script>

<style scoped>
.carousel {
    position: static !important;
}
.custom-dots {
    display: flex;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 2em;
    left: 50%;
    transform: translateX(-50%);
    cursor: default !important;
}

.custom-dots li {
    display: inline-block;
    width: 12px;
    height: 10px;
    margin: 0 3px;
    border-radius: 4px;
    cursor: default !important;
    background-color: #a09f9f;
    transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.custom-dots li.is-active {
    width: 40px;
    background: #100e51;
}
</style>
