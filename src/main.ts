import './assets/main.css'

import 'primevue/resources/themes/aura-dark-purple/theme.css'

import 'primeicons/primeicons.css'

import "vue3-openlayers/styles.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
// import OpenLayersMap from "vue3-openlayers";

import App from './App.vue'
import router from './router'

import AnimateOnScroll from 'primevue/animateonscroll';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);
// app.use(OpenLayersMap);
app.use(ToastService);
app.use(ConfirmationService);

app.directive('animateonscroll', AnimateOnScroll);

app.mount('#app')
