import naive from "naive-ui";
import { createPinia } from "pinia";
import 'virtual:windi.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './style.css';
import { supabase } from "./supabase";
import { userSession } from "./types/userSession";


const app = createApp(App);
const pinia = createPinia()


app.use(naive);
app.use(pinia);
app.use(router);

app.mount("#app");

supabase.auth.onAuthStateChange((_, _session) => {
    userSession.value = _session;
});
