import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const trainingConfigStore = defineStore("training", () => {
  const training = ref();
  const trainings = ref();

  async function getTrainings() {
    const response = await axios.get(
      `http://localhost:1337/api/trainings?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
        },
      }
    );

    response.data = trainings.value;
  }
  async function getTraining(id: number) {
    const response = await axios.get(
      `http://localhost:1337/api/trainings/${id}?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
        },
      }
    );

    response.data = training.value;
  }

  return {
    getTraining,
    getTrainings,
    training,
    trainings,
  };
});
