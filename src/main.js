import moment from "moment";
import naive from "naive-ui";
import { createPinia } from "pinia";
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import 'virtual:windi.css';
import { createApp, markRaw } from 'vue';
import { VueQueryPlugin } from "vue-query";
import App from './App.vue';
import router from './router/index.js';
import './style.css';
import { supabase } from "./supabase";
import { userSession } from "./types/userSession";

const app = createApp(App);
const pinia = createPinia()

pinia.use(({ store }) => {
    store.$router = markRaw(router)
});


app.use(VCalendar, {})
app.use(naive);
app.use(pinia);
app.use(moment)
app.use(router);
app.use(VueQueryPlugin);

app.mount("#app");

supabase.auth.onAuthStateChange((_, _session) => {
    userSession.value = _session;
});
