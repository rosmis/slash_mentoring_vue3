<template>
  <ui-wrapper rounded color="white" class="-mb-12 py-8 headerPosition">
    <div>
      <h4>PRENNEZ EN MAIN VOTRE FUTURE CARRIÈRE</h4>
      <h3 class="text-lg mb-6">
        Démarquez-vous et développer vos compétences au delà des attentes
      </h3>
    </div>

    <ui-level space="lg">
      <ui-level
        class="bg-no-repeat bg-cover flex-col rounded-2xl h-60"
        vertical-align="top"
        align="right"
        space="lg"
        :style="{
          backgroundImage: `linear-gradient(rgba(0, 10, 24, 0.5),rgba(0, 10, 24, 0.5)),
                            url(./src/assets/home/shutterstock_1704188839.png)`,
        }"
      >
        <ui-wrapper>
          <p class="font-bold text-white text-lg">
            Apprenez avec les étudiants
          </p>
          <p class="text-white">
            Chacun apprendre à sa vitesse. Tirer en profit et demander de l’aide
            à vos camarades de classes qui ont mieux compris un concept.
          </p>
        </ui-wrapper>
      </ui-level>
      <ui-level
        class="bg-no-repeat bg-cover flex-col rounded-2xl h-60"
        vertical-align="top"
        align="right"
        space="lg"
        :style="{
          backgroundImage: `linear-gradient(rgba(0, 10, 24, 0.5),rgba(0, 10, 24, 0.5)),
                            url(./src/assets/home/shutterstock_1674759265.png)`,
        }"
      >
        <ui-wrapper>
          <p class="font-bold text-white text-lg">
            Développer vous en toute confiance
          </p>
          <p class="text-white">
            Améliorez vos connaissances afin que votre travail puisse se
            démarquer de la masse. Tout est enseigné à partir de la base. Aucune
            expérience n’est nécessaire.
          </p>
        </ui-wrapper>
      </ui-level>
      <ui-level
        class="bg-no-repeat bg-cover flex-col rounded-2xl h-60"
        vertical-align="top"
        align="right"
        space="lg"
        :style="{
          backgroundImage: `linear-gradient(rgba(0, 10, 24, 0.5),rgba(0, 10, 24, 0.5)),
                            url(./src/assets/home/priscilla-du-preez-XkKCui44iM0-unsplash.png)`,
        }"
      >
        <ui-wrapper>
          <p class="font-bold text-white text-lg">Faites-vous remarquer</p>
          <p class="text-white">
            Rejoignez la communauté qui aide les étudiants à faire de leur
            passion un emploi à plein temps.
          </p>
        </ui-wrapper>
      </ui-level>
    </ui-level>
  </ui-wrapper>
</template>

<style scoped>
.headerPosition {
  transform: translateY(-13%);
}
</style>
