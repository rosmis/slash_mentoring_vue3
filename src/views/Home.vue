<template>
    <ui-page screen class="relative overflow-x-hidden">
        <UiSlash />

        <ui-wrapper padded>
            <n-carousel class="carousel">
                <HomeCarouselItem
                    v-for="(carouselItem, index) in carouselItems"
                    :key="index"
                    :title="carouselItem.title"
                    :content="carouselItem.content"
                    :background-url="carouselItem.backgroundUrl"
                />

                <template #dots="{ total, currentIndex, to }">
                    <ul class="custom-dots absolute-position">
                        <li
                            v-for="index of total"
                            :key="index"
                            :class="{
                                ['is-active']: currentIndex === index - 1,
                            }"
                            @click="to(index - 1)"
                        />
                    </ul>
                    <div class="bottom-22 absolute-position">
                        <ui-level v-if="currentIndex !== 3" align="center">
                            <UiButton outlined @click="to(3)">Passer</UiButton>
                            <UiButton @click="to(currentIndex + 1)"
                                >Suivant</UiButton
                            >
                        </ui-level>
                        <ui-level v-else align="center">
                            <UiButton @click="useUserRedirection('Dashboard')"
                                >Se lancer</UiButton
                            >
                        </ui-level>
                    </div>
                </template>
            </n-carousel>
        </ui-wrapper>
    </ui-page>
</template>

<script lang="ts" setup>
import { NCarousel } from "naive-ui";
import { onMounted } from "vue";
import { useUserRedirection } from "../composables/auth/useUserRedirection";
import { userStore } from "../store/user";

const user = userStore();

const carouselItems = [
    {
        title: "Apprenez avec des étudiants",
        content: `Chacun apprendre à sa vitesse. Tirez en profit et
                        demander de l’aide <br />
                        à vos camarades de classes qui ont mieux compris un
                        concept.`,
        backgroundUrl:
            "https://res.cloudinary.com/dlirhziq5/image/upload/v1679224289/asset_home_page_zm9mxd.png",
    },
    {
        title: "Développer vous en toute confiance",
        content: `Améliorez vos connaissances afin que votre travail puisse se démarquer de la masse. <br /> Tout est enseigné à partir de la base. Aucune expérience n’est nécessaire.`,
        backgroundUrl:
            "https://res.cloudinary.com/dlirhziq5/image/upload/v1682768969/shutterstock_1674759265_adwjln.png",
    },
    {
        title: "Faites-vous remarquer",
        content: `Rejoignez la communauté qui aide les étudiants à <br /> faire de leur passion un emploi à plein temps.`,
        backgroundUrl:
            "https://res.cloudinary.com/dlirhziq5/image/upload/v1679224289/asset_home_page_zm9mxd.png",
    },
    {
        contentImage:
            "https://res.cloudinary.com/dlirhziq5/image/upload/v1682768858/logo_white_xzf75p.png",
        backgroundUrl:
            "https://res.cloudinary.com/dlirhziq5/image/upload/v1679224289/asset_home_page_zm9mxd.png",
    },
];

onMounted(() => {
    user.handleUserSessionInfos();
});
</script>

<style scoped>
.carousel {
    position: static !important;
}

.absolute-position {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.custom-dots {
    display: flex;
    margin: 0;
    padding: 0;
    bottom: 2em;

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
