import 'primevue/resources/themes/lara-light-indigo/theme.css'    
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'my-app-466e8.firebaseapp.com',
  projectId: 'my-app-466e8',
  storageBucket: 'my-app-466e8.appspot.com',
  messagingSenderId: '573128169625',
  appId: '1:573128169625:web:e2270f50ca531aa5a50008'
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);

app.mount('#app')
