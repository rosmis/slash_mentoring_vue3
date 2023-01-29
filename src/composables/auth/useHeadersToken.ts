const headerOptions = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
    "Content-Type": "application/json",
  },
};

export { headerOptions };
