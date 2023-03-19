<template>
  <ui-wrapper color="light-blue" class="w-full" padded>
    <ui-wrapper>
      <div>
        <h4 class="text-black">APPRENEZ EN PLUS SUR VOS MENTORS</h4>
        <h3 class="text-lg text-black mb-6">Découvrez leurs engagements</h3>
      </div>

      <n-carousel
        :slides-per-view="3"
        centered-slides
        draggable
        :default-index="1"
        prev-slide-style="filter: grayscale(1) blur(3px);"
        next-slide-style="filter: grayscale(1) blur(3px);"
      >
        <n-carousel-item>
          <ui-wrapper
            rounded
            color="white"
            class="bg-cover h-100 w-80"
            :style="{
              backgroundImage: `linear-gradient(rgba(0, 10, 24, 0.5),rgba(0, 10, 24, 0.5)),
                              url(./src/assets/home/trainers/noemie.png)`,
            }"
          >
            <ui-level
              class="flex-col h-full"
              space="xs"
              vertical-align="top"
              align="right"
            >
              <p class="text-lg text-center text-white uppercase">
                Noémie Engeldinger
              </p>
              <p class="text-center text-white mb-4">
                Master 1 planning stratégie
              </p>
            </ui-level>
          </ui-wrapper>
        </n-carousel-item>
        <n-carousel-item>
          <ui-wrapper
            rounded
            color="white"
            class="bg-cover h-100 w-80"
            :style="{
              backgroundImage: `linear-gradient(rgba(0, 10, 24, 0.5),rgba(0, 10, 24, 0.5)),
                              url(./src/assets/home/trainers/noemie.png)`,
            }"
          >
            <ui-level
              class="flex-col h-full"
              space="xs"
              vertical-align="top"
              align="right"
            >
              <p class="text-lg text-center text-white uppercase">
                Noémie Engeldinger
              </p>
              <p class="text-center text-white mb-4">
                Master 1 planning stratégie
              </p>
            </ui-level>
          </ui-wrapper>
        </n-carousel-item>
        <n-carousel-item>
          <ui-wrapper
            rounded
            color="white"
            class="bg-cover h-100 w-80"
            :style="{
              backgroundImage: `linear-gradient(rgba(0, 10, 24, 0.5),rgba(0, 10, 24, 0.5)),
                              url(./src/assets/home/trainers/noemie.png)`,
            }"
          >
            <ui-level
              class="flex-col h-full"
              space="xs"
              vertical-align="top"
              align="right"
            >
              <p class="text-lg text-center text-white uppercase">
                Noémie Engeldinger
              </p>
              <p class="text-center text-white mb-4">
                Master 1 planning stratégie
              </p>
            </ui-level>
          </ui-wrapper>
        </n-carousel-item>
        <n-carousel-item>
          <ui-wrapper
            rounded
            color="white"
            class="bg-cover h-100 w-80"
            :style="{
              backgroundImage: `linear-gradient(rgba(0, 10, 24, 0.5),rgba(0, 10, 24, 0.5)),
                              url(./src/assets/home/trainers/noemie.png)`,
            }"
          >
            <ui-level
              class="flex-col h-full"
              space="xs"
              vertical-align="top"
              align="right"
            >
              <p class="text-lg text-center text-white uppercase">
                Noémie Engeldinger
              </p>
              <p class="text-center text-white mb-4">
                Master 1 planning stratégie
              </p>
            </ui-level>
          </ui-wrapper>
        </n-carousel-item>
        <n-carousel-item>
          <ui-wrapper
            rounded
            color="white"
            class="bg-cover h-100 w-80"
            :style="{
              backgroundImage: `linear-gradient(rgba(0, 10, 24, 0.5),rgba(0, 10, 24, 0.5)),
                              url(./src/assets/home/trainers/noemie.png)`,
            }"
          >
            <ui-level
              class="flex-col h-full"
              space="xs"
              vertical-align="top"
              align="right"
            >
              <p class="text-lg text-center text-white uppercase">
                Noémie Engeldinger
              </p>
              <p class="text-center text-white mb-4">
                Master 1 planning stratégie
              </p>
            </ui-level>
          </ui-wrapper>
        </n-carousel-item>
        <n-carousel-item>
          <ui-wrapper
            rounded
            color="white"
            class="bg-cover h-100 w-80"
            :style="{
              backgroundImage: `linear-gradient(rgba(0, 10, 24, 0.5),rgba(0, 10, 24, 0.5)),
                              url(./src/assets/home/trainers/noemie.png)`,
            }"
          >
            <ui-level
              class="flex-col h-full"
              space="xs"
              vertical-align="top"
              align="right"
            >
              <p class="text-lg text-center text-white uppercase">
                Noémie Engeldinger
              </p>
              <p class="text-center text-white mb-4">
                Master 1 planning stratégie
              </p>
            </ui-level>
          </ui-wrapper>
        </n-carousel-item>
      </n-carousel>
    </ui-wrapper>
  </ui-wrapper>
</template>

<script lang="ts" setup>
import { NCarousel } from "naive-ui";
</script>
