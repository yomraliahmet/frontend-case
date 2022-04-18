import "primeflex/primeflex.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import PrimeVue from 'primevue/config';


loadFonts()

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(PrimeVue);


app.mount('#app');
