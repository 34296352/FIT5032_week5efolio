import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'   
import { initializeApp } from 'firebase/app'


const firebaseConfig = {
  apiKey: "AIzaSyCHdFiX0hO2ayBEFflu4-xK1oZXlR2cBCA",
  authDomain: "week7-jiawei-a3a06.firebaseapp.com",
  projectId: "week7-jiawei-a3a06",
  storageBucket: "week7-jiawei-a3a06.appspot.com",
  messagingSenderId: "89619635834",
  appId: "1:89619635834:web:4515339d14d048e0525c3"
}

initializeApp(firebaseConfig)


console.log('[apiKey used by app] =>', firebaseConfig.apiKey)

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura, options: { darkModeSelector: '.app-dark' }}})
app.use(router)
app.mount('#app')
