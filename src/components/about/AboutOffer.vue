<template>
    <ui-wrapper class="pb-12">
        <h4>CE QUE NOUS PROPOSONS</h4>
        <h3 class="text-lg mb-6">
            Une expérience d’apprentissage immersive et interactive
        </h3>

        <ui-level>
            <AboutOfferCard
                v-for="cardContent in cardsContent"
                :key="cardContent.icon"
                :card-content="cardContent"
            />
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
const cardsContent = [
    {
        icon: "camera",
        title: "Mentorat en direct",
        content:
            "Rejoingnez un petit groupe d’étudiant de l’ESP-ESD pour des séances de mentorat interactif en direct. Chaque cours est proposé par des étudiants de l’école.",
    },
    {
        icon: "community",
        title: "Accès à la communauté",
        content:
            "Connectez-vous, réseautez et partagez vos idées avec les apprennent de Slash mentoring dans un groupe Slack exclusif aux étudiants.",
    },
    {
        icon: "access",
        title: "Accès permanent au cours",
        content:
            "Obtenez un accès permanent au contenu vidéo, rediffusion de mentorat, au PDF, et élément de cours.",
    },
    {
        icon: "learning",
        title: "Apprentissage par projet",
        content:
            "L’apprentissage passe par la pratique. Chaque semaine, vous recevrez des sujets pour vous entrainer avec des retours et des conseils.",
    },
];
</script>
