import './assets/main.css'
import './assets/map.css'
import 'primeicons/primeicons.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@mdi/font/css/materialdesignicons.min.css'

const app = createApp(App);
const pinia = createPinia()

app.use(pinia)
app.use(router);

app.mount('#app');
