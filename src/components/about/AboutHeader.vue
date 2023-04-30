<template>
    <div>
        <ui-level
            class="bg-cover rounded flex-col h-120"
            :style="{
                backgroundImage: `linear-gradient(0deg, rgba(26,9,140,0.4) 0%, rgba(16,14,81,0.4) 100%),
                            url(https://res.cloudinary.com/dlirhziq5/image/upload/v1682855827/about_banner_gseyqo.png)`,
            }"
            align="center"
        >
            <ui-title class="font-bold" size="3xl">
                Bienvenue sur Slash Mentoring
            </ui-title>
            <p class="text-white text-lg">
                Apprenez avec des cours pour les étudiants, par les étudiants
            </p>
        </ui-level>

        <ui-wrapper class="pt-12">
            <div>
                <h4>PRENNEZ EN MAIN VOTRE FUTURE CARRIÈRE</h4>
                <h3 class="text-lg mb-6">
                    Démarquez-vous et développer vos compétences au delà des
                    attentes
                </h3>
            </div>

            <ui-level space="lg">
                <ui-level
                    class="bg-no-repeat bg-cover flex-col rounded-2xl h-80"
                    vertical-align="top"
                    align="right"
                    space="lg"
                    :style="{
                        backgroundImage: `linear-gradient(rgba(0, 10, 24, 0.5),rgba(0, 10, 24, 0.5)),
                            url(https://res.cloudinary.com/dlirhziq5/image/upload/v1682856244/shutterstock_1704188839_qatxi4.png)`,
                    }"
                >
                    <ui-wrapper>
                        <p class="font-bold text-white text-lg">
                            Apprenez avec les étudiants
                        </p>
                        <p class="text-white">
                            Chacun apprendre à sa vitesse. Tirer en profit et
                            demander de l’aide à vos camarades de classes qui
                            ont mieux compris un concept.
                        </p>
                    </ui-wrapper>
                </ui-level>
                <ui-level
                    class="bg-no-repeat bg-cover flex-col rounded-2xl h-80 backgroundPosition"
                    vertical-align="top"
                    align="right"
                    space="lg"
                    :style="{
                        backgroundImage: `linear-gradient(rgba(0, 10, 24, 0.5),rgba(0, 10, 24, 0.5)),
                            url(https://res.cloudinary.com/dlirhziq5/image/upload/v1682855788/shutterstock_1674759265_adwjln.png)`,
                    }"
                >
                    <ui-wrapper>
                        <p class="font-bold text-white text-lg">
                            Développer vous en toute confiance
                        </p>
                        <p class="text-white">
                            Améliorez vos connaissances afin que votre travail
                            puisse se démarquer de la masse. Tout est enseigné à
                            partir de la base. Aucune expérience n’est
                            nécessaire.
                        </p>
                    </ui-wrapper>
                </ui-level>
                <ui-level
                    class="bg-no-repeat bg-cover flex-col rounded-2xl h-80 backgroundPosition"
                    vertical-align="top"
                    align="right"
                    space="lg"
                    :style="{
                        backgroundImage: `linear-gradient(rgba(0, 10, 24, 0.5),rgba(0, 10, 24, 0.5)),
                            url(https://res.cloudinary.com/dlirhziq5/image/upload/v1682856104/asset_home_page_ercw0o.png)`,
                    }"
                >
                    <ui-wrapper>
                        <p class="font-bold text-white text-lg">
                            Faites-vous remarquer
                        </p>
                        <p class="text-white">
                            Rejoignez la communauté qui aide les étudiants à
                            faire de leur passion un emploi à plein temps.
                        </p>
                    </ui-wrapper>
                </ui-level>
            </ui-level>

            <ui-wrapper padded>
                <ui-level align="center" space="lg">
                    <ui-button accent="secondary" @click="$emit('redirect')"
                        >Devenir mentor</ui-button
                    >
                    <ui-button @click="useUserRedirection('Dashboard')"
                        >Suivre un cours</ui-button
                    >
                </ui-level>
            </ui-wrapper>
        </ui-wrapper>
    </div>
</template>

<script lang="ts" setup>
import { useUserRedirection } from "../../composables/auth/useUserRedirection";
</script>

<style scoped>
.backgroundPosition {
    background-position: 30% 100%;
}
</style>
