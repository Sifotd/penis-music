import { createApp } from 'vue'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/css/index.scss";
import "./assets/icons/index.js";

import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router';



createApp(App)
  .use(createPinia())
  .use(router)
  .use(ElementPlus)
  .mount('#app')
